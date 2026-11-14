---
layout: blog
title: 15. Learning MPC Modeling Through Quadruped Loco-Manipulation
description: Learning how to turn a quadruped with a robotic arm into a prediction model, an objective, and constraints for MPC.
parent_url: /blogs/blogIndex.html
parent_label: Back to Blogs
---

# Learning MPC Modeling Through Quadruped Loco-Manipulation

When learning model predictive control (MPC), I want to understand how to build the model that the controller uses to predict motion. Normally we would need three elements for MPC modeling: the state, the input and the dynamic model. This leads to four questions:

1. Given a robot, what should go into the state?
2. What are the control inputs?
3. Which dynamics do we need to keep?
4. How do we turn a task into an objective and constraints?

I am using *Design and Control Co-Optimization for Dynamic Loco-Manipulation With a Robotic Arm on a Quadruped Robot* [[1]](#reference-1) as a starting point. The example is a quadruped lifting a box: the arm applies force to the box, and the box applies force back to the robot. The whole-body MPC needs to account for that reaction while it calculates how the feet should support the body.

## 1. State: what do we predict?

The controller predicts the motion of the robot's body. The paper approximates the robot and arm together as one rigid body, so its state describes the body's orientation, position and velocities rather than every leg joint angle. In eq. (9) of [1], the state is

$$
x_r = \begin{bmatrix}\Theta & p_r & \omega_r & \dot p_r & g\end{bmatrix}^{T}.
$$

Here $\Theta$ is the body orientation in Euler angles, $p\_r$ is the position of the robot's center of mass, $\omega\_r$ is its angular velocity, and $\dot p\_r$ is its linear velocity. The final entry $g$ is the constant gravity term used in the state-space model. These quantities give the controller a description of where the body is and how it is moving at each predicted step.

The arm joint angle $q\_{\mathrm{arm}}$ belongs to the preceding pose optimization. It is a decision variable there, while the whole-body MPC uses the single-rigid-body state above and optimizes contact forces. The leg joint angles are also left out of this pose optimization; the paper uses hip-height constraints to keep the legs within a range suitable for stepping.

## 2. Input: what forces can the controller use?

The inputs are the four ground reaction forces at the feet and the interaction force at the gripper. The paper writes them as eq. (10):

$$
u = \begin{bmatrix}f_{c1} & f_{c2} & f_{c3} & f_{c4} & f_m\end{bmatrix}^{T}.
$$

Each $f\_{ci}$ is the force of the ground on foot $i$, and $f\_m$ is the manipulation force acting on the robot at the gripper. The object manipulation planner supplies the desired manipulation force over the prediction horizon. In the whole-body MPC, that force is fixed to the planner's value by a constraint, while the foot forces are chosen to track the robot's reference motion. During lifting, the force on the robot is the reaction to the force applied to the box.

## 3. Dynamic model: how do the forces move the body?

A force changes the motion of the center of mass; the same force also produces a moment when it acts away from the center of mass. The paper keeps both effects in its rigid-body model, written as eqs. (7) and (8) of [1]:

$$
\begin{aligned}
m_r(\ddot p_r + g) &= \sum_{i=1}^{4} f_{ci} + f_m,\\
I_r\dot\omega_r &= \sum_{i=1}^{4} r_{ci} \times f_{ci} + r_m \times f_m.
\end{aligned}
$$

Here $m\_r$ is the mass of the robot and arm, and $I\_r$ is their inertia in the world frame. The vector $r\_{ci}$ runs from the center of mass to foot $i$; $r\_m$ runs from the center of mass to the gripper. The first equation describes how the forces affect linear acceleration, and the second describes how their moments affect angular acceleration. The equations above follow the paper's notation; its displayed gravity sign and its description of the gravity vector should be checked against the coordinate convention when implementing them.

The paper then puts these dynamics into a state-space model and discretizes it. Its prediction constraint, eq. (14), advances the state from one step to the next:

$$
x_{r,i+1} = A_d x_{r,i} + B_d u_i.
$$

The matrices $A\_d$ and $B\_d$ describe how the current state and forces produce the next state. This is the prediction model inside the MPC: for each candidate sequence of forces, it gives a corresponding sequence of body states.

## 4. Where do the reference and manipulation force come from?

The whole-body MPC needs a reference for the robot and a desired interaction force at the gripper. The paper obtains them through two preceding stages: an object manipulation planner and pose optimization. For a lifting task, the command can specify a lifting velocity or duration; the planner uses the object's dynamics and task requirements to plan the object's future states and the force needed to move it. The force is a trajectory over the prediction horizon, so the controller can account for the changing effect of the box as it accelerates.

Pose optimization takes the planned object trajectory and manipulation force and works out a robot pose for each step. It chooses the robot's center-of-mass position, body orientation and arm angle, while considering quantities such as body rotation and arm torque. Its constraints include feasible hip heights, body orientation and arm angles, as well as the relation between the gripper and the object. For lifting, the gripper position must match the planned object position. The resulting robot poses provide the reference for the whole-body MPC's tracking objective.

The manipulation force also goes directly from the planner to the whole-body MPC. At each prediction step, the MPC constrains its gripper-force entry to the desired force from the planner; the force must be expressed in the convention used for the force acting on the robot. The planner therefore supplies both an object trajectory and a force trajectory. The force trajectory becomes an equality constraint in the robot MPC, while friction and swing-leg constraints describe the feet's contact with the ground.

## 5. Objective and constraints: which prediction should we choose?

The prediction model gives the MPC many possible trajectories. The objective tells it which ones are desirable. In eq. (13), the paper minimizes the weighted error between the predicted state and a reference state, together with a weighted cost on the inputs:

$$
\min_{x_r,u}\sum_{i=1}^{N}
\left(\left\|x_{r,i+1}-x_{r,i+1}^{\mathrm{ref}}\right\|_{Q_r}^{2}
+\left\|u_i\right\|_{R_r}^{2}\right).
$$

The reference $x\_r^{\mathrm{ref}}$ comes from pose optimization, which uses the planned object motion and manipulation force to select a robot pose. The first term asks the body to follow that reference; the second penalizes the forces in $u$. The weights $Q\_r$ and $R\_r$ set the relative importance of tracking and force cost.

Before the whole-body MPC runs, pose optimization constrains the arm joint angle. Equation (4) of [1] sets its allowable range:

$$
q_{\mathrm{arm,min}} \leq q_{\mathrm{arm}} \leq q_{\mathrm{arm,max}}.
$$

The paper uses this limit to avoid collision between the arm and the robot body. This constraint is part of pose optimization, while the following constraints belong to the whole-body MPC. The lowercase $q\_{\mathrm{arm}}$ is a joint angle; the uppercase $Q\_r$ above is a cost weight.

The selected trajectory must also satisfy the dynamics above and the force constraints in eqs. (15)–(17) of [1]:

$$
\underline{c_f} \leq C u_i \leq \overline{c_f}, \qquad
f_{ci}=0\ \text{if leg }i\text{ is in swing}, \qquad
f_m=f_m^{\mathrm{des}}.
$$

The first constraint is the friction pyramid: it limits the foot forces according to contact friction. The second sets the force on a swing foot to zero, because that foot is off the ground. The last fixes the manipulation force to the planner's desired value. Together with the dynamics, these constraints let the MPC calculate support forces while accounting for the force from the box.

## References

<a id="reference-1"></a>
[1] A. Rigo, M. Hu, J. Ma, S. K. Gupta, and Q. Nguyen, "Design and Control Co-Optimization for Dynamic Loco-Manipulation With a Robotic Arm on a Quadruped Robot," *Journal of Mechanisms and Robotics*, vol. 17, no. 5, article 051006, May 2025. Published online November 1, 2024. [doi:10.1115/1.4066852](https://doi.org/10.1115/1.4066852)

## Simulation

This simulation shows the quadruped approaching a box, gripping its handle, lifting it, and walking with it. The approach and grasp are simulated in two stages with the robot and gripper states carried between them. During the grasp, the box is free to move and the gripper uses contact forces and friction to hold it.

<img src="{{ '/blogs/videos/quadruped-physical-grasp.gif' | relative_url }}" alt="Animation of a quadruped approaching, gripping, lifting and carrying a box" width="100%">

[Download the simulation video]({{ '/blogs/videos/quadruped-physical-grasp-fast.mp4' | relative_url }})
