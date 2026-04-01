const SKILLS_KEY = 'skillpath-skills';
const DUCKDUCKGO_API_URL = 'https://api.duckduckgo.com/';
const skills = JSON.parse(localStorage.getItem(SKILLS_KEY) || '[]');
const selectEl = document.getElementById('skill-select');
const form = document.getElementById('resource-form');
const resultsEl = document.getElementById('resources-results');

// Populate skill options
skills.forEach(skill => {
    const option = document.createElement('option');
    option.value = skill.name;
    option.textContent = skill.name;
    selectEl.appendChild(option);
});

if (skills.length === 0) {
    selectEl.innerHTML = '<option value="">No skills added yet. Add skills on the Skills page.</option>';
    selectEl.disabled = true;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const skillName = selectEl.value.trim();
    const customQuery = document.getElementById('search-input').value.trim();
    let query;

    if (customQuery) {
        query = customQuery;
    } else if (skillName) {
        query = `${skillName} learning resources`;
    } else if (skills.length > 0) {
        // Search for all skills if no specific selection
        const skillNames = skills.map(skill => skill.name).join(' OR ');
        query = `${skillNames} learning resources`;
    } else {
        resultsEl.innerHTML = '<p>Please select a skill, enter a search query, or add skills on the Skills page.</p>';
        return;
    }

    resultsEl.innerHTML = '<p>Searching for training resources...</p>';

    try {
        const requestUrl = `${DUCKDUCKGO_API_URL}?${new URLSearchParams({ 
            q: query, 
            format: 'json',
            no_html: '1',
            skip_disambig: '1'
        }).toString()}`;

        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error(`DuckDuckGo API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const displayTerm = customQuery || skillName || 'all your skills';
        let html = `<h2>Training Resources for "${displayTerm}"</h2>`;

        const duckDuckGoUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=web`;
        html += `<p><a href="${duckDuckGoUrl}" target="_blank" rel="noopener noreferrer">View more results on DuckDuckGo</a></p>`;

        // Check for instant answer
        if (data.Answer) {
            html += '<h3>Instant Answer</h3>';
            html += `<p>${data.Answer}</p>`;
        }

        // Check for abstract (definition/summary)
        if (data.AbstractText) {
            html += '<h3>Summary</h3>';
            html += `<p>${data.AbstractText}</p>`;
            if (data.AbstractURL) {
                html += `<p><a href="${data.AbstractURL}" target="_blank" rel="noopener noreferrer">Read more</a></p>`;
            }
        }

        // Check for related topics
        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            html += '<h3>Related Learning Resources</h3>';
            html += '<div class="resource-grid">';

            data.RelatedTopics.slice(0, 8).forEach(topic => {
                if (topic.Text && topic.FirstURL) {
                    const title = topic.Text.split(' - ')[0] || topic.Text;
                    const snippet = topic.Text.split(' - ').slice(1).join(' - ') || '';

                    html += `
                        <article class="resource-card">
                            <h4>${title}</h4>
                            <p class="resource-snippet">${snippet}</p>
                            <p><a href="${topic.FirstURL}" target="_blank" rel="noopener noreferrer">Open resource</a></p>
                        </article>
                    `;
                }
            });

            html += '</div>';
        }

        // If no instant answer or related topics, show general search link
        if (!data.Answer && !data.AbstractText && (!data.RelatedTopics || data.RelatedTopics.length === 0)) {
            html += '<h3>Search Results</h3>';
            html += `<p>No instant answers found. <a href="${duckDuckGoUrl}" target="_blank" rel="noopener noreferrer">Search DuckDuckGo directly</a> for more results.</p>`;
        }

        resultsEl.innerHTML = html;
    } catch (error) {
        resultsEl.innerHTML = '<p>Error fetching resources. Please check your internet connection and try again.</p>';
        console.error('Fetch error:', error);
    }
});
