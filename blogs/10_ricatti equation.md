---
layout: blog
title: 10. Riccati Equation
description: Notes on the algebraic and differential Riccati equation in optimal control (LQR).
parent_url: /blogs/blogIndex.html
parent_label: Back to Blogs
---

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

### Cost-to-go and the Bellman equation

Define $J_t(x)$ as the smallest possible value of the remaining part of $J$, from time $t$ to the end, when the state at time $t$ is $x$. (In many texts this is written $V_t(x)$ and called the value function; it is just the remaining part of $J$.)

**Principle of optimality.** Any tail of an optimal trajectory must itself be optimal. So the best we can do from time $t$ is the cost of this step plus the best we can do from wherever we land:

$$
J_t(x) = \min_{u} \Big[\, x^\top Q\, x + u^\top R\, u + J_{t+1}(Ax + Bu) \,\Big]
$$

This is the **Bellman equation**. Since $J_t$ needs $J_{t+1}$, it is solved backward, starting from the last step.

### Start from the last step

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

Going back one more step works the same way, with $Q$ in the last term replaced by $P_{t+1}$. So for every $t$:

$$
P_t = Q + A^\top P_{t+1} A - A^\top P_{t+1} B\, (R + B^\top P_{t+1} B)^{-1} B^\top P_{t+1} A
$$

$$
u_t^* = -(R + B^\top P_{t+1} B)^{-1} B^\top P_{t+1} A\; x_t
$$

### Why $P$ converges

Count by the number of steps remaining, $n = T - t$. Then $P$ is:

- **Non-decreasing.** One more remaining step means one more step of cost, and every step costs at least zero.
- **Bounded above.** If $(A, B)$ is stabilizable (controllability is enough), there is some gain $\bar K$ that makes $A - B\bar K$ stable. Using it forever, the state shrinks geometrically, so the total cost is finite. The optimal cost can only be lower.

A non-decreasing sequence that is bounded above converges.

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

### What the constraints break

Now bring the restrictions back: $-10 \le u \le 10$, plus the bounds on each state. The LQR law $u_t = -K x_t$ knows nothing about them.

- If the limits are never reached, nothing changes. From $x_0 = [2,\,1,\,1]^\top$, the LQR input peaks at $\lvert u \rvert = 4.46$ and the states stay within $\lvert x_1 \rvert \le 6$, $\lvert x_2 \rvert \le 4$, $\lvert x_3 \rvert \le 4.61$. So for the original exercise, the constrained problem has the same answer as LQR.
- If they are reached, the simplest fix is to clip $u$ to the limits. This is no longer optimal, and clipping $u$ does nothing about the state limits.
- More fundamentally, the derivation above breaks. With a limit on $u$, the minimum in the Bellman equation can sit on the boundary instead of where the derivative is zero, so $J_t(x)$ is no longer a single quadratic $x^\top P x$. Without that "same form" step, there is no Riccati equation and no fixed $K$.

### The MPC idea

Since we can no longer get a formula offline, MPC solves the problem numerically online, from the current state, at every time step:

**Step 1.** At time $t$, measure the current state $x_t$.

**Step 2.** Predict $N$ steps ahead, and use the state equation to replace all future states with the inputs at once:

$$
X = \bar A\, x_t + \bar B\, U, \qquad X = \begin{bmatrix} x_{t+1} \\ \vdots \\ x_{t+N} \end{bmatrix},\quad U = \begin{bmatrix} u_t \\ \vdots \\ u_{t+N-1} \end{bmatrix}
$$

**Step 3.** The objective becomes a quadratic function of $U$ alone, and the limits become linear inequalities on $U$. This is a quadratic program (QP):

$$
\min_U\ \tfrac12\, U^\top H\, U + f^\top U \quad \text{s.t.} \quad u_{\min} \le U \le u_{\max}
$$

$$
H = 2\big(\bar B^\top \bar Q\, \bar B + \bar R\big), \qquad f = 2\, \bar B^\top \bar Q\, \bar A\, x_t
$$

It is solved with an iterative QP solver; the course code uses ADMM, and my version uses accelerated projected gradient.
**Step 4.** Apply only the first input $u_t$ and throw away the rest. At the next step, measure again and repeat. This is the receding horizon.

### Why this is a natural extension of LQR

- It uses the same model and the same $Q$, $R$ objective. The only differences are the constraints and that the problem is solved online.
- When no constraint is active, the QP solution is the unconstrained one, and its first input is exactly the LQR input. For the Tianwen-1 system with $N = 10$, the first row of the unconstrained QP solution is $[-1.910,\ 0.637,\ 2.070]$, the same gain the Riccati recursion gives, and equal to the infinite-horizon $K$ to four digits.
- MPC only looks $N$ steps ahead instead of forever. A common fix is to use the $P$ from the algebraic Riccati equation as the weight on the last predicted state, $x_{t+N}^\top P\, x_{t+N}$, which counts the cost after step $N$ as if LQR took over from there. (The course code simply uses $Q$ there.)

In short: LQR is MPC without constraints, and MPC is LQR that can respect limits, at the price of solving a QP at every step.

### An example where the constraint matters

Start from $x_0 = [6,\,3,\,3]^\top$, three times the original initial state, with $\lvert u \rvert \le 10$. Over 40 steps:

| Controller | Peak $\lvert u \rvert$ | Total cost |
|---|---|---|
| LQR, with $u$ clipped to $\pm 10$ | 10 | 2337 |
| MPC, $N = 10$ | 10 | 1419 |

Both bring the state to zero, but MPC's cost is about 39% lower, because it plans around the limit instead of running into it. Both trajectories also reach $\lvert x_2 \rvert = 12$, beyond its bound of 10. That is because this MPC, like the course code, only constrains $u$. To respect the state bounds, add them to the QP as $x_{\min} \le \bar A\, x_t + \bar B\, U \le x_{\max}$.

There is also a limit to what any controller can do. From $x_0 = [10,\,5,\,5]^\top$, both controllers diverge. The open-loop system is unstable and the throttle is bounded, so from far enough away no allowed input can pull the state back. Once the state bounds are added, MPC shows this as an infeasible QP, which is what the comment in the course code warns about.
