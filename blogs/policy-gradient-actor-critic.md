---
layout: default
title: Policy Gradient & Actor-Critic Explained
description: An in-depth explanation of Policy Gradient and Actor-Critic methods in Reinforcement Learning, covering PPO, TRPO, SAC and more.
---

# Policy Gradient & Actor-Critic Explained

(This article was written in English, for a Chinese version, please see below)

PPO, TRPO, SAC, those contemporary algorithms build the foundation of today's RL research. We see them in RL fine-tuning in Large Language Model, humanoid robots sim2real training and AI player plays chess game.

In order to give researcher a thorough understanding about how these groups of RL algorithms work, we will start from the intuitive Policy Gradient and Actor Critic, which is easier to connect back to ML and DL knowledge in mind. Then we dive deeper to each algorithm, since they are all traced back to the Policy Gradient and Actor Critic idea.

---

## 1. Policy Gradient (PG)

In a sense, doing deep learning is doing optimization to certain groups of parameters, and it's no exception for Deep Reinforcement Learning. We formulate the idea as

$$
\begin{align}
\theta^* = \arg\max_{\theta} J(\theta)
\end{align}
$$

where


$$
\begin{align}
J(\theta)
&= \mathbb{E}_{\tau \sim p_\theta(\tau)}\sum_{t=1}^{H} r(s_t, a_t)\\
&= \frac{1}{N} \sum_i \sum_t r(s_t^{(i)}, a_t^{(i)})\\
&= \int p_\theta(\tau) r(\tau) d\tau
\end{align}
$$

notice that (2) is a Monte Carlo estimate and (3) is the exact integral. So there is a sum & mean for N samples in (2) whereas (3) does not. (3) is purely the integration of every deterministic trajectory τ , the N is hidden in the integral

Q1: what is pθ here, what does it mean to do the sum and integral?

- $\tau = (s_1, a_1, s_2, a_2, \ldots , s_H , a_H)$  is a trajectory sample from the policy $\pi_\theta$

- $p_\theta(\tau) = \rho(s_1) \prod_{t=1}^{H} \pi_\theta(a_t \mid s_t) P(s_{t+1} \mid s_t , a_t)$  denotes the probability distribution of each $\tau$. This calculation is very intuitive, starting from state $s_1$, sample from $\pi_\theta$ for every $s_i$, $a_i$, times the state transitioning distribution $P(s' \mid s , a)$

So now we can take the gradient of it, which is literally Policy Gradient, for future Back Propagation in a neural network.


$$
\begin{align}
\nabla J(\theta)
&= \int \nabla_\theta p_\theta(\tau) \, r(\tau) \, d\tau \\
&= \int p_\theta(\tau)\, \nabla_\theta \log p_\theta(\tau)\, r(\tau) \, d\tau \\
&= \mathbb{E}_{\tau \sim p_\theta(\tau)}
\nabla_\theta \log p_\theta(\tau)\, r(\tau)
\end{align}
$$

Now all we have is simply sample the trajectory from $p_\theta$ so we can get the $\nabla J(\theta)$. Then we do a gradient descent on $\theta$

Q2: how to calculate the log item?

- expanding the $p_θ$ as we mentioned previously, take the derivative of the log item, then the objective function should be finally like

$$
\begin{align}
\nabla_\theta J(\theta) = \mathbb{E}_{\tau\sim p_\theta(\tau)}[(\sum\nabla_\theta log\pi_\theta(a|s)(\sum r (s,a))]
\end{align}
$$

here every single item is trackable. log item is calculate by PyTorch Autograd, and the reward item is from the system dynamics, such as predefine rules or functions.



---


## 2. Actor Critic

The difference of vanilla Policy Gradient and Actor Critic is whether there is a additional value function approximator by parameter $\phi $

<img src="/images/Policy Gradient.png">
the vanilla PG
<img src="/images/Actor Critic.png">
the Actor Critic

regarding the reward, which is the value function here, we have several steps to make it more precise, the final step is the introduction of actor critic


# Advantage
$$ \begin {align}
A = Q(s_t,a_t)-V(s_t)
\end{align} 
$$