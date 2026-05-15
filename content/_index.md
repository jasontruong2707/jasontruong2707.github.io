---
title: ''
summary: ''
date: 2026-05-15
type: landing

sections:
  - block: markdown
    content:
      title: ''
      subtitle: ''
      text: |-
        Welcome to my website — where I share my research activities in **Aerospace Engineering**. I specialize in computational fluid dynamics of high-speed compressible flows, large eddy simulation of turbulent reacting flows, multiphase dynamics, gel propellant atomization, and machine learning-accelerated CFD.
    design:
      columns: '1'
      spacing:
        padding: ['2rem', 0, '0.5rem', 0]

  - block: resume-biography-3
    content:
      username: me
      text: ''
      button:
        text: Download CV
        url: uploads/NhanTruong_CV.pdf
      headings:
        about: ''
        education: ''
        interests: 'Research Interests'
    design:
      background:
        gradient_mesh:
          enable: true
      name:
        size: md
      avatar:
        size: medium
        shape: circle

  - block: markdown
    content:
      title: '🔬 What I Work On'
      subtitle: ''
      text: |-
        I work on **computational fluid dynamics for high-speed flows**, with a particular focus on multiphase dynamics, combustion, and machine-learning-accelerated solvers. My research spans five active projects:

        - **Shock–droplet interactions** in supersonic flows, including a first-of-its-kind study of how *embedded cavities* drive fragmentation under shock loading.
        - **Gel propellant atomization** in impinging-jet configurations, using compressible Navier–Stokes (MFC, JAX-Fluids) and lattice-Boltzmann (FluidX3D) frameworks with Herschel–Bulkley rheology and a custom IMEX ARS(2,2,2) defect-correction time integrator.
        - **Large Eddy Simulation** of swirling coaxial jets and bluff-body-stabilized high-speed combustors — characterizing recirculation zones, vortex shedding, and combustion instabilities via POD, DMD, and FFT.
        - **ML-accelerated CFD**: a solver-in-the-loop pipeline in JAX-Fluids that learns optimal WENO3 reconstruction weights on a differentiable Euler solver.

        I'm preparing to pursue a PhD continuing in this area. If you're a prospective collaborator, advisor, or just curious — please [reach out](mailto:truongna@mail.uc.edu).
    design:
      columns: '1'

  - block: collection
    id: talks
    content:
      title: Conferences
      filters:
        folders:
          - events
    design:
      view: card

  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: ''
      page_type: blog
      count: 5
      filters:
        author: ''
        category: ''
        tag: ''
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ''
      offset: 0
      order: desc
    design:
      view: card
      spacing:
        padding: [0, 0, 0, 0]
---
