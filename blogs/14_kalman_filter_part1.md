---
layout: blog
title: 14. Kalman Filter, Part 1 — Estimating by Recursion
description: The Kalman filter starts from a very ordinary idea, updating an average one measurement at a time.
parent_url: /blogs/blogIndex.html
parent_label: Back to Blogs
---

# Kalman Filter, Part 1 — Estimating by Recursion

Our Formula Student driverless car estimates its own position and heading with the `robot_localization` package, which runs an Extended Kalman Filter on wheel odometry and IMU data. Before I can read that code with confidence, I want to rebuild the Kalman filter from the part I actually understand, and go one step at a time. In my notes the first thing written about it is that the name should really be "an optimal recursive data processing algorithm", so this first part is only about the word *recursive*.

## Averaging without keeping the past

Suppose I measure the same length with a ruler several times and get $z_1, z_2, \dots, z_k$. Each reading is a little off, and the most natural estimate of the true length is the average of all of them, $\hat{x}_k = \frac{1}{k}(z_1 + z_2 + \cdots + z_k)$, where the hat means "estimate" and the subscript $k$ means it uses the first $k$ readings. Written this way, every new reading forces me to keep the whole list and add everything up again, which is fine for four numbers but not for an IMU that sends a hundred messages per second.

The way out is to notice that the sum of the first $k-1$ readings is already hidden inside the previous estimate, because $z_1 + \cdots + z_{k-1} = (k-1)\,\hat{x}_{k-1}$. Splitting the newest reading out of the sum and substituting this in gives

$$
\hat{x}_k = \frac{k-1}{k}\,\hat{x}_{k-1} + \frac{1}{k}\,z_k = \hat{x}_{k-1} + \frac{1}{k}\big(z_k - \hat{x}_{k-1}\big),
$$

so the new estimate needs only two things, the previous estimate and the newest reading. Nothing from further back has to be stored, and this is what recursive means here: each answer is built from the answer just before it.

## Reading the formula

The term in the brackets, $z_k - \hat{x}_{k-1}$, is how far the new reading lands from what I already believed, and the estimate moves toward the new reading by a fraction $\frac{1}{k}$ of that gap. With four readings of 50.2, 49.6, 50.3 and 49.9 mm, the first estimate is simply 50.2. The second reading is 0.6 below it, so the estimate moves down by half of that to 49.9. The third reading is 0.4 above, and the estimate moves up by a third of that to about 50.03. The fourth is about 0.13 below, and a quarter of that brings the estimate to 50.0, which is exactly the ordinary average of the four numbers.

What changes from step to step is the size of the fraction. Early on, $\frac{1}{k}$ is large and one new reading can move the estimate a lot, because the estimate is still based on very little. Later, $\frac{1}{k}$ is small, because the estimate already rests on many readings and one more should only nudge it. The coefficient therefore expresses how much I trust the new reading compared with what I have accumulated so far.

## What this has to do with the EKF

The same shape appears in the correction step of `ekf.cpp`, in the line `state_.noalias() += kalmanGainSubset * innovationSubset;`. There, `innovationSubset` is the difference between the measurement and the current estimate, which plays the role of $z_k - \hat{x}_{k-1}$, and `kalmanGainSubset` plays the role of $\frac{1}{k}$. The difference is that $\frac{1}{k}$ only counts how many readings have arrived. It knows nothing about whether the ruler is precise or sloppy, and it assumes the length never changes, while a car keeps moving and its sensors are not equally reliable. The Kalman filter keeps this exact recursive form and replaces $\frac{1}{k}$ with a gain chosen from how uncertain the estimate and the measurement are. How that gain is chosen is the subject of the next part.
