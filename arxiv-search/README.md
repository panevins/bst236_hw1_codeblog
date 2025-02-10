# arXiv Topic Model Papers

This project is designed to automatically fetch and display the latest research papers from arXiv related to the keyword "topic model". The webpage will list the titles, authors, abstracts, and direct links to the PDF versions of the papers.

## Project Structure

- **src/index.html**: The main HTML document that structures the webpage for displaying the list of papers.
- **src/styles.css**: Contains the CSS styles for the webpage, defining layout, colors, fonts, and overall appearance.
- **src/scripts/fetch-papers.js**: JavaScript code that fetches the latest papers from arXiv and updates the HTML with the paper details.
- **.github/workflows/update-papers.yml**: GitHub Actions workflow that runs every midnight to fetch the latest papers and update the repository.
- **package.json**: Configuration file for npm, listing dependencies and scripts for the project.
- **.gitignore**: Specifies files and directories to be ignored by Git.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running:
   ```
   npm install
   ```
4. Open `src/index.html` in a web browser to view the list of papers.

## Contribution

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.