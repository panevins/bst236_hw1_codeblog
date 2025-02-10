import fetch from 'node-fetch';
import fs from 'fs';
import { JSDOM } from 'jsdom';

async function fetchPapers() {
    try {
        const response = await fetch('https://export.arxiv.org/api/query?search_query=all:topic+model&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending');
        const text = await response.text();
        const parser = new JSDOM().window.DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const entries = xml.getElementsByTagName('entry');
        
        let papersHTML = '';

        Array.from(entries).forEach(entry => {
            const title = entry.getElementsByTagName('title')[0].textContent;
            const authors = Array.from(entry.getElementsByTagName('author')).map(author => author.getElementsByTagName('name')[0].textContent).join(', ');
            const summary = entry.getElementsByTagName('summary')[0].textContent;
            const pdfLinkElement = Array.from(entry.getElementsByTagName('link')).find(link => link.getAttribute('title') === 'pdf');
            const pdfLink = pdfLinkElement ? pdfLinkElement.getAttribute('href') : 'PDF unavailable';
            
            papersHTML += `
                <div class="paper">
                    <h2>${title}</h2>
                    <p><strong>Authors:</strong> ${authors}</p>
                    <p>${summary}</p>
                    <p><a href="${pdfLink}" target="_blank">${pdfLink === 'PDF unavailable' ? 'PDF unavailable' : 'Read PDF'}</a></p>
                </div>
            `;
        });

        const updateTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        const updateHTML = `<p id="last-updated">Last updated: ${updateTime}</p>`;

        const indexPath = 'index.html';
        let indexHTML = fs.readFileSync(indexPath, 'utf8');
        indexHTML = indexHTML.replace(/<div id="papers">.*<\/div>/s, `<div id="papers">${papersHTML}</div>`);
        indexHTML = indexHTML.replace(/<p id="last-updated">.*<\/p>/, updateHTML);
        fs.writeFileSync(indexPath, indexHTML, 'utf8');
    } catch (error) {
        console.error('Error fetching papers:', error);
    }
}

fetchPapers();