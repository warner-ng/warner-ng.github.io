---
layout: default
title: Flow Matching Explained
description: An intuitive explanation of Flow Matching for generative modeling as an alternative to diffusion models
---

# Flow Matching: A Modern Approach to Generative Modeling

Flow Matching is a contemporary generative modeling technique that's gaining traction as an alternative to diffusion models. You see it increasingly in diffusion transformer models, text-to-image generation, and recent work in score-based generative models. The key advantage is that Flow Matching offers a more direct and efficient way to learn generative models by directly matching probability flows.

In this post, we'll start from the intuition of what Flow Matching is trying to solve, then build up the mathematical foundations step by step. The goal is to help you understand how it connects to probability theory, optimal transport, and neural networks.

---

## 1. The Problem: Sampling from Complex Distributions

In generative modeling, we want to learn a model that can sample from a complex data distribution $p_{\text{data}}(x)$. The naive approach would be to directly model the distribution, but this is hard because:

- The data distribution is often high-dimensional and multimodal
- We don't have a closed-form expression for $p_{\text{data}}(x)$
- Direct sampling is computationally intractable

So instead, we use a different strategy: **transform a simple distribution (like Gaussian noise) into the complex data distribution through a continuous transformation**.

---

## 2. Continuous Normalizing Flows

The idea of using continuous transformations dates back to **Neural ODEs** and **Continuous Normalizing Flows**. Let's denote a trajectory of transformations as:

$$
\begin{align}
\frac{dx_t}{dt} = v_t(x_t)
\end{align}
$$

where $v_t(x_t)$ is a velocity vector field that depends on both time $t$ and position $x_t$.

If we start from some simple distribution at $t=0$ (e.g., $p_0(x) = \mathcal{N}(x \mid 0, I)$) and integrate this ODE forward to time $t=T$, we can arrive at a complex distribution $p_T(x)$ at the end.

Q1: How does the probability density change as we transform the distribution?

The answer comes from the **change of variables formula** in probability. If we have a deterministic transformation $x_T = \Phi_T(x_0)$, the relationship between densities is:

$$
\begin{align}
p_T(x_T) = p_0(x_0) \left| \det \frac{\partial \Phi_T}{\partial x_0} \right|^{-1}
\end{align}
$$

For continuous flows, this extends to the **Continuity Equation**:

$$
\begin{align}
\frac{\partial p_t(x)}{\partial t} + \nabla \cdot (p_t(x) v_t(x)) = 0
\end{align}
$$

This says: the rate of change of density at a point equals the negative divergence of the probability current flowing through that point.

---

## 3. From Diffusion to Flow Matching

Diffusion models work by gradually adding noise to data, then learning to reverse this process. But there's another way to think about this: **as a flow problem**.

In diffusion models, we learn a score function $\nabla_x \log p_t(x)$ at each time step. But what if we directly learned a **velocity field** $v_t(x)$ instead?

This is the core insight of Flow Matching:

$$
\begin{align}
\frac{dx_t}{dt} = v_t(x_t)
\end{align}
$$

where $v_t$ is parameterized by a neural network $v_\theta(x_t, t)$.

Q2: Why is learning a velocity field better than learning the score?

There are several reasons:
- **Direct supervision**: In diffusion, you need multiple steps to generate a sample. With flows, you have a single deterministic path from noise to data.
- **Efficiency**: You can often take fewer steps to generate high-quality samples
- **Flexibility**: The flow doesn't have to follow the reverse diffusion path; it can find more direct routes

---

## 4. The Flow Matching Objective

Now here's the key question: **how do we train the velocity field $v_\theta(x_t, t)$?**

The naive approach would be to minimize:

$$
\begin{align}
\mathcal{L} = \mathbb{E}_{x_T \sim p_T} \left[ || v_\theta(x_T, T) - v_{\text{target}, T}(x_T) ||^2 \right]
\end{align}
$$

But we don't have access to the true velocity field $v_{\text{target}, t}(x)$ for the data distribution!

This is where **Flow Matching** introduces a clever trick: we can use **conditional flows** to construct target velocity fields that are tractable.

### 4.1 Conditional Flows

Consider a conditional flow from $x_0 \sim p_0$ to $x_1 \sim p_1$. We can define a simple linear interpolation path:

$$
\begin{align}
\psi_t(x_0, x_1) = (1-t) x_0 + t x_1
\end{align}
$$

The velocity field for this path is:

$$
\begin{align}
u_t(x_0, x_1) = \frac{d\psi_t}{dt} = x_1 - x_0
\end{align}
$$

Notice something beautiful: **this velocity field is constant and doesn't depend on $t$!** It's just the difference between the start and end points.

### 4.2 Marginalizing Over Paths

Now, if we have access to data samples $x_1 \sim p_{\text{data}}$ and can sample $x_0 \sim p_0$, we can define a target velocity field as:

$$
\begin{align}
v_t^*(x_t) = \mathbb{E}_{x_0, x_1} [u_t(x_0, x_1) | x_t]
\end{align}
$$

where $x_t = (1-t) x_0 + t x_1$.

The Flow Matching objective becomes:

$$
\begin{align}
\mathcal{L}_{\text{FM}} = \int_0^1 \mathbb{E}_{x_0 \sim p_0, x_1 \sim p_{\text{data}}} \left[ || v_\theta(x_t, t) - (x_1 - x_0) ||^2 \right] dt
\end{align}
$$

where $x_t = (1-t) x_0 + t x_1$.

This is brilliant because:
- We can directly supervise $v_\theta$ with $(x_1 - x_0)$
- We don't need to estimate any density gradients or scores
- The target is simple and tractable

---

## 5. The Training Algorithm

Here's the practical algorithm:

```algorithm
\begin{algorithm}
\caption{Flow Matching Training}
\begin{algorithmic}
\STATE Initialize velocity network $v_\theta(\cdot)$
\FOR{each training iteration}
    \STATE Sample $x_1 \sim p_{\text{data}}$ (from training data)
    \STATE Sample $x_0 \sim p_0$ (e.g., $\mathcal{N}(0, I)$)
    \STATE Sample $t \sim \text{Uniform}(0, 1)$
    \STATE Compute $x_t = (1-t) x_0 + t x_1$
    \STATE Compute target velocity: $u = x_1 - x_0$
    \STATE Minimize: $|| v_\theta(x_t, t) - u ||^2$
    \STATE Update $\theta$ via SGD
\ENDFOR
\end{algorithm}
```

This is remarkably simple compared to score matching!

---

## 6. Sampling

Once trained, sampling is straightforward:

1. Start with $x_0 \sim \mathcal{N}(0, I)$
2. Solve the ODE: $\frac{dx_t}{dt} = v_\theta(x_t, t)$ for $t \in [0, 1]$
3. Return $x_1$ as the generated sample

You can use standard ODE solvers (Euler, RK4, etc.) or specialized fast solvers.

---

## 7. Advantages Over Diffusion Models

Let's compare Flow Matching to diffusion models:

| Aspect | Diffusion | Flow Matching |
|--------|-----------|---------------|
| **What you learn** | Score function | Velocity field |
| **Training objective** | Score matching | Direct velocity matching |
| **Sample efficiency** | Multiple steps (often 50+) | Fewer steps possible |
| **Theoretical clarity** | Reverse process SDE | ODE flow with optimal transport |
| **Implementation complexity** | Moderate | Simpler |

The key advantage: Flow Matching provides a **direct path** from noise to data, whereas diffusion requires reversing the forward diffusion process.

---


