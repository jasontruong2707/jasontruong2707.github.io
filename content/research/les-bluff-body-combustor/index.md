---
title: 'LES of Spray and Combustion Processes in a Bluff-Body Stabilized High-Speed Combustor'
date: 2025-03-01
summary: Post-processing LES data to characterize mixing, flame dynamics, vortex shedding, and combustion instabilities downstream of a V-gutter flameholder. Co-authored manuscript in preparation.
tags:
  - Combustion
categories:
  - Combustion
authors:
  - me
weight: 50
---

## Overview

Bluff-body flameholders (V-gutters) anchor flames in high-speed combustors by generating a recirculating wake. Understanding how vortex shedding, acoustic modes, and spray dynamics couple to combustion instabilities is critical for designing stable, high-performance propulsion systems.

## What I did

- **Processed LES data in ParaView and Python** to evaluate fuel-air mixing, equivalence ratio, heat release rate, temperature, and CO/CO₂ mass fractions at multiple axial stations downstream of the V-gutter.
- **Applied FFT analysis to velocity and pressure time series** to identify vortex-shedding frequencies and longitudinal acoustic modes driving combustion instabilities.
- **Developed Python image-processing scripts using OpenCV** to extract flame boundaries from temperature fields and compute mean flame width and RMS fluctuations.
- **Implemented POD on temperature-field data** to extract dominant modes and visualize mode shapes, energy coefficients, and frequency spectra to characterize flame dynamics.

## Outcome

Co-authored manuscript in preparation: **Manu, Truong, Khare.** *"Large Eddy Simulations of Spray and Combustion Processes in a Bluff Body Stabilized High-Speed Combustor,"* targeted for *Applications in Energy and Combustion Science*.

*Advisors: Prof. Prashant Khare, Dr. Kamin Manu.*
