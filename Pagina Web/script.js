/**
 * BRANDINGRAF - MOTOR INTERACTIVO PREMIUM v2.0
 * TARGET: +200 LINES OF PURE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ELEMENTOS DEL CORE
    const body = document.body;
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navHolder = document.querySelector('.nav-holder');
    const loader = document.getElementById('loader-wrapper');
    const modalOverlay = document.getElementById('modal-overlay');
    const counters = document.querySelectorAll('.count');
    const faqItems = document.querySelectorAll('.faq-accordion-item');

    /**
     * 1. GESTIÓN DE CARGA (PRELOADER)
     */
    const initPage = () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.classList.remove('loading-state');
            
            // Disparar animaciones iniciales
            handleScrollReveal();
        }, 1200);
    };

    /**
     * 2. LÓGICA DE SCROLL (HEADER & PROGRESS)
     */
    const handleScrollEffects = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;

        // Barra de progreso
        if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;

        // Sticky Header
        if (scrollTop > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    /**
     * 3. MENÚ MÓVIL (TOGGLE INTERACTIVO)
     */
    const toggleMenu = () => {
        const isOpen = navHolder.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        
        // Bloquear scroll si está abierto
        body.style.overflow = isOpen ? 'hidden' : 'initial';
    };

    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll('.nav-link, .nav-btn-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navHolder.classList.contains('active')) toggleMenu();
        });
    });

    /**
     * 4. SISTEMA DE MODALES INDEPENDIENTES (FIXED)
     */
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalContents = document.querySelectorAll('.modal-content-wrapper');

    const openModal = (id) => {
        const target = document.getElementById(id);
        if (!target) return;

        modalOverlay.classList.add('active');
        target.classList.add('active');
        body.style.overflow = 'hidden';
        modalOverlay.setAttribute('aria-hidden', 'false');
    };

    const closeAllModals = () => {
        modalOverlay.classList.remove('active');
        modalContents.forEach(c => c.classList.remove('active'));
        body.style.overflow = 'initial';
        modalOverlay.setAttribute('aria-hidden', 'true');
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    document.querySelectorAll('.modal-closer').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeAllModals();
    });

    /**
     * 5. ACORDEÓN FAQ DINÁMICO
     */
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar otros (Opcional: estilo acordeón único)
            faqItems.forEach(other => other.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            } else {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /**
     * 6. CONTADORES ANIMADOS (INTERSECTION OBSERVER)
     */
    const animateCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = 200; 
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(el), 1);
        } else {
            el.innerText = target;
        }
    };

    /**
     * 7. REVELACIÓN DE ELEMENTOS (SCROLL OBSERVER)
     */
    const handleScrollReveal = () => {
        const items = document.querySelectorAll('.reveal-item, .reveal-left, .reveal-right, .reveal-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Si contiene contadores, dispararlos
                    if (entry.target.id === 'nosotros') {
                        counters.forEach(c => animateCounter(c));
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        items.forEach(item => observer.observe(item));
    };

    /**
     * 8. VALIDACIÓN DE FORMULARIO AVANZADA
     */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit-main');
            const btnText = submitBtn.querySelector('.btn-txt');
            const btnLoader = submitBtn.querySelector('.btn-loader');

            // Reset errores
            form.querySelectorAll('.field-wrap').forEach(f => f.classList.remove('error'));

            // Lógica de validación
            let isValid = true;
            const formData = new FormData(form);

            if (formData.get('name').length < 3) {
                form.querySelector('#form-name').parentElement.classList.add('error');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.get('email'))) {
                form.querySelector('#form-email').parentElement.classList.add('error');
                isValid = false;
            }

            if (!isValid) return;

            // Simulación de envío API
            btnText.style.opacity = '0';
            btnLoader.classList.add('active');
            submitBtn.disabled = true;

            await new Promise(r => setTimeout(r, 2000));

            alert('Solicitud enviada con éxito. Un estratega lo contactará pronto.');
            form.reset();
            
            btnText.style.opacity = '1';
            btnLoader.classList.remove('active');
            submitBtn.disabled = false;
        });
    }

    // EVENT LISTENERS
    window.addEventListener('scroll', handleScrollEffects);
    mobileToggle.addEventListener('click', toggleMenu);
    
    // START
    initPage();
    console.log("BrandinGraf Interactive Engine Ready.");
});