const SKILLS_KEY = 'skillpath-skills';
const BRAVE_SEARCH_API_KEY = ''; // Insert your brave api key here, e.g. 'xxyyzz'
const BRAVE_SEARCH_URL = 'https://api.search.brave.com/res/v1/web_search';
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
            const query = customQuery || (skillName ? `${skillName} learning resources` : '');

            if (!query) {
                resultsEl.innerHTML = '<p>Please select a skill or enter a search query.</p>';
                return;
            }

            resultsEl.innerHTML = '<p>Searching Brave...</p>';

            try {
                const requestUrl = `${BRAVE_SEARCH_URL}?${new URLSearchParams({ q: query, limit: '10' }).toString()}`;
                const headers = {
                    'Accept': 'application/json'
                };

                if (BRAVE_SEARCH_API_KEY) {
                    // Brave uses x-api-key for API access (or check their most recent docs)
                    headers['x-api-key'] = BRAVE_SEARCH_API_KEY;
                }

                const response = await fetch(requestUrl, { headers });

                if (!response.ok) {
                    throw new Error(`Brave API error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                const displayTerm = customQuery || skillName || query;
                let html = `<h2>Brave Search results for "${displayTerm}"</h2>`;

                const braveWebSearchUrl = `https://search.brave.com/search?q=${encodeURIComponent(displayTerm + ' learning resources')}`;
                html += `<p><a href="${braveWebSearchUrl}" target="_blank" rel="noopener noreferrer">Open full Brave search for learning resources about "${displayTerm}"</a></p>`;

                const results = data.web_results || data.results || [];

                if (results.length > 0) {
                    html += '<h3>Top 10 learning results</h3>';
                    html += '<div class="resource-grid">';

                    results.slice(0, 10).forEach(item => {
                        const title = item.title || item.name || displayTerm;
                        const snippet = item.snippet || item.description || item.snippet_text || '';
                        const href = item.url || item.link || '#';
                        const fallbackBraveLink = `https://search.brave.com/search?q=${encodeURIComponent((item.title || displayTerm) + ' learning resources')}`;

                        html += `
                            <article class="resource-card">
                                <h4>${title}</h4>
                                <p class="resource-snippet">${snippet}</p>
                                <p><a href="${href}" target="_blank" rel="noopener noreferrer">Open source</a></p>
                                <p><a href="${fallbackBraveLink}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Search this on Brave</a></p>
                            </article>
                        `;
                    });

                    html += '</div>';
                } else {
                    html += '<p>No results found from Brave. Try another search phrase.</p>';
                }

                resultsEl.innerHTML = html;
            } catch (error) {
                resultsEl.innerHTML = '<p>Error fetching resources. Please try again later.</p>';
                console.error('Fetch error:', error);
            }
        });