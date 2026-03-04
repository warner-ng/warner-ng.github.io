---
layout: default
title: Nonlinear Systems — Complete Notes
description: Complete notes on nonlinear systems covering existence & uniqueness, contraction mapping, Lyapunov theory, LaSalle theorem, instability, linearization, region of attraction, time-varying systems, and exponential stability.
---

# NONLINEAR SYSTEMS — COMPLETE NOTES
### ESSENTIAL MATRIX DERIVATIVE RULES

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
# PART I — LINEAR VS NONLINEAR SYSTEMS

## 1. Linear Systems

A linear time-invariant system:

$$
\dot{x} = A x
$$

Solution:

$$
x(t) = e^{At} x(0)
$$

Stability depends on eigenvalues $\lambda_i$ of $A$:

- $\operatorname{Re}(\lambda_i) < 0$ → asymptotically stable  
- $\operatorname{Re}(\lambda_i) > 0$ → unstable  
- $\operatorname{Re}(\lambda_i) = 0$ → inconclusive  

Linear systems:

- Superposition holds  
- Typically unique equilibrium $x=0$  
- No limit cycles  
- Global behavior determined by spectrum  

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

# PART II — MATHEMATICAL FOUNDATIONS

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

A sequence is Cauchy if:

$$
\Vert x_n - x_m\Vert  \to 0 \quad \text{as } n,m \to \infty
$$

A space is complete if every Cauchy sequence converges in that space.

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
- Iteration converges  

---

# PART III — EXISTENCE & UNIQUENESS OF ODEs

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

Local Lipschitz guarantees local existence and uniqueness.

Global Lipschitz guarantees global existence (the condition for **no finite escape time**).

- you can actually take the derivative of the **linear system**, then the answer is the lipschitz constant

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
four question for nonlinear system
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

# PART IV — STABILITY THEORY

## 10. Equilibrium

An equilibrium satisfies:

$$
f(x_e)=0
$$

---

## 11. Lyapunov Stability

Stable if:

For any $\varepsilon>0$, there exists $\delta>0$ such that

$$
\Vert x(0)-x_e\Vert <\delta
\Rightarrow
\Vert x(t)-x_e\Vert <\varepsilon
$$

that 𝑡 means any time 
𝑡
≥
0
not 
𝑡
→
∞

Asymptotically stable if additionally:

$$
x(t)\to x_e
$$

---

# PART V — LYAPUNOV DIRECT METHOD

## 12. Lyapunov Function

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

---

## 13. Global AS and LaSalle Thm (one different condition for AS)



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
- let $\mathcal{S}'=\{x\in D \mid \dot V(x)=0\}$, if the only solution of the system dynamics within S is x(t)=$x_e$ = 0

then $x_e$ is AS

S is invariance set,  in set S the $\dot{V} =0$, the other region in D is $\dot{V} <0$

this basically says the point will fall downward and fix only to the origin

---

## 14. Instability Theorem

If:

- $V(0)=0$  
- $V(x)>0$  
- $\dot{V}(x)>0$  in a wedged region

Then equilibrium is unstable.

---

# PART VI — LINEARIZATION & INDIRECT METHOD

## 14. Lyapunov Equation

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

## 15. Linearization

Linearization matrix:

$$
A = \frac{\partial f}{\partial x}\Big|_{x_e}
$$

Approximation:

$$
\dot{x} \approx A(x-x_e)
$$
### Linearization Example (Equilibrium Not at Origin)

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
A =
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

## 16. Lyapunov Indirect Method

If eigenvalues of $A$:

- All have negative real parts → locally asymptotically stable  
- At least one positive real part → unstable  
- Zero real part present → inconclusive  

Indirect method is local.

---

# PART VII — REGION OF ATTRACTION

## 17. Region of Attraction (ROA)

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

# PART VIII — GLOBAL ASYMPTOTIC STABILITY

## 18. Global Asymptotic Stability (GAS)

If:

- Equilibrium stable  
- All trajectories converge  

Lyapunov sufficient conditions:

- $V(x)>0$  
- $\dot{V}(x)<0$  
- $V(x)\to\infty$ as $\Vert x\Vert \to\infty$  

Then system is globally asymptotically stable.

---

# PART IX — TIME-VARYING SYSTEMS

## 19. Time-Varying System

$$
\dot{x}=f(t,x)
$$

Uniform stability means $\delta$ does not depend on initial time.

---

## 20. Class-$\mathcal{K}$ Functions

A function $\alpha:[0,a)\to[0,\infty)$ is class-$\mathcal{K}$ if:

- Continuous  
- Strictly increasing  
- $\alpha(0)=0$  

Used in Lyapunov bounds:

$$
\alpha_1(\Vert x\Vert ) \le V(t,x) \le \alpha_2(\Vert x\Vert )
$$

---

## 21. Exponential Stability

Equilibrium is exponentially stable if:

$$
\Vert x(t)\Vert  \le M e^{-\lambda t} \Vert x_0\Vert 
$$

for some $M>0$, $\lambda>0$.

Lyapunov condition:

If

$$
\alpha_1\Vert x\Vert ^2 \le V(x) \le \alpha_2\Vert x\Vert ^2
$$

and

$$
\dot{V}(x) \le -\alpha_3 \Vert x\Vert ^2
$$

Then system is exponentially stable.

Exponential stability implies asymptotic stability.

---

