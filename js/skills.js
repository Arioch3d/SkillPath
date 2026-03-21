
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

            skillsListEl.innerHTML = skills.map(skill => `
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
                skills.push({ id: crypto.randomUUID(), name, progress });
            }

            nameInput.value = '';
            progressInput.value = 40;
            progressLabel.textContent = '40';

            saveSkills();
            renderSkills();
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