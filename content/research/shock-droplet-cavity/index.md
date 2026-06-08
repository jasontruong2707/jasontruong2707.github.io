---
title: 'Shock-Driven Fragmentation of a Cavity-Embedded Droplet'
date: 2024-10-01
summary: How an internal gas cavity changes the way a fuel droplet breaks up under a passing shock, and why it can sharpen mixing in ramjet, scramjet and detonation engines. Presented at the 16th Dayton Engineering Sciences Symposium (DESS), Oct 2024. Manuscript in preparation for *Physics of Fluids*.
tags:
  - Multiphase Flow
categories:
  - Multiphase Flow
authors:
  - me
featured: true
weight: 10
---

*Co-authors: Nhan Truong, Jacob Gamertsfelder, Achyut Panchal, Prashant Khare.*
*Status: completed.*

Fuel droplets in a high-speed combustor often carry a trapped gas pocket. When a shock passes through the droplet, that cavity collapses in a micro-explosion, sending out secondary shocks and a high-speed internal jet that tears the droplet apart far faster than a solid droplet would. The same effect can sharpen fuel–air mixing in ramjet, scramjet and detonation engines, so it is worth knowing how much the cavity actually changes the breakup.

I ran 2D simulations in Star-CCM+ for this, comparing a droplet with no cavity against cavities placed toward the front and the back of the droplet, and tracking the surviving liquid area over time. Before that, I validated the framework. The numerical schlieren reproduced the wave pattern from Sembian et al.'s shock-water-column experiments (incident, reflected and transmitted waves, the Mach stem, the triple point and the slip surface).

<div style="display:flex; gap:1rem; flex-wrap:wrap; margin: 1.5rem 0;">
  <video autoplay loop muted playsinline controls src="nocavity.mp4" style="flex:1; min-width:300px; max-width:100%;"></video>
  <video autoplay loop muted playsinline controls src="cavity.mp4" style="flex:1; min-width:300px; max-width:100%;"></video>
</div>

*Numerical schlieren for a Mach 2.4 shock striking a droplet without a cavity (left) and with an embedded cavity (right). The cavity collapse drives an internal jet that tears the droplet apart faster than the no-cavity case.*

An off-center cavity loses liquid area noticeably faster than a centered one or no cavity at all, so where the pocket sits matters as much as whether it is there. The current direction is to understand how the deformation and mixing scale with the cavity's interface length, meaning the size of the gas-liquid interface inside the droplet, and use that to explain why some cavity geometries drive faster, more thorough breakup than others.
