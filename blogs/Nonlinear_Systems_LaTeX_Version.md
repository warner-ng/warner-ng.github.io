---
layout: default
title: Nonlinear Systems — Complete Notes
description: Complete notes on nonlinear systems covering existence & uniqueness, contraction mapping, Lyapunov theory, LaSalle theorem, instability, linearization, region of attraction, time-varying systems, and exponential stability.
---

# NONLINEAR SYSTEMS — COMPLETE NOTES

**ESSENTIAL MATRIX DERIVATIVE RULES**

#### 1. Derivative of a Transpose

Let $X = X(t)$.

$$
\frac{d}{dt}(X^\top)
=
\left(\frac{dX}{dt}\right)^\top
$$

---

#### 2. Matrix Product Rule

$$
\frac{d}{dt}(XY)
=
\dot X Y + X \dot Y
$$

---

#### 3. Quadratic Form

Let

$$
V(x) = x^\top A x
$$

Then

$$
\nabla V(x) = (A + A^\top)x
$$

If $A = A^\top$,

$$
\nabla V(x) = 2Ax
$$

---

#### 4. Chain Rule (Lyapunov Use)

For

$$
\dot x = f(x)
$$

$$
\dot V(x)
=
\nabla V(x)^\top f(x)
$$


---
# PART (1) — LINEAR VS NONLINEAR SYSTEMS

## 1. Linear Systems

A linear time-invariant system:

System:

$$
\dot{x} = A x
$$

Solution:

$$
x(t) = e^{At} x(0)
$$

The stability of the system is determined by the eigenvalues $\lambda_i$ of $A$.

- $\operatorname{Re}(\lambda_i) < 0$ for all $i$ $\Rightarrow$ **asymptotically stable**

- $\operatorname{Re}(\lambda_i) > 0$ for some $i$ $\Rightarrow$ **unstable**

- $\operatorname{Re}(\lambda_i) = 0$ for some $i$
  - if the eigenvalues on the imaginary axis are **simple** $\Rightarrow$ Lyapunov stable
  - otherwise $\Rightarrow$ unstable

Properties of linear systems:

- Superposition principle holds  
- The equilibrium is typically unique: $x = 0$  
- No limit cycles exist  
- The global behavior is completely determined by the spectrum of $A$



**1.1 limit cycle**

A limit cycle is an isolated periodic orbit of a nonlinear autonomous system

$$
\dot{x} = f(x)
$$

A trajectory $\gamma $ is a limit cycle if

- it is **periodic**
- there are no other periodic orbits arbitrarily close to it

Nearby trajectories may approach the orbit (stable), move away from it (unstable), or approach from one side only (semi-stable).

Limit cycles do not occur in linear systems.

---

#### Example

Consider the system in **polar coordinates**

$$
\dot R = -R(R^2-1), \qquad \dot \theta = 1
$$

Radial equilibria satisfy

$$
\dot R = 0 \Rightarrow R = 0,\; R = 1
$$

For $0<R<1$, $\dot R > 0 $ so the radius increases.  
For $R>1$, $ \dot R < 0 $ so the radius decreases.

Thus trajectories move toward R=1 while $\theta $ keeps rotating.

The circle

$$
R = 1
$$

is therefore a stable limit cycle.
you can have unstable one too if you like







---

## 2. Nonlinear Systems

General nonlinear autonomous system:

$$
\dot{x} = f(x)
$$

Equilibria satisfy:

$$
f(x_e) = 0
$$

Nonlinear systems may exhibit:

- Multiple equilibria  
- Limit cycles  
- Bifurcations  
- Finite escape time  
- Complex attractors  

Superposition does not hold:

$$
f(x_1 + x_2) \neq f(x_1) + f(x_2)
$$

Behavior depends on geometry of the vector field.

---

# PART (2) — MATHEMATICAL FOUNDATIONS

## 3. Normed Spaces

A norm satisfies:

1. $\Vert x\Vert  \ge 0$, and $\Vert x\Vert =0 \iff x=0$  
2. $\vert\alpha x\vert = \vert\alpha\vert\vert x\vert$  
3. $\Vert x+y\Vert  \le \Vert x\Vert +\Vert y\Vert $  

Common norms in $\mathbb{R}^n$:

$$
\Vert x\Vert _2 = \sqrt{x^\top x}, \quad$$
$$\Vert x\Vert _1 = \sum |x_i|, \quad$$
$$\Vert x\Vert _\infty = \max_i |x_i|$$


All norms are equivalent in finite dimensions.

---

## 4. Completeness

A sequence converges if:

$$
\Vert x_n - x\Vert  \to 0
$$

(in strict definition: every 
ε>0, there exists an integer 
N such that for all 
n≥N
the above <ε)


A sequence is Cauchy if:

$$
\Vert x_n - x_m\Vert  \to 0 \quad \text{as } n,m \to \infty
$$

A space is **complete** if every Cauchy sequence converges in that space.

actually in $\mathbb{R}$ , every cauthy seq is converged.

A complete normed space is called a Banach space.

Completeness is required for fixed-point theorems.

---

## 5. Contraction Mapping

A mapping $P$ is a contraction if:

$$
\Vert P(x)-P(y)\Vert  \le L \Vert x-y\Vert , \quad 0 \le L < 1
$$

**Banach Fixed-Point Theorem**

If $P$ is a contraction on a complete space:

- A unique fixed point exists  
- x is cauthy and iteration converges to fixed point $x^*$

---

# PART (3) — EXISTENCE & UNIQUENESS OF ODEs

## 6. Integral Form of ODE

Given:

$$
\dot{x} = f(t,x), \quad x(t_0)=x_0
$$

Integral form:

$$
x(t)=x_0+\int_{t_0}^{t} f(s,x(s))\,ds
$$

Define operator:

$$
(Px)(t)=x_0+\int_{t_0}^{t} f(s,x(s))\,ds
$$

Solving the ODE is equivalent to solving:

$$
Px = x
$$

Thus the ODE becomes a fixed-point problem.

---

## 7. Lipschitz Continuity

Global Lipschitz:

$$
\Vert f(x)-f(y)\Vert  \le L \Vert x-y\Vert 
$$

Local Lipschitz guarantees local existence and uniqueness.(with p.w. continuity)
> piecewise continuity looks like not continued
![alt text](/blogs/image-4.png){: width="75%" }

Global Lipschitz guarantees global existence (the condition for **no finite escape time**).

- you can actually take the derivative of the **linear system**, then the answer is the lipschitz constant
- lipschitz continuity $\rightarrow $ continuity

---

## 8. Finite Escape Time

Example:

$$
\dot{x} = 1 + x^2
$$

Solution:

$$
x(t)=\tan t
$$

Blow-up occurs at:

$$
t=\frac{\pi}{2}
$$

Conclusion:

- Local Lipschitz ⇒ local solution  
- Global growth control ⇒ global solution  

linear system does not have a finite escape time because the derivatives always a constant, so it is globally lipschitz $\rightarrow$ no finite escape time

---

## 9. Grönwall Inequality

If

$$
u(t) \le C + \int_{t_0}^{t} a(s) u(s)\,ds
$$

Then

$$
u(t) \le C \exp\!\left(\int_{t_0}^{t} a(s)\,ds\right)
$$

Used for:

- Continuous dependence on IC
- Growth bounds

---

## 10. Continuous Dependence on IC (Initial Conditions)

Four questions for nonlinear system:
1. solution exist?
2. solution unique?
3. have finite escape time?
4. continuous on IC?

Consider

$$
\dot{x} = f(t,x), \quad x(t_0)=x_0
$$

Assume:

- $f$ is continuous in $t$  
- $f$ is **locally Lipschitz** in $x$  

Then solutions depend continuously on the initial condition.

More precisely:

For $\forall$  $T>t_0$ and $\forall$ $\varepsilon>0$, there $\exists$ $\delta>0$ such that

$$
\Vert x_0 - y_0\Vert  < \delta
\Rightarrow
\sup_{t \in [t_0,T]}
\Vert x(t,x_0) - x(t,y_0)\Vert  < \varepsilon
$$

This means small perturbations in the initial condition produce small changes in the entire trajectory over finite time intervals.

---

# PART (4) — STABILITY THEORY

## 11. Equilibrium

$$
f(x_e)=0
$$

---

## 12. Compactness

Close + bounded = compact

Example: [0,1]

---

## 13. Lyapunov Stability

Stable if:

For $\forall$ $\varepsilon>0$, there $\exists$ $\delta>0$ such that

$$
\Vert x(0)-x_e\Vert <\delta
\Rightarrow
\Vert x(t)-x_e\Vert <\varepsilon
$$

(Note: $t$ means any time $t \ge 0$, not $t \to \infty$)

Asymptotically stable if additionally:

$$
x(t)\to x_e
$$


---

# PART (5) — LYAPUNOV DIRECT METHOD

## 14. Lyapunov Function

A scalar function $V(x)$ satisfies:

- $V(x)>0$ for $x\neq 0$  
- $V(0)=0$  

Derivative along trajectories:(basically $\dot x = f(x)$)

$$
\dot{V}(x)=\nabla V(x)^\top f(x)
$$

If

$$
\dot{V}(x)\le 0
$$

→ Stable.

If

$$
\dot{V}(x)<0
$$

→ Asymptotically stable.

> intuition:
>![alt text](/blogs/image-5.png){: width="75%" }

---

## 15. Global AS and LaSalle Theorem

If:

- $V(x)>0$  
- $\dot{V}(x)\le 0$  
- $V(x)\to \infty$  
as $x \to \infty$ (radially unbounded)

Then we say it is globally AS
(remember the picture Prof draw in class)

**LaSalle Thm**
preset 
- SISL
- let $\mathcal{S}'= \{x\in D \mid \dot V(x)=0 \} $, if the only solution of the system dynamics within S is x(t)=$x_e$ = 0

then $x_e$ is AS

S is invariance set,  in set S the $\dot{V} =0$, the other region in D is $\dot{V} <0$

this basically says the point will fall downward and fix only to the origin

---

## 16. Instability Theorem (Chetaev)

If:

- $V(0)=0$  
- $V(x)>0$  
- $\dot{V}(x)>0$  in a wedged region

or say: 

in some point in the $B_\delta(X_e) $ $V(x)>0$, 

and $\exists \varepsilon$ s.t. all $\dot{V}(x)$ >0 in this \{ $B_\epsilon(X_e)$ $\vert$ $V(x)>0$ \}

Then equilibrium is unstable.

![alt text](image-6.png){: width="25%" }


---

# PART (6) — LINEARIZATION & INDIRECT METHOD

## 17. Lyapunov Equation

For the linearized system
$$
\dot{x} = A(x - x_e),
$$

consider the quadratic Lyapunov function

$$
V(x) = (x - x_e)^{\top} P (x - x_e),
$$

where $P = P^{\top} > 0$.

The matrix $P$ satisfies the Lyapunov equation

$$
A^{\top} P + P A = -Q,
$$

where $Q = Q^{\top} > 0$. You can just assign $I$

If such a positive definite $P$ exists, then the equilibrium $x_e$ is locally asymptotically stable.

because the Lyapunov Equation makes 

$$

\dot{V} (x)= (x - x_e)^{\top} Q (x - x_e)<0

$$

---

## 18. Linearization

Linearization matrix:

$$
A = \frac{\partial f}{\partial x}\Big|_{x_e}
$$

Approximation:

$$
\dot{x} \approx A(x-x_e)
$$

**Linearization Example (Equilibrium Not at Origin)**

Consider the nonlinear system

$$
\begin{cases}
\dot x_1 = x_2 \\
\dot x_2 = -x_1 + 1 - (x_1 - 1)^3
\end{cases}
$$

---

**1. Equilibrium**

Solve

$$
x_2 = 0, \quad -x_1 + 1 - (x_1 - 1)^3 = 0
$$

We obtain

$$
x_e = (1,0).
$$

---

**2. Jacobian**

Let  

$$
f_1 = x_2, \quad
f_2 = -x_1 + 1 - (x_1 - 1)^3.
$$

Then

$$
A(x) =
\begin{bmatrix}
0 & 1 \\
-1 - 3(x_1 - 1)^2 & 0
\end{bmatrix}.
$$

Evaluate at $x_e = (1,0) $:

$$
J(x) =
\begin{bmatrix}
0 & 1 \\
-1 & 0
\end{bmatrix}.
$$

---

**3. Linearized System**

Define shifted state  $(x-x_e)$

$$
\tilde x =
\begin{bmatrix}
x_1 - 1 \\
x_2
\end{bmatrix}.
$$

Then the linear approximation is

$$
\dot{\tilde x} =
\begin{bmatrix}
0 & 1 \\
-1 & 0
\end{bmatrix}
\tilde x.
$$

---

## 19. Lyapunov Indirect Method

After linearization,

If eigenvalues of $J(x)$:

- $\forall$ Re(λ)<0 → locally asymptotically stable  
- $\exists$ Re(λ)>0 → unstable  
- $\exists$ Re(λ)=0 → inconclusive  (cannot say SISL) (if the linear system neither grows nor decays → higher-order nonlinear terms decide, so the test is inconclusive.)

Indirect method is local.

---

# PART (7) — REGION OF ATTRACTION

## 20. Region of Attraction (ROA)

Defined as:

$$
\mathcal{R} = \{x_0 : \lim_{t\to\infty} x(t,x_0)=0\}
$$

Exact ROA is difficult to compute.

Using quadratic Lyapunov function:

$$
V(x)=x^\top P x
$$

Level set:

$$
x^\top P x \le c
$$

provides an inner estimate of ROA.


---

# PART (8) — TIME-VARYING SYSTEMS

## 21. Time-Varying System Analysis

**Time-Varying System**

$$
\dot{x}=f(t,x)
$$

Equilibrium satisfies:

$$
f(t,x_e)=0,\quad \forall t
$$

Region of attraction may depend on time and can shrink.
---

## 22. Stability Types

- Stability may depend on initial time $t_0$
- Uniform stability does not depend on $t_0$

Uniform stability is stronger.

---

# PART (9) — LYAPUNOV FOR TIME-VARYING SYSTEMS

## 23. Class-$\mathcal{K}$ Functions

A function $\alpha:[0,a)\to[0,\infty)$ is class-$\mathcal{K}$ if:

- Continuous  
- Strictly increasing  
- $\alpha(0)=0$  

---

## 24. Locally Positive Definite

$$
V(t,x) \ge \alpha(\Vert x\Vert)
$$

for some $\alpha \in \mathcal{K}$.

---

## 25. Decrescent Function

$$
V(t,x) \le \gamma(\Vert x\Vert)
$$

for some $\gamma \in \mathcal{K}$.

---

## 26. Equivalent Condition

Define:

$$
W(x)=\inf_{t\ge0} V(t,x)
$$

Then $W(x)$ is positive definite.

---

## 27. Stability Theorem

If:

- $f$ is locally Lipschitz in $x$  
- $V$ is locally positive definite  
- $V$ is decrescent  
- $\dot{V}(t,x) \le 0$  

Then equilibrium is uniformly stable.

If:

$$
\dot{V}(t,x) < 0
$$

Then equilibrium is uniformly asymptotically stable.

---

# PART (10) — EXPONENTIAL STABILITY

## 28. Definition

Equilibrium is exponentially stable if:

$$
\Vert x(t)\Vert \le M e^{-\lambda t} \Vert x_0\Vert
$$

for some $M>0$, $\lambda>0$.


**Lyapunov Condition for ES**

If:

$$
c_1 \Vert x\Vert^2 \le V(x) \le c_2 \Vert x\Vert^2
$$

and

$$
\dot{V}(x) \le -c_3 V(x)
$$

Then system is exponentially stable.


**Relation**

$$
\text{Exponential Stability} \Rightarrow \text{Asymptotic Stability} \Rightarrow \text{Stability}
$$


**Example**

$$
\dot{x} = -x^3
$$

System is asymptotically stable but not exponentially stable.

---

# PART (11) — INDIRECT METHOD

## 29. Linearization & Eigenvalue Analysis


**Linearization**

Linearize system at equilibrium:

$$
A = \frac{\partial f}{\partial x}\Big|_{x=0}
$$


**Result**

- If all eigenvalues of $A$ have negative real parts → locally exponentially stable  
- If any eigenvalue has positive real part → unstable  
- If eigenvalues on imaginary axis → inconclusive  

---

# PART (12) — CONTROL LYAPUNOV FUNCTION (CLF)

## 31. Control Lyapunov Function Design


**Problem**

Design control:

$$
u = \alpha(x)
$$

such that:

$$
\dot{x} = f(x,u)
$$

is stable.


**CLF Definition**

A function $V(x)$ is a CLF if:

$$
V(x) > 0,\quad V(0)=0
$$

and

$$
\inf_{u} \frac{\partial V}{\partial x} f(x,u) < 0,\quad \forall x \ne 0
$$


**Interpretation**

There always exists a control $u$ such that:

$$
\dot{V}(x,u) < 0
$$


**Control Design Idea**

1. Choose Lyapunov function $V(x)$  
2. Design $u(x)$ such that:

$$
\dot{V}(x) < 0
$$

---

# PART (13) — STABILIZATION

## 35. Full-State Feedback Control Design


**Full-State Feedback**

Closed-loop system:

$$
\dot{x} = f(x,\alpha(x))
$$

Goal: make equilibrium globally asymptotically stable.


**Key Idea**

Control enforces energy decrease:

$$
\dot{V}(x) < 0
$$


**Outcome**

- Stability achieved  
- Possibly exponential convergence  