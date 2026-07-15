document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const langEn = document.getElementById('langEn');
    const langPt = document.getElementById('langPt');
    const translatableElements = document.querySelectorAll('.translatable');

    // Check localStorage for saved language preference or default to 'pt'
    let currentLang = localStorage.getItem('preferredLanguage') || 'pt';

    // Function to update the DOM based on the selected language
    const setLanguage = (lang) => {
        // Update translatable texts
        translatableElements.forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) {
                el.textContent = newText;
            }
        });

        // Update toggle button active state
        if (lang === 'en') {
            langEn.classList.add('active');
            langPt.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            langPt.classList.add('active');
            langEn.classList.remove('active');
            document.documentElement.lang = 'pt';
        }

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
        currentLang = lang;
    };

    // Initialize with current language
    setLanguage(currentLang);

    // Toggle event listener
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'pt' : 'en';
        setLanguage(newLang);
    });

    // Email Copy Functionality
    const emailBtn = document.getElementById('emailBtn');
    const toast = document.getElementById('toast');
    const emailAddress = 'moreiramanuela13@gmail.com';

    if (emailBtn && toast) {
        emailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                if (currentLang === 'en') {
                    toast.textContent = 'Email copied to clipboard!';
                } else {
                    toast.textContent = 'E-mail copiado para a área de transferência!';
                }
                
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }
});
