/**
 * شركة باريس للسياحة - ملف البرمجة التفاعلية
 * يتضمن: التحكم في القائمة، التحقق من النموذج، تأثيرات الظهور، والأمان
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. التحكم في القائمة المتجاوبة (Hamburger Menu) ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // تغيير الأيقونة
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // --- 2. تأثير Navbar اللاصق وتغيير الرابط النشط ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // تأثير Sticky
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // تحديث الرابط النشط بناءً على التمرير
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. تأثيرات الظهور عند التمرير (Fade-in) ---
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .card, .offer-card, .section-header');
    fadeElements.forEach(el => {
        el.classList.add('fade-in'); // التأكد من وجود الكلاس
        observer.observe(el);
    });

    // --- 4. تأثير 3D خفيف للبطاقات (Tilt Effect) ---
    const cards = document.querySelectorAll('.tilt');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

    // --- 5. التحقق من نموذج الاتصال (Form Validation) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;

        // التحقق من الاسم
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'يرجى إدخال الاسم الكامل');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // التحقق من البريد الإلكتروني
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // التحقق من الرسالة
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'يرجى كتابة رسالتك');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            // محاكاة إرسال النموذج
            formStatus.textContent = 'جاري إرسال رسالتك...';
            formStatus.style.color = '#d4af37';

            setTimeout(() => {
                // استخدام textContent لمنع XSS
                formStatus.textContent = 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.';
                formStatus.style.color = '#27ae60';
                contactForm.reset();
            }, 2000);
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        const group = input.parentElement;
        const errorMsg = group.querySelector('.error-msg');
        errorMsg.textContent = message; // استخدام textContent للأمان
        errorMsg.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }

    function clearError(input) {
        const group = input.parentElement;
        const errorMsg = group.querySelector('.error-msg');
        errorMsg.style.display = 'none';
        input.style.borderColor = '#ddd';
    }
});
