async function fetchPapers() {
    try {
        const response = await fetch('https://export.arxiv.org/api/query?search_query=all:topic+model&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const entries = xml.getElementsByTagName('entry');
        
        const papersDiv = document.getElementById('papers');
        papersDiv.innerHTML = ''; // Clear any existing content

        Array.from(entries).forEach(entry => {
            const title = entry.getElementsByTagName('title')[0].textContent;
            
            const paperDiv = document.createElement('div');
            paperDiv.classList.add('paper');
            
            paperDiv.innerHTML = `
                <h2>${title}</h2>
            `;
            
            papersDiv.appendChild(paperDiv);
        });
    } catch (error) {
        console.error('Error fetching papers:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPapers();

    const refreshButton = document.getElementById('refresh-button');
    refreshButton.addEventListener('click', fetchPapers);
});