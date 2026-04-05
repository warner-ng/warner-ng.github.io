---
layout: default
title: Nonlinear Systems — Complete Notes
description: Complete notes on nonlinear systems covering existence & uniqueness, contraction mapping, Lyapunov theory, LaSalle theorem, instability, linearization, region of attraction, time-varying systems, and exponential stability.
---

# NONLINEAR SYSTEMS — COMPLETE NOTES

**ESSENTIAL MATRIX DERIVATIVE RULES**

1. Derivative of a Transpose

Let $X = X(t)$.

$$
\frac{d}{dt}(X^\top)
=
\left(\frac{dX}{dt}\right)^\top
$$

2. Matrix Product Rule

$$
\frac{d}{dt}(XY)
=
\dot X Y + X \dot Y
$$

3. Quadratic Form

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

4. Chain Rule (Lyapunov Use)

For

$$
\dot x = f(x)
$$

$$
\dot V(x)
=
\nabla V(x)^\top f(x)
$$



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

## 3. Normed Spaces

A norm satisfies:

1. $\Vert x\Vert  \ge 0$, and $\Vert x\Vert =0 \iff x=0$  
2. $\vert\alpha x\vert = \vert\alpha\vert\vert x\vert$  
3. $\Vert x+y\Vert  \le \Vert x\Vert +\Vert y\Vert $  

Common norms in $\mathbb{R}^n$:

$$\Vert x\Vert _2 = \sqrt{x^\top x}, \quad$$
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

# ----STABILITY THEORY----

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



## 14. Lyapunov Direct Method

A scalar function $V(x)$ ( Lyapunov function )satisfies:

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

sublevel set:

$$
x^\top P x \le c
$$

provides an inner estimate of ROA.

Formular:

$\because \lambda_{min} X^TX \le X^TPX \le \lambda_{max}X^TX  $  and  $x^\top P x \le c$ 

$\therefore $$
\lambda_{\min} \Vert x_{min} \Vert^2 \le c
\;\Rightarrow\;
\Vert x_{min} \Vert \le \sqrt{\frac{c}{\lambda_{\min}}}
$

and

$\lambda_{\max} \Vert x_{max} \Vert^2 \le c
\;\Rightarrow\;
\Vert x_{max} \Vert \le \sqrt{\frac{c}{\lambda_{\max}}}$





---

# Time-Varying System

## 21. Stability of Time-Varying System

1.Time-Varying Systems

System:
$$
\dot{x} = f(t,x)
$$

Equilibrium point:
$$
\dot{x}\big|_{x_e} = 0 \;\Longleftrightarrow\; f(t,x_e)=0, \quad \forall t \ge t_0
$$

Region of Attraction (ROA): may depend on time \(t\), and can shrink.

---

2.Stability **Definitions** (Time-Varying)

- **Stability (SISL)**:

$$
\forall \varepsilon > 0,\; \exists \delta(\varepsilon, t_0) > 0
\;\text{s.t.}\;
\Vert x(t_0)\Vert < \delta
\;\Rightarrow\;
\Vert x(t)\Vert < \varepsilon,\; \forall t \ge t_0
$$

- ​**Uniform stability**:

$$
\forall \varepsilon > 0,\; \exists \delta(\varepsilon) > 0
\;\text{s.t.}\;
\Vert x(t_0)\Vert < \delta
\;\Rightarrow\;
\Vert x(t)\Vert < \varepsilon,\; \forall t \ge t_0
$$

(note: $\delta$ does not depend on \(t_0\))

Otherwise: unstable.

---

- ​**Asymptotic stability**:

$$
\exists \delta(t_0) > 0
\;\text{s.t.}\;
\Vert x(t_0)\Vert < \delta
\;\Rightarrow\;
x(t) \to 0 \quad \text{as } t \to \infty
$$

---

- ​**Uniform asymptotic stability**:

$$
\forall x_0\le c \\

\Vert x(t)\Vert \to 0 \quad \text{as } t \to \infty
$$
independent of \(t_0\)

---


- ​**Global uniform asymptotic stability**:
$$
\Vert x(t)\Vert \to 0 \quad \text{as } t \to \infty
$$


---

Notes:

- difference between uniform and normal one is the dependance of  $t_0$ 

  For **normal (SISL) stability**:
  $$
  \forall \varepsilon>0,\;\exists \delta(\varepsilon,t_0)>0
  $$
  Here $\delta$ depends on $t_0$, so the system can behave differently if you start later. This is weaker.

  For **uniform stability**:
  $$
  \forall \varepsilon>0,\;\exists \delta(\varepsilon)>0
  $$
  Here $\delta$ is independent of $t_0$, so the same bound works for all starting times. This is stronger.



## 22. Class-$\mathcal{K}$ Functions

we introduce this to solve previous lyapunov conditions not working problems

---
1.class-$\mathcal{K}$

A function $\alpha:[0,a)\to[0,\infty)$ is class-$\mathcal{K}$ if:

- Continuous
- Strictly increasing
- $\alpha(0)=0$


---

2.locally positive definite

A function
$$
V : [0,\infty) \times \mathbb{R}^n \to \mathbb{R}
$$
is locally positive definite if



1. $V(t,0) = 0, \quad V(t,x) > 0 \;\; \forall x \ne 0,\; \forall t \ge 0$


2. there exists \( r > 0 \) and a class-\(\mathcal{K}\) function
$
\alpha : [0,r) \to [0,\infty)
$

such that
$$
V(t,x) \ge \alpha(\Vert x \Vert), \quad \forall t \ge 0,\; \forall x \in B_r(0)
$$


![alt text](image-7.png){: width="75%" }

---

3.decrescent

A continuous function
$$
V : [0,\infty) \times \mathbb{R}^n \to \mathbb{R}
$$
is decrescent if there exists \( \delta > 0 \) and a class-\(\mathcal{K}\) function
$$
\gamma : [0,\infty) \to [0,\infty)
$$

such that
$$
V(t,x) \le \gamma(\Vert x \Vert), \quad \forall t \ge 0,\; \forall x \in B_\delta(0)
$$



![alt text](image-8.png){: width="75%" }

---
## 23. Lyapunov Conditions (Time-Varying)

(TFAE — The following are equivalent)

1.  $V(t,x)$ is locally positive definite  

2.  $\exists\; W(x)$ locally positive definite such that
$$
V(t,x) \ge W(x), \quad \forall t \ge 0,\; \forall x \in B_r(0)
$$

3. define
$$
\bar W(x) := \inf_{t \ge 0} V(t,x)
\quad \text{is locally positive definite}
$$

---

Consider the system
$$
\dot{x} = f(t,x), \quad x(t_0)=x_0, \quad f(t,0)=0,\; \forall t \ge 0
$$

Assume $f$ is locally Lipschitz in $x$ and piecewise continuous in $t$

---



1. Uniform SISL

- $x_e = 0$ is uniformly stable if there exists $V(t,x)$ such that

  - $V(t,x)$ is locally positive definite  

  - $V(t,x)$ is **decrescent**

  - $\dot{V}(t,x) \le 0,\; \forall t \ge 0,\; x \in B_r(0)$  

![alt text](image-9.png){: width="75%" }

---



2. Uniform Asymptotic Stability

- $x_e = 0$ is uniformly asymptotically stable if

  - conditions of uniform stability hold  

  - $V(t,x)$ is decrescent  

  - and $-\dot V(t,x)$ is locally positive definite

![alt text](image-10.png){: width="75%" }

Q: Why do we use “locally positive definite” $V(t,x)$ in time-varying systems instead of just $V>0$?

> A: Because $V$ depends on $t$ and may shrink over time, so we need a time-independent lower bound
$$
V(t,x) \ge \alpha(\Vert x \Vert)
$$
> to ensure uniform positivity. (see class-k function)

---

## 24. Stability Conditions for Time-Varying Systems

If $f$ is locally Lipschitz in $x$ and $V(t,x)$ satisfies:
- $V(t,x) \ge \alpha(\Vert x\Vert)$ (locally positive definite)
- $V(t,x) \le \gamma(\Vert x\Vert)$ (decrescent)
- $\dot{V}(t,x) \le 0$

Then equilibrium is uniformly stable.

If $\dot{V}(t,x) < 0$, then equilibrium is uniformly asymptotically stable.



## 25. Exponential Stability

Equilibrium is exponentially stable if:

$$
\Vert x(t)\Vert \le M e^{-\lambda t} \Vert x_0\Vert
$$

for some $M>0$, $\lambda>0$.

Lyapunov condition: If $c_1 \Vert x\Vert^2 \le V(x) \le c_2 \Vert x\Vert^2$ and $\dot{V}(x) \le -c_3 V(x)$, then exponentially stable.

---

## 26. Stability Hierarchy

$$
\text{Exponential Stability} \Rightarrow \text{Asymptotic Stability} \Rightarrow \text{Stability}
$$

Example: $\dot{x} = -x^3$ is asymptotically stable but NOT exponentially stable.

# 

## 27. Linearization & Eigenvalue Test

Linearize system at equilibrium:

$$
A = \frac{\partial f}{\partial x}\Big|_{x=0}
$$

Stability determined by eigenvalues of $A$:
- All $\text{Re}(\lambda) < 0$ → locally asymptotically stable
- Any $\text{Re}(\lambda) > 0$ → unstable
- $\text{Re}(\lambda) = 0$ → inconclusive (higher-order terms decide)  



## 28. CLF Design

A function $V(x)$ is a CLF if:
$$
V(x) > 0,\quad V(0)=0
$$

and there exists control $u$ such that:
$$
\inf_{u} \frac{\partial V}{\partial x} f(x,u) < 0,\quad \forall x \ne 0
$$

Design: Choose $V(x)$ and design $u(x)$ to enforce $\dot{V}(x) < 0$.



## 29. Full-State Feedback Stabilization

Closed-loop system:
$$
\dot{x} = f(x,\alpha(x))
$$

Goal: Make equilibrium globally asymptotically stable.

Method: Design feedback control $u = \alpha(x)$ such that $\dot{V}(x) < 0$ for a chosen Lyapunov function $V(x)$.

Result: Stability achieved, possibly with exponential convergence.  