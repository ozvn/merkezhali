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

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const button = this.querySelector('button');
    const statusDiv = document.getElementById('form-status');
    button.disabled = true;
    button.textContent = 'gönderiliyor...';
    
    const templateParams = {
        from_name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        to_email: 'iletisim@merkezhali.com'
    };

    emailjs.send('service_szed8de', 'template_tvd6zz6', templateParams)
        .then(function() {
            statusDiv.textContent = 'mesajınız başarıyla gönderildi!';
            statusDiv.className = 'form-status success';
            button.textContent = 'gönder';
            button.disabled = false;
            document.getElementById('contact-form').reset();
        }, function(error) {
            statusDiv.textContent = 'bir hata oluştu, lütfen tekrar deneyin';
            statusDiv.className = 'form-status error';
            button.textContent = 'gönder';
            button.disabled = false;
        });
});

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