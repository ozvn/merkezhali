// Smooth scroll için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Eğer anasayfa linki ise (#)
        if (this.getAttribute('href') === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Diğer linkler için normal scroll
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animasyonları için
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

// Mevcut script.js içeriğini koruyup sonuna ekleyelim
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Form gönderimi sırasında butonu devre dışı bırak
    const button = this.querySelector('button');
    const statusDiv = document.getElementById('form-status');
    button.disabled = true;
    button.textContent = 'gönderiliyor...';
    
    // EmailJS parametreleri
    const templateParams = {
        from_name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        to_email: 'iletisim@merkezhali.com'
    };

    // EmailJS ile mail gönderimi
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function() {
            statusDiv.textContent = 'mesajınız başarıyla gönderildi!';
            statusDiv.className = 'form-status success';
            button.textContent = 'gönder';
            button.disabled = false;
            // Formu temizle
            document.getElementById('contact-form').reset();
        }, function(error) {
            statusDiv.textContent = 'bir hata oluştu, lütfen tekrar deneyin';
            statusDiv.className = 'form-status error';
            button.textContent = 'gönder';
            button.disabled = false;
        });
});

// Mevcut script.js içeriğine ekleyin
function toggleBakimContent(header) {
    const allContents = document.querySelectorAll('.bakim-content');
    const allHeaders = document.querySelectorAll('.bakim-header');
    const allIcons = document.querySelectorAll('.bakim-icon');
    
    // Tıklanan kartın durumuna göre hepsini aç veya kapat
    const isActive = header.nextElementSibling.classList.contains('active');
    
    if (isActive) {
        // Hepsini kapat
        allContents.forEach(content => {
            content.style.height = '0px';
            content.classList.remove('active');
        });
        allHeaders.forEach(header => header.classList.remove('active'));
        allIcons.forEach(icon => icon.textContent = '+');
    } else {
        // Hepsini aç
        allContents.forEach(content => {
            content.classList.add('active');
            content.style.height = content.scrollHeight + 'px';
        });
        allHeaders.forEach(header => header.classList.add('active'));
        allIcons.forEach(icon => icon.textContent = '-');
    }
} 