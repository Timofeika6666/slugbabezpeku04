// Функція для ініціалізації меню
function initMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('show');
        });
    }
    
    // Ініціалізація пошуку
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchBtn && searchInput && searchResults) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Функція пошуку
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        searchResults.innerHTML = '<p>Введіть мінімум 2 символи для пошуку</p>';
        searchResults.style.display = 'block';
        return;
    }
    
    // Мок-дані для пошуку (в реальному додатку буде запит до сервера)
    const mockResults = [
        { title: 'Про СБУ', url: 'pages/about.html', snippet: 'Інформація про Службу безпеки України' },
        { title: 'Керівництво', url: 'pages/about.html#leadership', snippet: 'Керівництво Служби безпеки України' },
        { title: 'Кар\'єра в СБУ', url: 'pages/about.html#career', snippet: 'Вимоги для вступу на службу в СБУ' },
        { title: 'Новини', url: 'pages/press.html#news', snippet: 'Останні новини СБУ' },
        { title: 'Контакти', url: 'pages/citizens.html#info', snippet: 'Контактна інформація СБУ' }
    ];
    
    // Фільтруємо результати
    const filteredResults = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.snippet.toLowerCase().includes(query.toLowerCase())
    );
    
    // Показуємо результати
    if (filteredResults.length > 0) {
        let resultsHTML = '';
        filteredResults.forEach(result => {
            resultsHTML += `
                <div class="search-result-item">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.snippet}</p>
                </div>
            `;
        });
        searchResults.innerHTML = resultsHTML;
    } else {
        searchResults.innerHTML = '<p>За вашим запитом нічого не знайдено</p>';
    }
    
    searchResults.style.display = 'block';
}

// Функція для перемикання підрозділів
function initSubsectionNavigation() {
    const subsectionNavs = document.querySelectorAll('.subsection-nav');
    
    subsectionNavs.forEach(nav => {
        const links = nav.querySelectorAll('a');
        const targetId = nav.id.replace('Subsections', 'SubsectionContent');
        const targetContainer = document.getElementById(targetId);
        
        if (!targetContainer) return;
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Отримуємо ідентифікатор підрозділу
                const subsection = this.getAttribute('data-subsection');
                
                // Активуємо посилання
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Показуємо відповідний контент
                const allSubsections = targetContainer.querySelectorAll('[id$="Subsection"]');
                allSubsections.forEach(sub => {
                    sub.style.display = 'none';
                });
                
                const activeSubsection = document.getElementById(subsection + 'Subsection');
                if (activeSubsection) {
                    activeSubsection.style.display = 'block';
                }
                
                // Оновлюємо URL з хешем
                const currentPage = window.location.pathname.split('/').pop();
                history.pushState(null, '', `${currentPage}#${subsection}`);
            });
        });
        
        // Активуємо підрозділ з хеша в URL
        const hash = window.location.hash.substring(1);
        if (hash) {
            const linkToActivate = nav.querySelector(`[data-subsection="${hash}"]`);
            if (linkToActivate) {
                linkToActivate.click();
            }
        }
    });
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    initSubsectionNavigation();
    
    // Активуємо поточну сторінку в меню
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('nav ul li a');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '#home') ||
            (currentPage === 'about.html' && linkPage === '#about') ||
            (currentPage === 'activity.html' && linkPage === '#activity') ||
            (currentPage === 'press.html' && linkPage === '#press') ||
            (currentPage === 'citizens.html' && linkPage === '#citizens')) {
            link.parentElement.classList.add('active');
        }
    });
    
    // Оновлюємо breadcrumbs
    updateBreadcrumbs();
});

// Функція для оновлення breadcrumbs
function updateBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;
    
    const currentPage = window.location.pathname.split('/').pop();
    let breadcrumbsHTML = '<a href="index.html">Головна</a>';
    
    switch(currentPage) {
        case 'about.html':
            breadcrumbsHTML += ' / <a href="pages/about.html">Про СБУ</a>';
            const aboutHash = window.location.hash.substring(1);
            if (aboutHash) {
                const subsectionNames = {
                    'about': 'Про СБУ',
                    'leadership': 'Керівництво',
                    'vision': 'Візія, місія, цінності та принципи',
                    'structure': 'Структура',
                    'career': 'Кар\'єра'
                };
                if (subsectionNames[aboutHash]) {
                    breadcrumbsHTML += ` / ${subsectionNames[aboutHash]}`;
                }
            }
            break;
        case 'activity.html':
            breadcrumbsHTML += ' / <a href="pages/activity.html">Діяльність</a>';
            const activityHash = window.location.hash.substring(1);
            if (activityHash) {
                const subsectionNames = {
                    'counterintelligence': 'Контррозвідка',
                    'investigation': 'Головне слідче управління',
                    'alpha': 'Центр спеціальних операцій "Альфа"',
                    'crime-fight': 'Боротьба зі злочинністю'
                };
                if (subsectionNames[activityHash]) {
                    breadcrumbsHTML += ` / ${subsectionNames[activityHash]}`;
                }
            }
            break;
        case 'press.html':
            breadcrumbsHTML += ' / <a href="pages/press.html">Пресцентр</a>';
            const pressHash = window.location.hash.substring(1);
            if (pressHash) {
                const subsectionNames = {
                    'news': 'Новини',
                    'photo': 'Фотогалерея',
                    'video': 'Відеогалерея'
                };
                if (subsectionNames[pressHash]) {
                    breadcrumbsHTML += ` / ${subsectionNames[pressHash]}`;
                }
            }
            break;
        case 'citizens.html':
            breadcrumbsHTML += ' / <a href="pages/citizens.html">Громадянам</a>';
            const citizensHash = window.location.hash.substring(1);
            if (citizensHash) {
                const subsectionNames = {
                    'info': 'Корисна інформація',
                    'reports': 'Звіти',
                    'legal': 'Нормативно-правова база',
                    'control': 'Демократичний контроль',
                    'wanted': 'У розшуку'
                };
                if (subsectionNames[citizensHash]) {
                    breadcrumbsHTML += ` / ${subsectionNames[citizensHash]}`;
                }
            }
            break;
    }
    
    breadcrumbs.innerHTML = breadcrumbsHTML;
}

// Обробка переходу між сторінками з хешем
window.addEventListener('hashchange', function() {
    updateBreadcrumbs();
    initSubsectionNavigation();
});
