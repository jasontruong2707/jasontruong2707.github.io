---
title: 'Gel Atomization in Impinging Jets'
date: 2024-09-01
summary: Implementing Herschel-Bulkley rheology and a custom IMEX ARS(2,2,2) defect-correction time integrator across three open-source solvers to simulate gel propellant atomization in impinging jets.
tags:
  - Gel Propellants
  - Atomization
  - Multiphase
  - MFC
  - JAX-Fluids
  - FluidX3D
categories:
  - Atomization & Multiphase Flows
authors:
  - me
featured: true
weight: 30
---

## Overview

Gel propellants offer the storability of solids and the throttleability of liquids, but their shear-thinning, yield-stress rheology makes atomization a numerical challenge: classical viscous time-step limits become prohibitive for high-viscosity regimes.

## What I'm doing

- **Implementing Herschel-Bulkley viscosity models** in three open-source solvers — **JAX-Fluids**, **MFC**, and **FluidX3D** — covering both compressible Navier-Stokes and lattice-Boltzmann frameworks.
- **Validating** implementations against analytical solutions and literature benchmarks for 2D Poiseuille flow and lid-driven cavity across Re ∈ [100, 5000], spanning shear-thickening and shear-thinning regimes.
- **Designing and implementing an IMEX ARS(2,2,2) defect-correction time integrator in MFC (Fortran)** — bypassing the viscous CFL limit for high-viscosity-range fluids while preserving full Navier-Stokes accuracy.
- **Running impinging-jet atomization simulations in MFC** to characterize sheet formation, primary breakup mechanisms, and droplet size distributions under varying ambient pressure.

*Advisor: Prof. Prashant Khare.*
