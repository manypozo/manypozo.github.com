// Modern Resume JavaScript - Manuel Pozo
console.log('Resume script loaded');

// Global variables
let resumeData = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize the resume when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing resume');
    initializeResume();
});

// Initialize resume
async function initializeResume() {
    try {
        // Show loading indicator
        showLoading();
        
        // Load resume data
        await loadResumeData();
        
        // Initialize theme
        initializeTheme();
        
        // Render all content
        renderResume();
        
        // Initialize event listeners
        initializeEventListeners();
        
        // Initialize animations
        initializeAnimations();
        
        // Hide loading indicator
        hideLoading();
        
        console.log('Resume initialized successfully');
    } catch (error) {
        console.error('Error initializing resume:', error);
        hideLoading();
    }
}

// Load resume data from JSON file
async function loadResumeData() {
    try {
        console.log('Loading resume data...');
        const response = await fetch('data/resume.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        resumeData = await response.json();
        console.log('Resume data loaded successfully:', resumeData);
    } catch (error) {
        console.error('Error loading resume data:', error);
        throw error;
    }
}

// Initialize theme
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Render all resume content
function renderResume() {
    console.log('Rendering resume content...');
    
    if (!resumeData) {
        console.error('No resume data available');
        return;
    }
    
    renderContact();
    renderLanguages();
    renderInterests();
    renderSummary();
    renderExperience();
    renderEducation();
    renderProjects();
    renderPublications();
    renderSkills();
    
    console.log('Resume content rendered successfully');
}

// Render contact section
function renderContact() {
    const contactList = document.querySelector('.contact-list');
    if (!contactList || !resumeData.contact) return;
    
    console.log('Rendering contact...');
    contactList.innerHTML = resumeData.contact.map(contact => `
        <li>
            <span class="icon" aria-hidden="true">${getIcon(contact.icon)}</span>
            <a href="${contact.url}" target="_blank" rel="noopener">
                ${contact.value}
            </a>
        </li>
    `).join('');
    
    // Initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Render languages section
function renderLanguages() {
    const languagesList = document.querySelector('.languages-list');
    if (!languagesList || !resumeData.languages) return;
    
    console.log('Rendering languages...');
    languagesList.innerHTML = resumeData.languages.map(lang => `
        <li>${lang.name} <span class="lang-desc">(${lang.level})</span></li>
    `).join('');
}

// Render interests section
function renderInterests() {
    const interestsList = document.querySelector('.interests-list');
    if (!interestsList || !resumeData.interests) return;
    
    console.log('Rendering interests...');
    interestsList.innerHTML = resumeData.interests.map(interest => `
        <li>${interest}</li>
    `).join('');
}

// Render summary section
function renderSummary() {
    const summaryContent = document.querySelector('.summary-content');
    if (!summaryContent || !resumeData.personal.summary) return;
    
    console.log('Rendering summary...');
    summaryContent.innerHTML = resumeData.personal.summary.map(paragraph => `
        <p>${paragraph}</p>
    `).join('');
}

// Render experience section
function renderExperience() {
    const experienceTimeline = document.querySelector('.experience-timeline');
    if (!experienceTimeline || !resumeData.experience) return;
    
    console.log('Rendering experience...');
    experienceTimeline.innerHTML = resumeData.experience.map(exp => `
        <div class="timeline-item">
            <div class="meta">
                <div class="job-title">${exp.title}</div>
                <div class="time">${exp.period}</div>
                <div class="company">
                    <a href="${exp.companyUrl}" target="_blank" rel="noopener">${exp.company}</a>
                </div>
            </div>
            <div class="details">
                ${exp.description.map(desc => `<p>${desc}</p>`).join('')}
            </div>
        </div>
    `).join('');
}

// Render education section
function renderEducation() {
    const educationTimeline = document.querySelector('.education-timeline');
    if (!educationTimeline || !resumeData.education) return;
    
    console.log('Rendering education...');
    educationTimeline.innerHTML = resumeData.education.map(edu => `
        <div class="timeline-item">
            <div class="meta">
                <div class="degree">${edu.degree}</div>
                <div class="time">${edu.period}</div>
                <div class="university">
                    <a href="${edu.institutionUrl}" target="_blank" rel="noopener">${edu.institution}</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Render projects section
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid || !resumeData.projects) return;
    
    console.log('Rendering projects...');
    projectsGrid.innerHTML = resumeData.projects.map(project => `
        <div class="project-item">
            <h3 class="project-title">
                <a href="${project.url}" target="_blank" rel="noopener">${project.name}</a>
            </h3>
            <p class="project-description">${project.description}</p>
        </div>
    `).join('');
}

// Render publications section
function renderPublications() {
    const publicationsList = document.querySelector('.publications-list');
    if (!publicationsList || !resumeData.publications) return;
    
    console.log('Rendering publications...');
    publicationsList.innerHTML = resumeData.publications.map(pub => `
        <div class="publication-item">
            <h3 class="publication-title">${pub.title}</h3>
            <p class="publication-authors">${pub.authors}</p>
            <p class="publication-venue">${pub.venue}</p>
        </div>
    `).join('');
}

// Render skills section
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid || !resumeData.skills) return;
    
    console.log('Rendering skills...');
    skillsGrid.innerHTML = resumeData.skills.map(skill => `
        <div class="skill-item">
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-level" style="--skill-level: ${skill.level}; width: ${skill.level}"></div>
            </div>
        </div>
    `).join('');
}

// Get icon for contact items
function getIcon(iconName) {
    const icons = {
        'mail': '<i data-lucide="mail"></i>',
        'linkedin': '<i data-lucide="linkedin"></i>',
        'github': '<i data-lucide="github"></i>',
        'twitter': '<i data-lucide="twitter"></i>',
        'instagram': '<i data-lucide="instagram"></i>'
    };
    return icons[iconName] || '<i data-lucide="mail"></i>';
}

// Initialize event listeners
function initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile navigation toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
            navbarToggle.setAttribute('aria-expanded', !isExpanded);
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.style.getPropertyValue('--skill-level');
                entry.target.style.width = skillLevel;
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        bar.style.width = '0';
        skillObserver.observe(bar);
    });
}

// Show loading indicator
function showLoading() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
    }
}

// Hide loading indicator
function hideLoading() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        setTimeout(() => {
            loadingIndicator.classList.add('hidden');
        }, 500);
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarToggle = document.querySelector('.navbar-toggle');
    
    if (window.innerWidth > 768 && navbarMenu && navbarToggle) {
        navbarMenu.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations if needed
        console.log('Page hidden');
    } else {
        // Page is visible, resume animations
        console.log('Page visible');
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('Resume script initialized');
