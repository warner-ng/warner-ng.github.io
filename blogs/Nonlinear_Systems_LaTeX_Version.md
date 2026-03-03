---
layout: default
title: Nonlinear Systems — Complete Notes
description: Complete notes on nonlinear systems covering stability theory, Lyapunov methods, contraction mapping, and existence/uniqueness theorems.
---

# NONLINEAR SYSTEMS --- COMPLETE REWRITE

## 1. Historical Background and Motivation

Control theory developed through several major stages.

Early control appeared in mechanical systems such as water clocks and
steam governors, where feedback was implemented physically without
formal mathematical models.

Classical control (1900--1950) introduced frequency-domain tools such as
root locus and Bode plots.

Modern control (1960--) introduced state-space representations, optimal
control, and Linear Quadratic Regulator (LQR) theory.

Learning-based control integrates model predictive control with
reinforcement learning.

Nonlinear systems arise naturally because real-world systems are rarely
perfectly linear. Linear models are local approximations, but full
dynamics are nonlinear.

------------------------------------------------------------------------

# PART I --- LINEAR VS NONLINEAR SYSTEMS

## 2. Linear Systems

A linear time-invariant system has the form

$$
\dot{x} = A x
$$

where $A \in \mathbb{R}^{n \times n}$.

The unique equilibrium satisfies

$$
A x_e = 0 \quad \Rightarrow \quad x_e = 0.
$$

The solution is

$$
x(t) = e^{At} x(0).
$$

Stability depends on eigenvalues $\lambda_i$ of $A$:

-   If $\operatorname{Re}(\lambda_i) < 0$ for all $i$, the system is
    asymptotically stable.
-   If some $\operatorname{Re}(\lambda_i) > 0$, the system is unstable.

The exponential term $e^{\lambda t}$ explains why the real part
determines growth or decay.

Linear systems cannot exhibit limit cycles or bifurcations without
parameter changes.

------------------------------------------------------------------------

## 3. Nonlinear Systems

A nonlinear autonomous system has the form

$$
\dot{x} = f(x).
$$

Such systems may have multiple equilibria satisfying

$$
f(x_e) = 0.
$$

Nonlinear systems can exhibit

-   Limit cycles
-   Bifurcations
-   Finite escape time

Superposition does not hold because

$$
f(x_1 + x_2) \neq f(x_1) + f(x_2).
$$

Behavior depends on geometry of the vector field.

------------------------------------------------------------------------

# PART II --- MATHEMATICAL FOUNDATION

## 4. Normed Spaces

A normed space $(V, \|\cdot\|)$ satisfies:

1.  $\|x\| \ge 0$, and $\|x\| = 0 \iff x = 0$
2.  $\|\alpha x\| = \lvert\alpha\rvert \|x\|$
3.  $\|x + y\| \le \|x\| + \|y\|$

Common norms in $\mathbb{R}^n$:

$$
\|x\|_2 = \sqrt{x^\top x}, \quad
\|x\|_1 = \sum |x_i|, \quad
\|x\|_\infty = \max_i |x_i|.
$$

All norms are equivalent in finite dimensions.

------------------------------------------------------------------------

## 5. Open and Closed Sets

An open ball is

$$
B(x_0, r) = \{x : \|x - x_0\| < r\}.
$$

A set is compact in $\mathbb{R}^n$ if and only if it is closed and
bounded.

Compactness prevents trajectories from escaping to infinity.

------------------------------------------------------------------------

## 6. Completeness

A sequence converges if

$$
\|x_n - x\| \to 0.
$$

A sequence is Cauchy if

$$
\|x_n - x_m\| \to 0 \quad \text{as } n,m \to \infty.
$$

a Cauchy sequence does not necessarily converge

a **space** is complete if **every Cauchy sequence** in that space actually converges to a point inside the same space. 

A Banach space is a complete normed space.

Completeness is required for fixed-point theorems.

------------------------------------------------------------------------

# PART III --- CONTRACTION MAPPING

## 7. Contraction Mapping

A mapping $P$ is a contraction if

$$
\|P(x) - P(y)\| \le L \|x - y\|, \quad 0 \le L < 1.
$$

Banach Fixed Point Theorem:

If $P$ is a contraction on a complete space, then a unique fixed point
exists and iteration converges.

------------------------------------------------------------------------

# PART IV --- EXISTENCE AND UNIQUENESS

## 8. ODE Integral Form

Consider

$$
\dot{x} = f(t,x), \quad x(t_0) = x_0.
$$

Integral form:

$$
x(t) = x_0 + \int_{t_0}^{t} f(s, x(s)) ds.
$$

Define operator P

$$
(Px)(t) = x_0 + \int_{t_0}^{t} f(s, x(s)) ds.
$$

This means: give me a function 
𝑥, and I will compute a new function using this formula.

Now this holds

$$
(Px)(t)=x(t),
$$

which is written compactly as

$$
Px=x.
$$

This is a fixed-point problem in a function space.
solving the differential equation is equivalent to **finding a fixed point of an operator** in a function space.

this will help in later contraction mapping theorem

------------------------------------------------------------------------

## 9. Lipschitz Continuity

Global Lipschitz:

$$
\|f(x) - f(y)\| \le L \|x - y\|.
$$

Local Lipschitz holds in a neighborhood.

Local Lipschitz ensures local existence and uniqueness.

------------------------------------------------------------------------

## 10. Finite Escape Time

Example:

$$
\dot{x} = x^2.
$$

Solution:

$$
x(t) = \frac{x_0}{1 - x_0 t}.
$$

Blow-up occurs at

$$
t = \frac{1}{x_0}.
$$

SO, smoothness alone does not guarantee global existence.

------------------------------------------------------------------------

## 11. Grönwall Inequality

If

$$
u(t) \le C + \int_{t_0}^{t} a(s) u(s) ds,
$$

then

$$
u(t) \le C \exp\left(\int_{t_0}^{t} a(s) ds\right).
$$

This bounds growth by an exponential envelope.

------------------------------------------------------------------------

# PART V --- STABILITY THEORY

## 12. Stability Definitions

Equilibrium:

$$
f(x_e) = 0.
$$

Lyapunov stability:

For $\forall$ $\varepsilon > 0$, there $\exists$ $\delta > 0$ such that

$$
\|x(0) - x_e\| < \delta \Rightarrow \|x(t) - x_e\| < \varepsilon.
$$

$\delta > 0$ could be big circleor smaller circle than $\varepsilon$

Asymptotic stability requires convergence:

$$
x(t) \to x_e.
$$

------------------------------------------------------------------------

# PART VI --- LYAPUNOV METHOD

## 13. Lyapunov Function

A scalar function $V(x)$ satisfies

$$
V(x) > 0 \text{ for } x \neq x_e, \quad V(x_e)=0.
$$

Derivative along trajectories:($\dot{x} = f(x)$)

$$
\dot{V}(x) = \nabla V(x)^\top f(x).
$$

If

$$
\dot{V}(x) < 0,
$$

then the equilibrium is asymptotically stable.

------------------------------------------------------------------------

## 14. Linearization

Linear approximation near $x_e$:

$$
\dot{x} \approx A (x - x_e), \quad A = \frac{\partial f}{\partial x}\bigg|_{x_e}.
$$

Eigenvalues determine local behavior.

------------------------------------------------------------------------

## 15. Quadratic Lyapunov Function

Choose

$$
V(x) = x^\top P x, \quad P > 0.
$$

Lyapunov equation:

$$
A^\top P + P A = -Q, \quad Q > 0.
$$

Then

$$
\dot{V} = - x^\top Q x < 0.
$$

------------------------------------------------------------------------

## 16. Eigenvalues of Triangular Matrices

For a triangular matrix

$$
A =
\begin{bmatrix}
a & * & * \\
0 & b & * \\
0 & 0 & c
\end{bmatrix},
$$

the eigenvalues are

$$
\lambda_1 = a, \quad \lambda_2 = b, \quad \lambda_3 = c.
$$

The characteristic polynomial factors automatically because of
triangular structure.
