'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Portfolio filter
        --------------------*/
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio__gallery').length > 0) {
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true,
        closeOnClick: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    /*------------------
        Header Scroll Effect
    --------------------*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    /*------------------
        Active Menu Item on Scroll
    --------------------*/
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop() + 100; // 100px offset para compensar header
        
        // Definir las secciones y sus enlaces correspondientes
        var sections = [
            { id: '#home', link: 'a[href="#home"]' },
            { id: '#about', link: 'a[href="#about"]' },
            { id: '#portfolio', link: 'a[href="#portfolio"]' },
            { id: '#modelos', link: 'a[href="#modelos"]' },
            { id: '#contact', link: 'a[href="#contact"]' }
        ];
        
        // Remover clases activas de todos los enlaces
        $('nav a, .slicknav_nav a').removeClass('active');
        $('nav li, .slicknav_nav li').removeClass('active');
        
        // Encontrar la sección actual
        var currentSection = null;
        
        for (var i = 0; i < sections.length; i++) {
            var section = $(sections[i].id);
            if (section.length) {
                var sectionTop = section.offset().top;
                var sectionBottom = sectionTop + section.outerHeight();
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    currentSection = sections[i];
                    break;
                }
            }
        }
        
        // Si no hay sección específica, usar la primera por defecto
        if (!currentSection && scrollPos < 200) {
            currentSection = sections[0]; // home
        }
        
        // Aplicar clase activa a la sección actual
        if (currentSection) {
            // Para menú desktop
            $('nav ' + currentSection.link).addClass('active');
            $('nav ' + currentSection.link).parent('li').addClass('active');
            
            // Para menú móvil (SlickNav)
            $('.slicknav_nav ' + currentSection.link).addClass('active');
            $('.slicknav_nav ' + currentSection.link).parent('li').addClass('active');
        }
    });

    /*------------------
        Hero Video Simple Control
    --------------------*/
    setTimeout(function() {
        var heroVideo = document.getElementById('hero-video');
        if (heroVideo) {
            // Configurar video para mejor compatibilidad móvil
            heroVideo.setAttribute('playsinline', 'true');
            heroVideo.setAttribute('webkit-playsinline', 'true');
            
            // Intentar reproducir el video
            var playPromise = heroVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    console.log('Video playing successfully');
                }).catch(function(error) {
                    console.log('Video autoplay blocked, pero el video está disponible para interacción:', error);
                    
                    // Si el autoplay falla, permitir reproducción con toque
                    document.addEventListener('touchstart', function() {
                        heroVideo.play();
                    }, { once: true });
                    
                    // También permitir con click para desktop
                    document.addEventListener('click', function() {
                        heroVideo.play();
                    }, { once: true });
                });
            }
        }
    }, 1000);

    /*------------------
        Smooth Scroll Navigation
    --------------------*/
    // Smooth scroll para enlaces de navegación (desktop y móvil)
    $('a[href*="#"]:not([href="#"])').click(function(e) {
        // Verificar si el enlace apunta a una sección en la misma página
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                // Prevenir comportamiento por defecto
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                if ($('.slicknav_menu').hasClass('slicknav_open')) {
                    $('.slicknav_btn').click();
                }
                
                // Animación de scroll suave (1 segundo = 1000ms)
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 // 80px offset para el header fijo
                }, 1000, 'easeInOutCubic');
                
                return false;
            }
        }
    });

    // Función de easing personalizada para scroll más suave
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };

    /*------------------
        Scroll to Top Button
    --------------------*/
    // Mostrar/ocultar botón según scroll position
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top-btn').addClass('show');
        } else {
            $('.scroll-to-top-btn').removeClass('show');
        }
    });

    // Funcionalidad del botón scroll to top
    $('.scroll-to-top-btn').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutCubic');
        return false;
    });

})(jQuery);