# BST 236 CodeBlog report

Create a homepage for a website for your **coding blog**. The website should be hosted on [GitHub Pages](https://pages.github.com/). You can design the homepage by yourself in any proper style you like. You may need to make the design expandable to add more content from our future assignments. The link to the homepage should be added to the `README.md` of your homework repository so that anyone can access the homepage and the following two webpages from the Internet using this link.

1. Went to settings -> pages and deployed from main branch

2. asked AI copilot to generate a homepage for me. it created a file directory.

   *please create a homepage for my coding blog that can be opened via github pages, using css and html

   * please update the css to have a pale purple background and use a serif font, and so that body text is contained in white boxes 

   * I then requested a variety of small aesthetic changes, which I was able to implement myself. 

## making pacman

1. The first step was to create a webpage where pacman is. 

I asked

```
how do i add a page to my website where i can have a playable pacman game
```

It listed steps to create a directory, html, css, and javascript files.
However, the pacman game was not interactive: 'playable" was clearly not specific enough. 

2. Improving game functionality

* please make it so pacman changes direction when the arrow keys are pressed

(recommends some javascript changes)

* the game canvas should have a maze with white borders that pacman cannot cross. make a more complex maze with thinner walls.

(very simple maze)

* there should be white dots centered in the halls of the maze, and when pacman crosses them he eats them and they disappear for thirty seconds before reappearing

this did not work.

* removed the dots, provided an image from the web https://buildingblockstudio.com/wp-content/uploads/2019/01/Pacman-Stage.png

* focus on the game board: once I understand the way the borders are built, I map them out myself. 

* then add the goals of the game: 

```
create a two pixel red hearts in the maze centered at x=300, y=420 and x-300, y=540
when pacman touches one of the two hearts, they disappear and text appears above pacman for five seconds that says "love bonus achieved"

the game ends (pacman stops moving and "GAME OVER" is written above him) when either 1) both hearts disappear or 2) pacman touches the wall
```

* add more game features

```
add a line of pink dots (radius 10px) every 60px starting at x=60 y=60
make a line of dots every 120 pixels vertically

```

I adjusted the radius and distances after seeing the output.

```
display a black courier font points counter on pacman: for every pink dot he touches, the counter goes up by one and for each heart he touches, the counter goes up by 100. the dots also disappear after he touches them

when gameWin is true, display final score

```

# Coding Blog

Welcome to my coding blog! This repository contains the source code for my personal coding blog, which showcases various programming tutorials, tips, and projects.

## Project Structure

The project consists of the following files:

- `index.html`: The main HTML document for the homepage of the coding blog.
- `styles/style.css`: The CSS file that styles the homepage.

## Getting Started

To get started with this coding blog, follow these steps:

1. **Clone the Repository**: 
   Clone this repository to your local machine using the following command:
   ```
   git clone https://github.com/yourusername/coding-blog.git
   ```

2. **Navigate to the Project Directory**:
   ```
   cd coding-blog
   ```

3. **Open `index.html`**:
   Open the `index.html` file in your web browser to view the homepage.

## Deploying on GitHub Pages

To deploy your coding blog on GitHub Pages, follow these steps:

1. **Push to GitHub**: 
   Make sure your code is pushed to a GitHub repository.

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click on the "Settings" tab.
   - Scroll down to the "GitHub Pages" section.
   - Select the branch you want to use (usually `main` or `master`) and click "Save".

3. **Access Your Blog**:
   After a few minutes, your blog will be available at `https://yourusername.github.io/coding-blog`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thank you for visiting my coding blog! I hope you find the content helpful and informative.