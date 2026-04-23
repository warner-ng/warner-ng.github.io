---
layout: blog
title: Nonlinear facts
description: some facts that i should record while i study this
---


1. the phase plane was describe in $x-\dot{x}$ plot. and the nonlinear system was described in $\dot{x}=f(x)$. Phase plane could looks like this 

> <div style="text-align: center;">
> <img src="/blogs/image-12.png" width="75%" alt="alt text" />
> </div>

This is telling us that this is not a function of $x-\dot{x}$. one x value signifies possibly two $\dot{x}$ (which actually IS) this is probably because the non-linearity make the same x could lead to different $\dot{x}$ such as $x^2$ (in which case the plot would be a sphere)

2. Banach Fixed points theorem is a sufficient condition. which means, this is a stronger condition to have a fixed point, but not nessesarily so. try draw some plot and you would find: contraction mappings always have fixed point, some contraction plus expansion also does, but if you plot it all above $y=x$ then this is too much expanding. That case no fixed point after iteration

3. locally lipschitz definition: requires ALL points to be Locally lipschitz. SO local here means the region to be consider within the slope of L is locally, not saying "some points satisfied locally lipschitz = local lipschitz"


4. The so-called up north equation was actually trying to construct a coefficient P who is pos def and also whose derivative is neg def. here is why

$$\dot{V}(x) = x^T \underbrace{(A^T P + PA)}_{= -\alpha I} x = -\alpha x^T x < 0$$

so the lyapunov equation would be 

$$A^T P + PA = -\alpha I$$