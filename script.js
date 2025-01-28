document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (this.getAttribute('href') === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Mobil menü işlevselliği
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', 
        navLinks.classList.contains('active'));
});

// Form gönderimi için loading state ve hata yönetimi iyileştirmesi
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm?.querySelector('button[type="submit"]');

async function handleSubmit(event) {
    event.preventDefault();
    
    if (!contactForm) return;
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="loading-spinner"></span>
            <span>gönderiliyor...</span>
        `;

        const formData = new FormData(contactForm);
        const templateParams = Object.fromEntries(formData);
        
        await emailjs.send('service_szed8de', 'template_tvd6zz6', templateParams);
        
        showStatus('success', 'mesajınız başarıyla gönderildi!');
        contactForm.reset();
    } catch (error) {
        showStatus('error', 'bir hata oluştu, lütfen tekrar deneyin');
        console.error('Form submission error:', error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'gönder';
    }
}

contactForm?.addEventListener('submit', handleSubmit);

function toggleBakimContent(header) {
    const allContents = document.querySelectorAll('.bakim-content');
    const allHeaders = document.querySelectorAll('.bakim-header');
    const allIcons = document.querySelectorAll('.bakim-icon');
    
    const isActive = header.nextElementSibling.classList.contains('active');
    
    if (isActive) {
        allContents.forEach(content => {
            content.style.height = '0px';
            content.classList.remove('active');
        });
        allHeaders.forEach(header => header.classList.remove('active'));
        allIcons.forEach(icon => icon.textContent = '+');
    } else {
        allContents.forEach(content => {
            content.classList.add('active');
            content.style.height = content.scrollHeight + 'px';
        });
        allHeaders.forEach(header => header.classList.add('active'));
        allIcons.forEach(icon => icon.textContent = '-');
    }
}

// Magnific Popup için gerekli JavaScript
$(document).ready(function() {
    $('.gallery-link').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.find('figcaption').text() || item.el.attr('title');
            }
        },
        zoom: {
            enabled: true
        },
        gallery: {
            enabled: true,
            navigateByImgClick: false,
            tCounter: ''
        },
        disableOn: function() {
            return $(window).width() > 640;
        }
    });
}); 