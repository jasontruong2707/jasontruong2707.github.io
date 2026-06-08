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
        Welcome to my website, where I share my personal research projects and experiences.
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
      title: '🔬 Brief Research Overview'
      subtitle: ''
      text: |-
        My work spans four areas of computational fluid dynamics for high-speed flows.

        ### Multiphase Flow
        I work on numerical simulations of multiphase flows in high-speed environments, including jet breakup, droplet fragmentation, atomization, and shock-droplet interactions.

        ### Turbulent Flow
        I conduct Large Eddy Simulations of swirling and compressible turbulent flows, studying mixing characteristics, recirculation, and flow instabilities.

        ### Combustion
        I study spray combustion and flame dynamics in high-speed combustors, including combustion instabilities driven by vortex shedding and acoustic modes.

        ### Machine Learning
        I build machine learning frameworks for accelerating CFD simulations, using high-fidelity simulation data to learn better numerical schemes for turbulent and reacting flows.

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
