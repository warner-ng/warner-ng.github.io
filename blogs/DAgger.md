---
layout: blog
title: DAgger
description: Learning notes on Dataset Aggregation (DAgger).
---

The Imitation Learning problem is usually mixed with RL, since Imitation Learning is a inclusive term(function-related) while RL is a principle-related term. So RL could serve as one kind of imitation learning. Paper of this could be seen at [DeepMimic](https://arxiv.org/abs/1804.02717).

Imitation Learning, in its strict definition, is to learn a whole trajectory of action under expert demostrations, using whatever methods. The goal of imitation learning is to find a policy $\pi$ 


$$
\hat{\pi} = \arg\min_{\pi \in \Pi} \mathbb{E}_{s \sim d_{\pi}}\left[\ell(s, \pi)\right]
$$

which minimizes the cost (surrogate cost, because we could not find the "true" value of cost $\mathbb{C}$)