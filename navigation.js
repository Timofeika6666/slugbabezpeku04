// Функція для ініціалізації перемикання підрозділів
function initSubsections(subsectionsId) {
    const subsectionNav = document.getElementById(subsectionsId);
    if (!subsectionNav) return;
    
    const links = subsectionNav.querySelectorAll('a');
    const allSubsections = document.querySelectorAll('.subsection');
    
    // Функція для активації підрозділу
    function activateSubsection(subsectionId) {
        // Приховуємо всі підрозділи
        allSubsections.forEach(sub => {
            sub.style.display = 'none';
        });
        
        // Показуємо активний підрозділ
        const activeSubsection = document.getElementById(subsectionId);
        if (activeSubsection) {
            activeSubsection.style.display = 'block';
        }
        
        // Оновлюємо активне посилання
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + subsectionId) {
                link.classList.add('active');
            }
        });
        
        // Оновлюємо URL з хешем
        const currentPage = window.location.pathname.split('/').pop();
        history.replaceState(null, '', `${currentPage}#${subsectionId}`);
    }
    
    // Додаємо обробники подій для посилань
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const subsectionId = this.getAttribute('href').substring(1);
            activateSubsection(subsectionId);
        });
    });
    
    // Активуємо підрозділ з хеша в URL або перший підрозділ
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        activateSubsection(hash);
    } else {
        // Активуємо перше посилання
        const firstLink = links[0];
        if (firstLink) {
            const firstSubsectionId = firstLink.getAttribute('href').substring(1);
            activateSubsection(firstSubsectionId);
        }
    }
}

// Функція для оновлення breadcrumbs
function updateBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;
    
    const currentPage = window.location.pathname.split('/').pop();
    const hash = window.location.hash.substring(1);
    
    let breadcrumbsHTML = '<a href="index.html">Головна</a>';
    
    // Додаємо поточну сторінку
    const pageNames = {
        'index.html': 'Головна',
        'about.html': 'Про СБУ',
        'activity.html': 'Діяльність',
        'press.html': 'Пресцентр',
        'citizens.html': 'Громадянам'
    };
    
    if (pageNames[currentPage]) {
        breadcrumbsHTML += ` <span>/</span> <a href="${currentPage}">${pageNames[currentPage]}</a>`;
    }
    
    // Додаємо підрозділ з хеша
    if (hash) {
        const subsectionNames = {
            // Про СБУ
            'about': 'Про СБУ',
            'leadership': 'Керівництво',
            'vision': 'Візія, місія, цінності',
            'structure': 'Структура',
            'career': 'Кар\'єра',
            
            // Діяльність
            'counterintelligence': 'Контррозвідка',
            'investigation': 'Головне слідче управління',
            'alpha': 'Центр спеціальних операцій "Альфа"',
            'crime': 'Боротьба зі злочинністю',
            'cyber': 'Кібербезпека',
            'economic': 'Економічна безпека',
            
            // Пресцентр
            'news': 'Новини',
            'photo': 'Фотогалерея',
            'video': 'Відеогалерея',
            'statements': 'Офіційні заяви',
            'briefings': 'Брифінги',
            
            // Громадянам
            'info': 'Корисна інформація',
            'reports': 'Звіти',
            'legal': 'Нормативно-правова база',
            'control': 'Демократичний контроль',
            'wanted': 'У розшуку',
            'appeals': 'Звернення громадян'
        };
        
        if (subsectionNames[hash]) {
            breadcrumbsHTML += ` <span>/</span> <span>${subsectionNames[hash]}</span>`;
        }
    }
    
    breadcrumbs.innerHTML = breadcrumbsHTML;
}

// Оновлюємо breadcrumbs при зміні хеша
window.addEventListener('hashchange', updateBreadcrumbs);

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    updateBreadcrumbs();
    
    // Кнопка "Повернутися нагору"
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
