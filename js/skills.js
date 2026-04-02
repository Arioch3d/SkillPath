
        const SKILLS_KEY = 'skillpath-skills';
        let skills = JSON.parse(localStorage.getItem(SKILLS_KEY) || '[]');

        const form = document.getElementById('skill-form');
        const nameInput = document.getElementById('skill-name');
        const progressInput = document.getElementById('skill-progress');
        const progressLabel = document.getElementById('skill-progress-label');
        const skillIdInput = document.getElementById('skill-id');
        const skillsListEl = document.getElementById('skills-list');
        const avgBar = document.getElementById('avg-progress-bar');
        const avgLabel = document.getElementById('avg-progress-label');
        const submitBtn = document.getElementById('skill-submit');

        function saveSkills() {
            localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
        }

        function renderSkills() {
            if (skills.length === 0) {
                skillsListEl.innerHTML = '<p>No skills yet. Add your first skill above.</p>';
                updateOverall();
                return;
            }

            const sortedSkills = [...skills].sort((a, b) => b.progress - a.progress);

            skillsListEl.innerHTML = sortedSkills.map(skill => `
                <article class="skill-card" data-id="${skill.id}">
                    <div class="skill-header">
                        <h3>${skill.name}</h3>
                        <div class="skill-actions">
                            <button data-action="edit" data-id="${skill.id}" class="btn-secondary">Edit</button>
                            <button data-action="delete" data-id="${skill.id}" class="btn-secondary">Delete</button>
                        </div>
                    </div>
                    <div class="skill-progress-line">
                        <div class="progress-track"><div class="progress-bar ${skill.progress <= 25 ? 'progress-low' : skill.progress <= 75 ? 'progress-mid' : 'progress-high'}" style="width:${skill.progress}%"></div></div>
                        <div>${skill.progress}%</div>
                    </div>
                </article>
            `).join('');
            updateOverall();
        }

        function updateOverall() {
            const avg = skills.length ? Math.round(skills.reduce((sum, s) => sum + s.progress, 0) / skills.length) : 0;
            avgBar.style.width = `${avg}%`;
            avgLabel.textContent = `${avg}%`;
        }

        function renderPortfolioSummary() {
            if (skills.length === 0) {
                document.getElementById('achievement-summaries').innerHTML = '<p>Add skills above to see your portfolio summary.</p>';
                document.getElementById('copy-summary-btn').style.display = 'none';
                return;
            }

            // Categorize skills by proficiency
            const expert = skills.filter(s => s.progress >= 90);
            const advanced = skills.filter(s => s.progress >= 70 && s.progress < 90);
            const intermediate = skills.filter(s => s.progress >= 40 && s.progress < 70);
            const beginner = skills.filter(s => s.progress < 40);

            const avg = Math.round(skills.reduce((sum, s) => sum + s.progress, 0) / skills.length);

            let html = '<div class="achievement-cards">';

            // Overall Achievement
            html += '<article class="achievement-card">';
            html += '<h3>Overall Proficiency</h3>';
            let proficiencyLevel = 'Beginner';
            let proficiencyColor = 'progress-low';
            if (avg >= 90) {
                proficiencyLevel = 'Expert';
                proficiencyColor = 'progress-high';
            } else if (avg >= 70) {
                proficiencyLevel = 'Advanced';
                proficiencyColor = 'progress-high';
            } else if (avg >= 40) {
                proficiencyLevel = 'Intermediate';
                proficiencyColor = 'progress-mid';
            }
            html += `<p class="big-stat ${proficiencyColor}">${proficiencyLevel}</p>`;
            html += `<p>${avg}% average across ${skills.length} skill${skills.length !== 1 ? 's' : ''}</p>`;
            html += '</article>';

            // Expert Skills
            if (expert.length > 0) {
                html += '<article class="achievement-card">';
                html += '<h3>🏆 Expert Skills</h3>';
                html += '<p>' + expert.map(s => s.name).join(', ') + '</p>';
                html += '</article>';
            }

            // Advanced Skills
            if (advanced.length > 0) {
                html += '<article class="achievement-card">';
                html += '<h3>📈 Advanced Skills</h3>';
                html += '<p>' + advanced.map(s => s.name).join(', ') + '</p>';
                html += '</article>';
            }

            // Intermediate Skills
            if (intermediate.length > 0) {
                html += '<article class="achievement-card">';
                html += '<h3>📚 Intermediate Skills</h3>';
                html += '<p>' + intermediate.map(s => s.name).join(', ') + '</p>';
                html += '</article>';
            }

            // Beginner Skills
            if (beginner.length > 0) {
                html += '<article class="achievement-card">';
                html += '<h3>🌱 Learning Skills</h3>';
                html += '<p>' + beginner.map(s => s.name).join(', ') + '</p>';
                html += '</article>';
            }

            html += '</div>';

            // Generate text summary for copying
            let textSummary = `Professional Skill Summary\n`;
            textSummary += `================================\n`;
            textSummary += `Overall Proficiency: ${proficiencyLevel} (${avg}%)\n\n`;
            if (expert.length > 0) textSummary += `Expert Skills: ${expert.map(s => s.name).join(', ')}\n`;
            if (advanced.length > 0) textSummary += `Advanced Skills: ${advanced.map(s => s.name).join(', ')}\n`;
            if (intermediate.length > 0) textSummary += `Intermediate Skills: ${intermediate.map(s => s.name).join(', ')}\n`;
            if (beginner.length > 0) textSummary += `Learning Skills: ${beginner.map(s => s.name).join(', ')}\n`;

            document.getElementById('achievement-summaries').innerHTML = html;
            document.getElementById('achievement-summaries').dataset.summary = textSummary;
            document.getElementById('copy-summary-btn').style.display = 'inline-block';
        }

        document.getElementById('copy-summary-btn').addEventListener('click', () => {
            const summary = document.getElementById('achievement-summaries').dataset.summary;
            navigator.clipboard.writeText(summary).then(() => {
                const btn = document.getElementById('copy-summary-btn');
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = nameInput.value.trim();
            const progress = Number(progressInput.value);

            if (!name) return;

            const editingId = skillIdInput.value;
            if (editingId) {
                skills = skills.map(skill => skill.id === editingId ? { ...skill, name, progress } : skill);
                submitBtn.textContent = 'Add Skill';
                skillIdInput.value = '';
            } else {
                // Checking for duplicate skill name so no duplicates are added.
                const existingSkill = skills.find(skill => skill.name.toLowerCase() === name.toLowerCase());
                if (existingSkill) {
                    alert(`A skill with the name "${name}" already exists. Please choose a different name.`);
                    return;
                }
                skills.push({ id: crypto.randomUUID(), name, progress });
            }

            nameInput.value = '';
            progressInput.value = 40;
            progressLabel.textContent = '40';

            saveSkills();
            renderSkills();
            renderPortfolioSummary();
        });

        progressInput.addEventListener('input', () => {
            progressLabel.textContent = progressInput.value;
        });

        skillsListEl.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button) return;

            const action = button.getAttribute('data-action');
            const id = button.getAttribute('data-id');

            if (action === 'delete') {
                skills = skills.filter(skill => skill.id !== id);
                saveSkills();
                renderSkills();
                renderPortfolioSummary();
            }

            if (action === 'edit') {
                const skill = skills.find(item => item.id === id);
                if (!skill) return;

                nameInput.value = skill.name;
                progressInput.value = skill.progress;
                progressLabel.textContent = skill.progress;
                skillIdInput.value = id;
                submitBtn.textContent = 'Save Skill';
            }
        });

        renderSkills();
        renderPortfolioSummary();