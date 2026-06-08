---
title: 'Recirculation Structures in an Isothermal Swirling Coaxial Jet'
date: 2024-06-01
summary: Where the recirculation zone sits, how it changes shape with swirl strength, and which large-scale motions carry the most energy in a coaxial swirling jet. LES post-processing with POD/DMD against a reference experimental and numerical dataset.
tags:
  - Turbulent Flow
categories:
  - Turbulent Flow
authors:
  - me
weight: 40
---

*Co-authors: Nhan Truong, Kamin Manu.*
*Status: ongoing.*

Swirling injectors show up in nearly every gas turbine and liquid rocket engine. The swirl sets up a recirculation zone that loops hot gas back to ignite incoming reactants. Lose that zone and the flame blows out, which makes it the heart of combustor stability. As the swirl gets stronger the zone changes shape, moving from a pre-vortex-breakdown state toward a central recirculation bubble, but how and why that transition happens still isn't settled.

I analyzed LES velocity-field data for three swirler configurations, quantifying the recirculation zone with swirl number, circulation, turbulent kinetic energy and Reynolds stress, and pulling out the dominant motions with POD and DMD. The setup follows Pattanshetti et al.'s experimental and numerical study of the same coaxial jet, so the structures have a reference to sit against.

> **\[VIDEO PLACEHOLDER\]** Instantaneous velocity with streamlines &nbsp;·&nbsp; **\[VIDEO PLACEHOLDER\]** POD mode 1
>
> *Instantaneous velocity magnitude with streamlines (left) and the first POD mode (right) for the pre-vortex-breakdown configuration.*

The piece I still need to nail down is what the first POD mode physically represents, whether it's a precessing vortex core or a shear-layer oscillation, before I read too much into its frequency content.
