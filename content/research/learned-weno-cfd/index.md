---
title: 'Learned WENO Reconstruction for Compressible Turbulence'
date: 2025-01-15
summary: A solver-in-the-loop machine-learning pipeline in JAX-Fluids that learns optimal WENO3 reconstruction weights for 2D compressible turbulence using a differentiable Euler solver.
tags:
  - Machine Learning
  - WENO
  - JAX
  - Compressible Turbulence
categories:
  - ML-Accelerated CFD
authors:
  - me
featured: true
weight: 20
---

## Overview

Classical WENO (Weighted Essentially Non-Oscillatory) schemes balance shock-capturing against smooth-flow accuracy via hand-tuned smoothness indicators. This project asks: **can a neural network learn better reconstruction weights end-to-end through a differentiable solver?**

## What I'm doing

- **Constructing a solver-in-the-loop ML pipeline in JAX-Fluids** that learns optimal WENO3 reconstruction weights for 2D compressible turbulence through a differentiable Euler solver.
- **Training a JAX neural network on spectrally filtered DNS data** with a multi-component loss combining MSE, spectral energy, and weight regularization.
- **Benchmarking** the learned **WENO3-NN** against WENO3-JS, WENO5-Z, and ALDM using energy spectra, TKE decay, and vorticity correlation against DNS.

*Advisor: Prof. Prashant Khare.*
