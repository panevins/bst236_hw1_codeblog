# Welcome to my Coding Blog

Welcome to my Coding Blog! This repository contains the source code for a personal blog showcasing various coding projects I have completed for the course BST 236 - Computing I in the Spring 2025 semester.

## Table of Contents

- [Introduction](#introduction)
- [Projects](#projects)
  - [Pac-Man Game](#Pac-Man-game)
  - [ArXiv Feed](#arxiv-feed)
- [Setup](#setup)
- [Usage](#usage)
- [GitHub Actions](#github-actions)
- [License](#license)

## Introduction

This blog is a collection of coding projects created by me (Pascale). At present, the blog features a playable Pac-Man mini-game and a feed of the latest papers on applied statistics from ArXiv. More posts to come!

## Projects

### Pac-Man Game

A playable Valentine's-themed Pac-Man mini-game written using AI copilot. Help Pac-Man find love by collecting hearts and pink confetti while avoiding the walls and a spooky ghost.

- **Directory:** [Pac-Man](PacMan/)
- **Main File:** [Pac-Man/index.html](PacMan/index.html)

### ArXiv Feed

A feed of articles on the topic of applied statistics. This page displays the 10 most recent papers from ArXiv in the category of "applied statistics" and updates daily using GitHub Actions.

- **Directory:** [arxiv-search](arxiv-search/)
- **Main File:** [arxiv-search/index.html](arxiv-search/index.html)

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/panevins/bst236_hw1_codeblog.git
    cd bst236_hw1_codeblog
    ```

2. Navigate to the [arxiv-search](http://_vscodecontentref_/0) directory and install dependencies:
    ```sh
    cd arxiv-search
    npm install
    ```

## Usage

To run the Pac-Man game, open the [index.html](http://_vscodecontentref_/1) file in your web browser.

To view the ArXiv feed, open the [index.html](http://_vscodecontentref_/2) file in your web browser.

## GitHub Actions

The project uses GitHub Actions to update the ArXiv feed daily. The workflow is defined in [update-papers.yml](http://_vscodecontentref_/3).

## License

This project is licensed under the MIT License. 