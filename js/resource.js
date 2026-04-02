const SKILLS_KEY = 'skillpath-skills';
const DUCKDUCKGO_API_URL = 'https://api.duckduckgo.com/';
const skills = JSON.parse(localStorage.getItem(SKILLS_KEY) || '[]');
const selectEl = document.getElementById('skill-select');
const form = document.getElementById('resource-form');
const resultsEl = document.getElementById('resources-results');

// Populate skill options from the Skills page
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

    if (skillName && customQuery) {
        query = `${skillName} ${customQuery}`;
    } else if (customQuery) {
        query = customQuery;
    } else if (skillName) {
        query = `${skillName} learning resources`;
    } else if (skills.length > 0) {
        // Search for all skills if no specific selection is made
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

        const displayTerm = (skillName && customQuery) ? `${skillName} ${customQuery}` : (customQuery || skillName || 'all your skills');
        let html = `<h2>Training Resources for "${displayTerm}"</h2>`;

        // Show summary information from Skills page if a skill is selected
        if (skillName) {
            const selectedSkill = skills.find(skill => skill.name === skillName);
            if (selectedSkill) {
                html += '<div class="search-summary">';
                html += `<h3>Selected Skill: ${skillName}</h3>`;
                html += `<p>Current progress: ${selectedSkill.progress}% complete</p>`;
                //html += `<p>Skill ID: ${selectedSkill.id}</p>`;
                html += '</div>';
            }
        }

        if (customQuery) {
            html += '<div class="search-summary">';
            html += `<h3>Custom Search: "${customQuery}"</h3>`;
            if (skillName) {
                html += `<p>Combined with skill: ${skillName}</p>`;
            }
            html += '</div>';
        }

        if (!skillName && !customQuery && skills.length > 0) {
            html += '<div class="search-summary">';
            html += '<h3>Searching All Skills</h3>';
            html += `<p>Total skills: ${skills.length}</p>`;
            const avgProgress = Math.round(skills.reduce((sum, skill) => sum + skill.progress, 0) / skills.length);
            html += `<p>Average completion: ${avgProgress}%</p>`;
            html += '<p>Skills: ' + skills.map(skill => `${skill.name} (${skill.progress}%)`).join(', ') + '</p>';
            html += '</div>';
        }

        const duckDuckGoUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=web`;
        html += `<p><a href="${duckDuckGoUrl}" target="_blank" rel="noopener noreferrer">View more results on DuckDuckGo</a></p>`;

        // Checking for instant answer
        if (data.Answer) {
            html += '<h3>Instant Answer</h3>';
            html += `<p>${data.Answer}</p>`;
        }

        // Checking for abstract (definition/summary)
        if (data.AbstractText) {
            html += '<h3>Summary</h3>';
            html += `<p>${data.AbstractText}</p>`;
            if (data.AbstractURL) {
                html += `<p><a href="${data.AbstractURL}" target="_blank" rel="noopener noreferrer">Read more</a></p>`;
            }
        }

        // Checking for related topics
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

        // If no instant answer or related topics, show search results based on skill selection
        if (!data.Answer && !data.AbstractText && (!data.RelatedTopics || data.RelatedTopics.length === 0)) {
            html += '<h3>Search Results</h3>';
            
            // Curated resources by skill to display if no instant answer is available.
            const skillResources = {
                'javascript': [
                    { title: 'MDN Web Docs - JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/' },
                    { title: 'JavaScript.info', url: 'https://javascript.info/' },
                    { title: 'freeCodeCamp JavaScript Course', url: 'https://www.freecodecamp.org/learn/javascript/' },
                    { title: 'Codecademy JavaScript', url: 'https://www.codecademy.com/learn/introduction-to-javascript' }
                ],
                'python': [
                    { title: 'Official Python Documentation', url: 'https://docs.python.org/3/' },
                    { title: 'Real Python Tutorials', url: 'https://realpython.com/' },
                    { title: 'freeCodeCamp Python Course', url: 'https://www.freecodecamp.org/learn/python-for-everybody/' },
                    { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/' }
                ],
                'html': [
                    { title: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
                    { title: 'HTML.com Tutorials', url: 'https://html.com/' },
                    { title: 'freeCodeCamp HTML & CSS', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' },
                    { title: 'W3Schools HTML', url: 'https://www.w3schools.com/html/' }
                ],
                'css': [
                    { title: 'MDN Web Docs - CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
                    { title: 'CSS-Tricks', url: 'https://css-tricks.com/' },
                    { title: 'W3Schools CSS', url: 'https://www.w3schools.com/css/' },
                    { title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' }
                ],
                'react': [
                    { title: 'Official React Documentation', url: 'https://react.dev/' },
                    { title: 'freeCodeCamp React Course', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/react/' },
                    { title: 'Scrimba React Course', url: 'https://scrimba.com/learn/learnreact' },
                    { title: 'React Patterns', url: 'https://reactpatterns.com/' }
                ],
                'sql': [
                    { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
                    { title: 'SQLZoo Interactive SQL', url: 'https://sqlzoo.net/' },
                    { title: 'Codecademy SQL', url: 'https://www.codecademy.com/learn/learn-sql' },
                    { title: 'Khan Academy SQL', url: 'https://www.khanacademy.org/computing/computer-programming/sql' }
                ],
                'git': [
                    { title: 'Official Git Book', url: 'https://git-scm.com/book/en/v2' },
                    { title: 'GitHub Learning Lab', url: 'https://github.com/skills' },
                    { title: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/git/tutorials' },
                    { title: 'freeCodeCamp Git Tutorial', url: 'https://www.freecodecamp.org/learn/version-control-with-git/' }
                ]
            };
            
            let resources = [];
            if (skillName) {
                const skillKey = skillName.toLowerCase();
                resources = skillResources[skillKey] || [];
            }
            
            if (resources.length > 0) {
                html += '<div class="resource-grid">';
                resources.forEach(resource => {
                    html += `
                        <article class="resource-card">
                            <h4>${resource.title}</h4>
                            <p><a href="${resource.url}" target="_blank" rel="noopener noreferrer">Visit Resource</a></p>
                        </article>
                    `;
                });
                html += '</div>';
            } else {
                html += `<p>No specific resources available. <a href="${duckDuckGoUrl}" target="_blank" rel="noopener noreferrer">Search DuckDuckGo directly</a> for more results.</p>`;
            }
        }

        resultsEl.innerHTML = html;
    } catch (error) {
        resultsEl.innerHTML = '<p>Error fetching resources. Please check your internet connection and try again.</p>';
        console.error('Fetch error:', error);
    }
});
