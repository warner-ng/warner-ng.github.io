---
layout: default
title: ppo: proximal policy optimization
description: The comtemporary RL algo used widely in robotics sim2real
---

# PPO: proximal policy optimization

(This article was written in English, for a Chinese version, please see below)

before we dive into the world of PPO, let's look at what is previously not efficient

```algorithm
\begin{algorithm}
\caption{On-Policy Actor--Critic (TD)}
\begin{algorithmic}
\STATE Initialize $\theta, \phi$
\FOR{each iteration}
    \STATE Collect trajectories using $\pi_\theta$
    \FOR{each $(s_t,a_t,r_t,s_{t+1})$}
        \STATE $y_t = r_t + \gamma V_\phi(s_{t+1})$
        \STATE $\delta_t = y_t - V_\phi(s_t)$
        \STATE Update critic by minimizing $(V_\phi(s_t)-y_t)^2$
        \STATE $\theta \leftarrow \theta + \alpha \nabla_\theta \log \pi_\theta(a_t|s_t)\,\delta_t$
    \ENDFOR
\ENDFOR
\end{algorithmic}
\end{algorithm}
```