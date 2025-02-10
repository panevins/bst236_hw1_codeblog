const fetch = require('node-fetch');

const arxivAPI = 'http://export.arxiv.org/api/query?search_query=topic+model&start=0&max_results=10';

async function fetchPapers() {
    try {
        const response = await fetch(arxivAPI);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const entries = xmlDoc.getElementsByTagName('entry');

        const papers = Array.from(entries).map(entry => {
            const title = entry.getElementsByTagName('title')[0].textContent;
            const authors = Array.from(entry.getElementsByTagName('author')).map(author => author.getElementsByTagName('name')[0].textContent).join(', ');
            const summary = entry.getElementsByTagName('summary')[0].textContent;
            const pdfLink = entry.getElementsByTagName('link')[0].getAttribute('href');

            return { title, authors, summary, pdfLink };
        });

        updateHTML(papers);
    } catch (error) {
        console.error('Error fetching papers:', error);
    }
}

function updateHTML(papers) {
    const paperList = document.getElementById('paper-list');
    paperList.innerHTML = '';

    papers.forEach(paper => {
        const paperItem = document.createElement('div');
        paperItem.classList.add('paper-item');

        const titleElement = document.createElement('h3');
        titleElement.textContent = paper.title;

        const authorsElement = document.createElement('p');
        authorsElement.textContent = `Authors: ${paper.authors}`;

        const summaryElement = document.createElement('p');
        summaryElement.textContent = `Abstract: ${paper.summary}`;

        const pdfLinkElement = document.createElement('a');
        pdfLinkElement.href = paper.pdfLink;
        pdfLinkElement.textContent = 'PDF Link';
        pdfLinkElement.target = '_blank';

        paperItem.appendChild(titleElement);
        paperItem.appendChild(authorsElement);
        paperItem.appendChild(summaryElement);
        paperItem.appendChild(pdfLinkElement);
        paperList.appendChild(paperItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchPapers);