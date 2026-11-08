---
layout: blog
title: 10. Riccati Equation
description: Notes on the algebraic and differential Riccati equation in optimal control (LQR).
parent_url: /blogs/blogIndex.html
parent_label: Back to Blogs
---

# Riccati Equation

This is a problem I encountered when doing online solving in MPC (Model Predictive Control). The problem formulation has two parts. One is the state, denoted by $x$. The other is the objective function, denoted by $J$:

$$
J = x^\top Q\, x + u^\top R\, u
$$

The problem itself is an idealized model of how the Tianwen-1 Mars probe, built by the China National Space Administration (CNSA), lands on Mars. The state $x \in \mathbb{R}^3$ evolves as

$$
x_1(t+1) = 2x_1(t) + 2x_2(t)
$$

$$
x_2(t+1) = -2x_1(t) - x_2(t) + x_3(t)
$$

$$
x_3(t+1) = 2x_2(t) + 1.5x_3(t) + u(t)
$$

and $u$ plays the role of the throttle output. There are clear restrictions here: $u$ falls within $-10$ to $10$, and each state component is bounded as well, $-20 \le x_1 \le 20$, $-10 \le x_2 \le 10$, $-20 \le x_3 \le 20$.

$t$ is the time step of the controller. Let's simplify this problem to only one linear function and one objective function, so that there are no restrictions: no input restriction and no state restriction. Then we can solve this problem using one feedback controller, which minimizes the objective function using the control input. Now there are states in the objective function, which we need to replace with the input $u$, and this is where the algebraic Riccati equation comes into place.

## Deriving the Riccati equation

### The problem

Write the linear system as $x_{t+1} = A x_t + B u_t$. Over a horizon of $T$ steps, the objective function is

$$
J = \sum_{t=0}^{T-1} \big( x_t^\top Q\, x_t + u_t^\top R\, u_t \big) + x_T^\top Q\, x_T
$$

At the last step there is no need to control anymore, so only the state term remains.

### Start from the last step

Let $J_t(x)$ be the remaining part of $J$ from time $t$ to the end, when the state at time $t$ is $x$. At the last step it is just

$$
J_T(x) = x^\top Q\, x
$$

### Go back one step

At time $T-1$, replace $x_T$ with the state equation $x_T = Ax + Bu$:

$$
J_{T-1}(x) = \min_{u} \Big[\, x^\top Q\, x + u^\top R\, u + (Ax + Bu)^\top Q\, (Ax + Bu) \,\Big]
$$

Expand and group by $u$:

$$
J_{T-1}(x) = \min_u \Big[\, u^\top (R + B^\top Q B)\, u + 2\, u^\top B^\top Q A\, x + x^\top (Q + A^\top Q A)\, x \,\Big]
$$

This is a quadratic function of $u$. Set its derivative to zero; since $R + B^\top Q B$ is positive definite, this is the minimum:

$$
2(R + B^\top Q B)\, u + 2 B^\top Q A\, x = 0
$$

$$
u_{T-1}^* = -(R + B^\top Q B)^{-1} B^\top Q A\; x = -K_{T-1}\, x
$$

### Plug it back in and name the matrix $P$

Substituting $u_{T-1}^*$ back gives

$$
J_{T-1}(x) = x^\top \Big[\, Q + A^\top Q A - A^\top Q B\, (R + B^\top Q B)^{-1} B^\top Q A \,\Big]\, x
$$

This has exactly the same form as $J_T(x) = x^\top Q\, x$; only the matrix in the middle has changed. Call it $P_{T-1}$.

### Repeat: the Riccati difference equation

What we did above is exactly the Bellman equation: the best we can do from time $t$ is the cost of this step plus the best we can do from where we land, which comes from the principle of optimality (any tail of an optimal trajectory is itself optimal).

$$
J_t(x) = \min_{u} \Big[\, x^\top Q\, x + u^\top R\, u + J_{t+1}(Ax + Bu) \,\Big]
$$

So going back one more step works the same way, with $Q$ in the last term replaced by $P_{t+1}$. For every $t$:

$$
P_t = Q + A^\top P_{t+1} A - A^\top P_{t+1} B\, (R + B^\top P_{t+1} B)^{-1} B^\top P_{t+1} A
$$

$$
u_t^* = -(R + B^\top P_{t+1} B)^{-1} B^\top P_{t+1} A\; x_t
$$

### The algebraic Riccati equation

As $T \to \infty$, $P_t \to P$. The new and old $P$ are equal, so $P$ satisfies

$$
P = Q + A^\top P A - A^\top P B\, (R + B^\top P B)^{-1} B^\top P A
$$

This is the **algebraic Riccati equation**. The controller becomes one fixed gain:

$$
u_t = -K x_t, \qquad K = (R + B^\top P B)^{-1} B^\top P A
$$

$P$ and $K$ depend only on $A, B, Q, R$, so they are computed once, offline. At each time step, the controller only needs to multiply the current state $x_t$ by $-K$.

### An open question

Although $P$ converges, it only does so in the limit. Before it has converged, how can we directly use the converged control law to control the system, and prove that the cost stays within that bound?

If you have thoughts on this, feel free to tell me.

## From LQR to MPC

Now bring the restrictions back: $u$ falls within $-10$ to $10$, plus the bounds on each state. The LQR law can no longer be used directly, because $u_t = -K x_t$ is not guaranteed to stay in this domain.

### The MPC idea

Since we can no longer get a formula offline, we use MPC to solve the problem numerically online, from the current state at each time step. It is the same idea, but now we solve it with quadratic programming instead of the algebraic Riccati equation.

The "predictive" part is that $J$ now becomes a new objective that includes the next $N$ steps from the current state $x_t$:

$$
J = \sum_{i=1}^{N} x_{t+i}^\top Q\, x_{t+i} + \sum_{i=0}^{N-1} u_{t+i}^\top R\, u_{t+i}
$$

Using the state equation again and again, every future state can be written with $x_t$ and the inputs only, so we stack them into one big matrix:

$$
\underbrace{\begin{bmatrix} x_{t+1} \\ x_{t+2} \\ x_{t+3} \\ \vdots \\ x_{t+N} \end{bmatrix}}_{X}
=
\underbrace{\begin{bmatrix} A \\ A^2 \\ A^3 \\ \vdots \\ A^N \end{bmatrix}}_{\bar A} x_t
+
\underbrace{\begin{bmatrix} B & 0 & 0 & \cdots & 0 \\ AB & B & 0 & \cdots & 0 \\ A^2B & AB & B & \cdots & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ A^{N-1}B & A^{N-2}B & A^{N-3}B & \cdots & B \end{bmatrix}}_{\bar B}
\underbrace{\begin{bmatrix} u_t \\ u_{t+1} \\ u_{t+2} \\ \vdots \\ u_{t+N-1} \end{bmatrix}}_{U}
$$

Putting it back into $J$ with $\bar Q = \mathrm{diag}(Q, \dots, Q)$ and $\bar R = \mathrm{diag}(R, \dots, R)$, the states disappear again, and we get a quadratic program in $U$:

$$
\min_U\ \tfrac12\, U^\top H\, U + f^\top U \quad \text{s.t.} \quad -10 \le U \le 10, \qquad H = 2\big(\bar B^\top \bar Q\, \bar B + \bar R\big),\quad f = 2\, \bar B^\top \bar Q\, \bar A\, x_t
$$

To solve it we can use ADMM (Alternating Direction Method of Multipliers), which splits the problem into an unconstrained quadratic in $U$ that has a closed-form solution, and a clipping step onto $[-10, 10]$, connected by an auxiliary variable $s$ and a dual variable $v$:

$$
U \leftarrow -(H + \rho I)^{-1}\big(f + \rho\,(v - s)\big), \qquad s \leftarrow \mathrm{clip}(U + v,\ -10,\ 10), \qquad v \leftarrow v + U - s
$$

In my version I used accelerated projected gradient instead, which takes a gradient step on $U$, clips it, and adds Nesterov momentum. Either way, we only apply the first input $u_t$, then measure the new state and solve again at the next step.

For the Tianwen-1 problem, take $N = 10$, $Q = I$, $R = 1$ and $x_0 = [2,\,1,\,1]^\top$. The input rises to about $4.46$ at the second step and then shrinks to zero, so it stays inside $[-10, 10]$, and all three states go back to zero in about 8 steps.
