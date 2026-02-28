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

### Page Structure (Meets 2+ Pages Requirement)

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

**API integration** (job board API)  
**Responsive design** (mobile + desktop views with media queries)  
**Arrays/objects** to organize and manipulate data  
**Form validation** (adding skills, goals, resources)  
**Data visualization** (skill progress charts using Chart.js)  
**Local storage** or JSON file to persist user data between sessions  
**Multiple pages/routes** (Dashboard, Job Search, Resources, Goals)

**Bonus considerations:**
- User registration/login system (if you want to go further)
- Export data as PDF or CSV
- Email notifications for new job matches
- Dark mode toggle

---

## Technical Skills

### Frontend:
- **HTML5** - Semantic markup
- **CSS3** - Flexbox/Grid for responsive layouts
- **JavaScript (ES6+)** - DOM manipulation, API calls, data management

### API:
- **Adzuna API** (recommended - free tier, well-documented, global job listings)
  - Need to Sign up at: https://developer.adzuna.com/
- **Alternative API's I can use for Job Board:** The Muse API, RemoteOK API, or GitHub Jobs API

### Libraries/Tools:
- **Chart.js** - I will use for visualizing skill progress and statistics
- **LocalStorage API** - To store user data persistently in the browser
- **Fetch API** - To make HTTP requests to job board API

### Version Control:
- **Git/GitHub** - Will use GitHub to track changes.

---

## Why I would like to create this project

1. **Relatable Problem** - Every developer understands job hunting struggles
2. **Practical Utility** - It's actually useful, not just a for this demo
3. **Shows Initiative** - Building solutions to my own development challenges.
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

### If I Want to Add User Accounts:

1. **Will use a trusted authentication service:**
   - **Firebase Authentication** (Google)
   - **Auth0**
   - **Supabase**

### Thoughts on approach:
Start with LocalStorage (no login is required). If I want to add authentication later, talk to a mentor about best approach using authenticator service.

**Security is important, so start without authentication.


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

## API Resources

### Adzuna API
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

This project shows I'm not just learning to code - I'm using code to solve real problems in my life. 
