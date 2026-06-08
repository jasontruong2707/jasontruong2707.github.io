---
title: 'Large Eddy Simulations of Spray and Combustion Processes in a Bluff Body Stabilized High-Speed Combustor'
date: 2025-03-01
summary: How spray, mixing and heat release behave behind a V-gutter flame holder in a ramjet-class combustor, including a film-vaporization route that delivers a near-stoichiometric mixture exactly where the flame anchors.
tags:
  - Combustion
categories:
  - Combustion
authors:
  - me
weight: 50
---

*Co-authors: Kamin Manu, Nhan Truong, Prashant Khare.*
*Status: completed.*

A ramjet has to atomize, vaporize, mix and ignite liquid fuel within a few milliseconds while the air rushes past at a hundred meters a second. A V-gutter anchors the flame so it doesn't blow out, but the high temperature, dense spray and shocks make the anchoring region almost impossible to measure directly, which is where LES earns its keep.

### The simulation domain

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="domain.png" alt="LES simulation domain with the V-gutter flame holder" style="width:100%; max-width:675px;" />
</div>

*The LES domain. Liquid kerosene is injected into a 600 K air stream at 100 m/s, and a V-gutter mid-channel anchors the flame in its wake.*

### Fuel-air mixing and the film route

The first surprise was the spray behavior near the flame holder. The droplets don't splash off the V-gutter as you'd expect. They form a thin film that runs along the surface and vaporizes near the hot walls, delivering a near-stoichiometric mixture exactly where the flame anchors.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="fuel_film.png" alt="Liquid film formation on the V-gutter surface" style="width:100%; max-width:675px;" />
</div>

*Liquid film formation on the V-gutter surface. The droplets accumulate into a film that tracks along the holder and vaporizes at the trailing edge, delivering a near-stoichiometric mixture right where the flame sits.*

### Flame structure and dynamics

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="flame_image.png" alt="Instantaneous flame in the V-gutter wake" style="width:100%; max-width:900px;" />
</div>

*Instantaneous flame in the V-gutter wake. The reaction zone wraps both shear layers shed off the gutter.*

The flame oscillates with the vortex shedding from the V-gutter and with the chamber's longitudinal acoustic modes. The grayscale rendering of the temperature gradient makes the flame edge easy to follow.

<div style="margin: 1.5rem 0;">
  <video autoplay loop muted playsinline controls src="flame.mp4" style="width:100%;"></video>
</div>

*Unsteady flame motion behind the V-gutter, rendered as a grayscale temperature gradient.*

### Flame boundary extraction

I built an OpenCV pipeline to pull the flame boundary out of the temperature field, then computed the mean flame width and RMS fluctuations frame by frame.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="flame_boundary_post_processing.png" alt="Stages of the OpenCV flame-boundary extraction pipeline" style="width:100%; max-width:900px;" />
</div>

*Stages of the flame-boundary extraction pipeline applied to the temperature field. The output gives a per-frame flame position from which the mean width and RMS fluctuations are computed.*

### POD on the temperature field

I applied POD to the temperature field to pull out the dominant unsteady modes. The first few modes capture the vortex shedding off the V-gutter and the longitudinal acoustic motion of the chamber.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="pod_analysis.png" alt="Leading POD modes of the temperature field" style="width:100%; max-width:900px;" />
</div>

*Leading POD modes of the temperature field. The first modes pick up the vortex-shedding signature, with the longitudinal acoustic mode showing up further down the rank.*

How tightly that film-vaporization route couples to the flame's instability modes is something the post-processing hints at but doesn't pin down. A thread worth pulling on with a reacting simulation built to ask that question directly.
