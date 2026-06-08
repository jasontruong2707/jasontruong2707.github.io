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
image:
  filename: research/combustion.png
  caption: 'Combustion'
  focal_point: Smart
  preview_only: true
---

*Co-authors: Kamin Manu, Nhan Truong, Prashant Khare.*
*Status: completed.*

A ramjet has to atomize, vaporize, mix and ignite liquid fuel within a few milliseconds while the air rushes past at a hundred meters a second. A V-gutter anchors the flame so it doesn't blow out, but the high temperature, dense spray and shocks make the anchoring region almost impossible to measure directly, which is where LES earns its keep.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="domain.png" alt="LES simulation domain with the V-gutter flame holder" style="width:100%; max-width:675px;" />
</div>

*The LES domain. Liquid kerosene is injected into a 600 K air stream at 100 m/s, and a V-gutter mid-channel anchors the flame in its wake.*

The first surprise was the spray behavior near the holder. The droplets don't splash off the gutter as you'd expect. They form a thin film that runs along the surface and vaporizes near the hot walls, putting a near-stoichiometric mixture right where the flame sits.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="fuel_film.png" alt="Liquid film formation on the V-gutter surface" style="width:100%; max-width:675px;" />
</div>

*Liquid film formation on the V-gutter surface. The droplets accumulate into a film that tracks along the holder and vaporizes at the trailing edge.*

The flame itself wraps both shear layers shed off the gutter and oscillates with the vortex shedding and the chamber's longitudinal acoustic modes. The grayscale rendering of the temperature gradient makes the flame edge easy to follow.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="flame_image.png" alt="Instantaneous flame in the V-gutter wake" style="width:100%; max-width:900px;" />
</div>

*Instantaneous flame in the V-gutter wake. The reaction zone wraps both shear layers shed off the gutter.*

<div style="margin: 1.5rem 0;">
  <video autoplay loop muted playsinline controls src="flame.mp4" style="width:100%;"></video>
</div>

*Unsteady flame motion behind the V-gutter, rendered as a grayscale temperature gradient.*

To quantify the oscillation, I built an OpenCV pipeline that pulls the flame boundary out of the temperature field frame by frame and gives the mean width and RMS fluctuations.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="flame_boundary_post_processing.png" alt="Stages of the OpenCV flame-boundary extraction pipeline" style="width:100%; max-width:900px;" />
</div>

*Stages of the flame-boundary extraction pipeline. The output gives a per-frame flame position from which the mean width and RMS fluctuations are computed.*

A POD on the temperature field then pulls out the dominant unsteady modes. The leading ones pick up the vortex-shedding signature off the gutter, with the longitudinal acoustic motion of the chamber showing up further down the rank.

<div style="display:flex; justify-content:center; margin: 1.5rem 0;">
  <img src="pod_analysis.png" alt="Leading POD modes of the temperature field" style="width:100%; max-width:900px;" />
</div>

*Leading POD modes of the temperature field.*

How tightly the film-vaporization route couples to the flame's instability modes is something the post-processing hints at but doesn't pin down. A thread worth pulling on with a reacting simulation built to ask that question directly.
