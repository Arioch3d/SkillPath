# SkillPath - Career Development Tracker
## Capstone Project Concept

### Why This Project?
A **Career Skills Tracker & Learning Hub** is perfect for your capstone because it:
- Solves a real problem you're experiencing (job search struggles)
- Shows self-awareness about professional development
- Demonstrates problem-solving for a relevant pain point
- Creates a conversation starter in interviews: "I built this because I was struggling with..."
- Is actually useful - not just a demo project

---

## Project Overview

**SkillPath** is a web application that helps developers track their skills, discover relevant job opportunities, manage learning resources, and set career goals - all in one place.

---

## Core Features (Meets 3+ Requirement)

### 1. Skills Dashboard with Progress Tracking
- Add/edit/delete skills with proficiency levels (Beginner, Intermediate, Advanced, Expert)
- Visual progress bars or charts showing skill development over time
- Categorize skills (Frontend, Backend, DevOps, Soft Skills, etc.)
- Track when skills were added and last updated

### 2. Job Board Integration (API - REQUIRED ✅)
- Use **Adzuna API**, **GitHub Jobs API**, or **The Muse API**
- Search jobs by keywords, location, and filters
- Display relevant positions based on user's tracked skills
- Save/bookmark interesting opportunities
- View job details including description, requirements, salary range

### 3. Learning Resources Library
- Curated links to tutorials, courses, documentation
- Tag resources by skill area
- Mark resources as "completed," "in progress," or "planned"
- Add personal notes to each resource

### 4. Goal Setting & Milestones
- Set career goals with deadlines
- Break down big goals into smaller milestones
- Track completion status and progress
- Visual timeline or progress indicators

---

## Technical Implementation

### Page Structure (Meets 2+ Pages Requirement ✅)

**Page 1 - Dashboard/Home:**
- Welcome message with user name
- Overview of current skills with visual charts (use Chart.js or similar)
- Recent job matches from API
- Upcoming milestones/goals
- Quick stats (total skills tracked, goals completed, etc.)

**Page 2 - Job Search:**
- API-powered job listings
- Search bar with filters (role, location, experience level)
- Job cards with key information
- Saved/bookmarked jobs section
- "Match score" showing how well jobs align with your skills

**Page 3 (Optional/Bonus) - Resources:**
- Learning materials organized by category
- Progress tracking on courses/tutorials
- Search and filter functionality
- Links to external resources

**Page 4 (Optional/Bonus) - Goals:**
- Goal creation form
- Visual goal tracker
- Milestone breakdown
- Completed goals archive

---

## Features from Capstone Requirements List

✅ **API integration** (job board API - MANDATORY)  
✅ **Responsive design** (mobile + desktop views with media queries)  
✅ **Arrays/objects** to organize and manipulate data  
✅ **Form validation** (adding skills, goals, resources)  
✅ **Data visualization** (skill progress charts using Chart.js)  
✅ **Local storage** or JSON file to persist user data between sessions  
✅ **Multiple pages/routes** (Dashboard, Job Search, Resources, Goals)

**Bonus considerations:**
- User registration/login system (if you want to go further)
- Export data as PDF or CSV
- Email notifications for new job matches
- Dark mode toggle

---

## Recommended Tech Stack

### Frontend:
- **HTML5** - Semantic markup
- **CSS3** - Flexbox/Grid for responsive layouts
- **JavaScript (ES6+)** - DOM manipulation, API calls, data management

### API:
- **Adzuna API** (recommended - free tier, well-documented, global job listings)
  - Sign up at: https://developer.adzuna.com/
- **Alternative:** The Muse API, RemoteOK API, or GitHub Jobs API

### Libraries/Tools:
- **Chart.js** - For visualizing skill progress and statistics
- **LocalStorage API** - Store user data persistently in the browser
- **Fetch API** - Make HTTP requests to job board API

### Version Control:
- **Git/GitHub** - 10+ commits required for capstone

---

## Why This Will Impress Employers

1. **Relatable Problem** - Every developer understands job hunting struggles
2. **Practical Utility** - It's actually useful, not just a demo
3. **Shows Initiative** - Building solutions to your own problems
4. **Professional Presentation** - Career-focused theme resonates with hiring managers
5. **Technical Skills** - Demonstrates API integration, data management, responsive design
6. **Portfolio Piece** - Can be showcased during interviews and on your resume

---

## Security Considerations ⚠️

**Important:** This project will likely involve user data (skills, goals, saved jobs). Here are security considerations to keep in mind:

### For the MVP (Minimum Viable Product):
**Recommended Approach:** Use **LocalStorage only** (no login system)
- All data stays in the user's browser
- No server-side storage = no authentication needed
- Simpler to implement and review
- Still meets all capstone requirements
- Good for a portfolio piece that runs entirely client-side

### If You Want to Add User Accounts (Optional - More Complex):

**Think carefully before adding login functionality.** Authentication is complex and easy to get wrong. If you do want user accounts:

1. **DON'T build your own authentication from scratch**
   - Password hashing, session management, and secure storage are complex
   - Security vulnerabilities can be career-damaging in a portfolio piece

2. **DO use a trusted authentication service:**
   - **Firebase Authentication** (Google) - recommended for beginners
   - **Auth0** - another good option
   - **Supabase** - includes database + auth
   - These handle the security for you

3. **Never store:**
   - Passwords in plain text (use the auth service to handle this)
   - API keys in your frontend code (they'll be visible to anyone)
   - Sensitive user data without encryption

4. **API Key Security:**
   - Your job board API key should NOT be in your frontend JavaScript
   - For a student project using free-tier APIs, this is often acceptable but note it in your README
   - For production: use a backend proxy to hide keys
   - Alternative: Use APIs that don't require keys (like RemoteOK)

### Recommendation:
Start with LocalStorage-only (no login). It's simpler, meets requirements, and avoids security pitfalls. If you want to add authentication later, talk to a mentor first and use Firebase Auth.

**Security is important, but don't let it stop you from building.** A working project with LocalStorage is much better than an abandoned project that got stuck on authentication.

---

## Getting Started - Development Phases

### Week 1-2: Planning & Setup
- Review capstone requirements
- Set up GitHub repository
- Create wireframes/mockups for all pages
- Research and test job board APIs
- Set up basic HTML structure for all pages

### Week 3-4: Core Development
- Build Skills Dashboard page
- Implement LocalStorage for data persistence
- Add/edit/delete functionality for skills
- Create responsive navigation between pages

### Week 5-6: API Integration & Job Search
- Integrate job board API
- Build Job Search page with filters
- Implement bookmark/save functionality
- Add visual components (charts, progress bars)

### Week 7-8: Polish & Testing
- Refine responsive design (mobile + desktop)
- Add Resources and Goals pages
- Test all features thoroughly
- Write comprehensive README
- Get mentor feedback
- Final testing and bug fixes

---

## README Requirements Checklist

Your README should include:

- [ ] Project title and description (at least one paragraph)
- [ ] List of 3+ features implemented from the requirements list
- [ ] Installation/setup instructions
- [ ] How to obtain an API key (step-by-step for Adzuna or your chosen API)
- [ ] Required dependencies (list any libraries like Chart.js)
- [ ] Browser requirements (modern browser with LocalStorage support)
- [ ] Citation of AI usage (if you used ChatGPT, Claude, Copilot, etc.)
- [ ] Screenshots of your application
- [ ] Link to live demo (if deployed on GitHub Pages, Netlify, etc.)

---

## Tips for Success

1. **Start Early** - Don't wait until the last minute
2. **Commit Frequently** - Make small, meaningful commits (10+ required)
3. **Show Mentors Early** - Get feedback on your approach before building too much
4. **Test As You Go** - Don't wait until the end to test features
5. **Keep It Simple First** - Get the core features working, then add extras
6. **Make It Yours** - Add personal touches that reflect your style
7. **Document Everything** - Good comments and README are crucial

---

## API Resources

### Adzuna API (Recommended)
- **Website:** https://developer.adzuna.com/
- **Free Tier:** Yes (5,000 calls/month)
- **Documentation:** Excellent
- **Coverage:** US, UK, and many other countries

### The Muse API
- **Website:** https://www.themuse.com/developers/api/v2
- **Free Tier:** Yes
- **Good for:** Tech-focused jobs

### RemoteOK API
- **Website:** https://remoteok.com/api
- **Free Tier:** Yes (no key required)
- **Good for:** Remote developer jobs

---

## Questions to Consider

Before you start coding, think about:
- What skills do you want to track?
- How will you categorize skills?
- What makes a job a "good match" for your skills?
- What information is most important to display about a job?
- How should the mobile vs desktop experience differ?

---

## Final Thoughts

This project shows you're not just learning to code - you're using code to solve real problems in your life. That's exactly what employers want to see. Build something you're proud of, and it will shine through in your presentations and interviews.

Good luck! 🚀

---

**Remember:** This is YOUR project. Feel free to adapt these ideas to match your interests and skills. The most impressive projects are the ones where the developer's passion shows through.
