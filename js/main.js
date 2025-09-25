'use strict';

(function ($) {

    // Agregar easings personalizados para animaciones más fluidas
    $.easing.easeOutCubic = function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    };
    
    $.easing.easeInCubic = function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    };

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        // Initialize current year safely - no more document.write()
        if ($('#currentYear').length > 0) {
            $('#currentYear').text(new Date().getFullYear());
            console.log('✅ Current year initialized safely');
        }

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
        closeOnClick: true,
        removeIds: true,
        removeClasses: false,
        duplicate: true,
        label: 'MENU',
        init: function(){
            console.log('SlickNav initialized');
            // Reinitialize language selector functionality for mobile menu
            setTimeout(initializeMobileLanguageSelector, 100);
        },
        afterOpen: function(trigger){
            console.log('SlickNav opened');
            // Ensure language dropdown functionality works in mobile menu
            setTimeout(function() {
                initializeMobileLanguageSelector();
            }, 100);
        },
        beforeClose: function(trigger){
            // Close any open language dropdowns when menu closes
            $('.slicknav_nav .language-toggle').removeClass('active');
            $('.slicknav_nav .language-dropdown').removeClass('show');
        }
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

    /*------------------
        Mobile Language Selector Initialization
    --------------------*/
    function initializeMobileLanguageSelector() {
        // Remove any existing event handlers to prevent duplicates
        $('.slicknav_nav .language-toggle').off('click');
        $('.slicknav_nav .language-option').off('click');
        
        // Check if SlickNav mobile menu exists
        if ($('.slicknav_nav').length === 0) {
            console.log('SlickNav not ready yet, retrying...');
            setTimeout(initializeMobileLanguageSelector, 200);
            return;
        }
        
        // Toggle dropdown for mobile SlickNav
        $('.slicknav_nav .language-toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const $toggle = $(this);
            const $dropdown = $toggle.siblings('.language-dropdown');
            const $socialContainer = $toggle.closest('li').find('.mobile-social-container');
            
            if ($toggle.hasClass('active')) {
                // Cerrar: quitar clase activa y ocultar dropdown
                $toggle.removeClass('active');
                $dropdown.removeClass('show');
            } else {
                // Abrir: activar botón y después mostrar dropdown con retraso
                $toggle.addClass('active');
                
                // Retraso de 0.5 segundos antes de mostrar las opciones
                setTimeout(function() {
                    if ($toggle.hasClass('active')) { // Verificar que aún esté activo
                        $dropdown.addClass('show');
                        // Los iconos sociales se moverán automáticamente hacia abajo
                    }
                }, 200);
            }
        });
        
        // Language selection in mobile SlickNav
        $('.slicknav_nav .language-option').on('click', function(e) {
            e.preventDefault();
            
            const selectedLang = $(this).data('lang');
            const flagSrc = $(this).find('.flag-icon').attr('src');
            const langText = selectedLang.toUpperCase();
            
            // Update current language display for both desktop and mobile
            $('#currentFlag').attr('src', flagSrc);
            $('#currentLang').text(langText);
            $('#currentFlagMobile').attr('src', flagSrc);
            $('#currentLangMobile').text(langText);
            
            // Update SlickNav mobile language display too
            $('.slicknav_nav .language-toggle .flag-icon').attr('src', flagSrc);
            $('.slicknav_nav .language-toggle .lang-text').text(langText);
            
            // Update active state
            $('.language-option').removeClass('active');
            $(`[data-lang="${selectedLang}"]`).addClass('active');
            
            // Close dropdowns
            $('.language-toggle').removeClass('active');
            $('.language-dropdown').removeClass('show');
            
            // También cerrar el dropdown de SlickNav específicamente
            $('.slicknav_nav .language-toggle').removeClass('active');
            $('.slicknav_nav .language-dropdown').removeClass('show');
            
            // Store selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Apply language changes
            changeLanguage(selectedLang);
            
            // Close mobile menu after language selection
            if ($('.slicknav_menu').hasClass('slicknav_open')) {
                $('.slicknav_btn').click();
            }
        });
        
        console.log('Mobile language selector initialized');
    }

    /*------------------
        Language Selector
    --------------------*/
    // Toggle dropdown for desktop
    $('#languageToggle').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
        $('#languageDropdown').toggleClass('show');
    });
    
    // Toggle dropdown for mobile
    $('#languageToggleMobile').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
        $('#languageDropdownMobile').toggleClass('show');
    });

    // Close dropdown when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.language-selector').length) {
            $('#languageToggle').removeClass('active');
            $('#languageDropdown').removeClass('show');
            $('#languageToggleMobile').removeClass('active');
            $('#languageDropdownMobile').removeClass('show');
            // Also close SlickNav mobile language dropdown
            $('.slicknav_nav .language-toggle').removeClass('active');
            $('.slicknav_nav .language-dropdown').removeClass('show');
        }
    });

    // Language selection
    $('.language-option').click(function(e) {
        e.preventDefault();
        console.log('🔍 Language option clicked!');
        
        const selectedLang = $(this).data('lang');
        console.log('🌐 Selected language:', selectedLang);
        
        const flagSrc = $(this).find('.flag-icon').attr('src');
        const langText = selectedLang.toUpperCase();
        
        console.log('🏳️ Flag src:', flagSrc);
        console.log('📝 Lang text:', langText);
        
        // Update current language display for both desktop and mobile
        $('#currentFlag').attr('src', flagSrc);
        $('#currentLang').text(langText);
        $('#currentFlagMobile').attr('src', flagSrc);
        $('#currentLangMobile').text(langText);
        
        // Update active state
        $('.language-option').removeClass('active');
        $(`[data-lang="${selectedLang}"]`).addClass('active');
        
        // Close dropdowns
        $('#languageToggle').removeClass('active');
        $('#languageDropdown').removeClass('show');
        $('#languageToggleMobile').removeClass('active');
        $('#languageDropdownMobile').removeClass('show');
        
        // Store selected language
        localStorage.setItem('selectedLanguage', selectedLang);
        console.log('💾 Language saved to localStorage:', selectedLang);
        console.log('💾 Verification - localStorage now contains:', localStorage.getItem('selectedLanguage'));
        
        // Apply language changes
        console.log('🔄 Calling changeLanguage function...');
        changeLanguage(selectedLang);
    });

    /*------------------
        Language Content
    --------------------*/
    const translations = {
        es: {
            // Navigation
            home: "Home",
            about: "About",
            portfolio: "Portfolio",
            models: "3D Models",
            contact: "Contact",
            followMe: "Sígueme:",
            
            // Hero Section
            heroGreeting: "¡Hola! Soy Gabriel Loaeza",
            heroTitle1: "Desarrollador de Videojuegos",
            heroBtn1: "Ver mi portafolio",
            heroSpan2: "Diseño y creatividad digital",
            heroTitle2: "Modelado 3D de Personajes",
            heroBtn2: "Explorar modelos",
            heroSpan3: "Jugabilidad Inmersiva",
            heroTitle3: "Mundos que Cobran Vida",
            heroBtn3: "Descubrir más",
            
            // About Section
            aboutTitle: "Sobre Mi",
            aboutSubtitle: "Mi experiencia",
            aboutText: "Soy Gabriel Loaeza, desarrollador de videojuegos y artista 3D , especializado en el modelado de personajes y \"game-ready\" A lo largo de los años me he dedicado a construir experiencias inspiradas en los clásicos retro y a dar vida a personajes en 3D con gran impacto visual.",
            contactTitle: "Contacto",
            skillsTitle: "Habilidades",
            toolsTitle: "Herramientas",
            
            // Skills Tooltips
            tooltip3DModeling: "Modelado 3D - Modelado de Personajes y entornos",
            tooltipZBrush: "Escultura de personajes y objetos hard surface en ZBrush",
            tooltipGameDev: "Desarrollo de Videojuegos - Programación y diseño de gameplay",
            tooltipTexturing: "Texturizado - Aplicación de materiales y texturas realistas",
            tooltipLevelDesign: "Level Design - Diseño de niveles y ambientes inmersivos",
            
            // Counter Section
            counterGames: "Videojuegos Desarrollados",
            counter3D: "Modelos 3D Creados",
            counterExp: "Años de Experiencia",
            counterProjects: "Proyectos Completados",
            
            // CTA Section
            ctaTitle: "Descubre mis Videojuegos Desarrollados",
            ctaSubtitle: "Explora las experiencias interactivas que he creado",
            ctaButton: "Ver mis Creaciones",
            
            // 3D Models Section
            modelsIntro: "Conoce mis Modelos!",
            modelsTitle: "Modelado 3d",
            viewPortfolio: "Ver Portafolio Completo",
            
            // Footer
            rightsReserved: "Todos los derechos reservados"
        },
        en: {
            // Navigation
            home: "Home",
            about: "About",
            portfolio: "Portfolio",
            models: "3D Models",
            contact: "Contact",
            followMe: "Follow me:",
            
            // Hero Section
            heroGreeting: "Hello! I'm Gabriel Loaeza",
            heroTitle1: "Game Developer",
            heroBtn1: "View my portfolio",
            heroSpan2: "Design and digital creativity",
            heroTitle2: "3D Character Modeling",
            heroBtn2: "Explore models",
            heroSpan3: "Immersive Gameplay",
            heroTitle3: "Worlds That Come to Life",
            heroBtn3: "Discover more",
            
            // About Section
            aboutTitle: "About Me",
            aboutSubtitle: "My experience",
            aboutText: "I'm Gabriel Loaeza, game developer and 3D artist, specialized in character modeling and \"game-ready\" assets. Over the years I have dedicated myself to building experiences inspired by retro classics and bringing 3D characters to life with great visual impact.",
            contactTitle: "Contact",
            skillsTitle: "Skills",
            toolsTitle: "Tools",
            
            // Skills Tooltips
            tooltip3DModeling: "3D Modeling - Character and environment modeling",
            tooltipZBrush: "Character sculpting and hard surface objects in ZBrush",
            tooltipGameDev: "Game Development - Programming and gameplay design",
            tooltipTexturing: "Texturing - Application of realistic materials and textures",
            tooltipLevelDesign: "Level Design - Design of immersive levels and environments",
            
            // Counter Section
            counterGames: "Games Developed",
            counter3D: "3D Models Created",
            counterExp: "Years of Experience",
            counterProjects: "Projects Completed",
            
            // CTA Section
            ctaTitle: "Discover My Developed Games",
            ctaSubtitle: "Explore the interactive experiences I have created",
            ctaButton: "View My Creations",
            
            // 3D Models Section
            modelsIntro: "Check out my Models!",
            modelsTitle: "3D Modeling",
            viewPortfolio: "View Complete Portfolio",
            
            // Footer
            rightsReserved: "All rights reserved"
        },
        ja: {
            // Navigation
            home: "ホーム",
            about: "私について",
            portfolio: "ポートフォリオ",
            models: "3Dモデル",
            contact: "お問い合わせ",
            followMe: "フォローしてください:",
            
            // Hero Section
            heroGreeting: "こんにちは！ガブリエル・ロアエサです",
            heroTitle1: "ゲーム開発者",
            heroBtn1: "ポートフォリオを見る",
            heroSpan2: "デザインとデジタル創造",
            heroTitle2: "3Dキャラクターモデリング",
            heroBtn2: "モデルを探索",
            heroSpan3: "没入型ゲームプレイ",
            heroTitle3: "生命を持つ世界",
            heroBtn3: "詳しく見る",
            
            // About Section
            aboutTitle: "私について",
            aboutSubtitle: "私の経験",
            aboutText: "私はガブリエル・ロアエサです。ゲーム開発者であり3Dアーティストで、キャラクターモデリングと「ゲーム対応」アセットを専門としています。長年にわたり、レトロクラシックにインスパイアされた体験を構築し、視覚的インパクトの大きい3Dキャラクターに生命を吹き込むことに専念してきました。",
            contactTitle: "連絡先",
            skillsTitle: "スキル",
            toolsTitle: "ツール",
            
            // Skills Tooltips
            tooltip3DModeling: "3Dモデリング - キャラクターと環境のモデリング",
            tooltipZBrush: "ZBrushでのキャラクタースカルプティングとハードサーフェスオブジェクト",
            tooltipGameDev: "ゲーム開発 - プログラミングとゲームプレイデザイン",
            tooltipTexturing: "テクスチャリング - リアルな素材とテクスチャの適用",
            tooltipLevelDesign: "レベルデザイン - 没入型レベルと環境のデザイン",
            
            // Counter Section
            counterGames: "開発したゲーム",
            counter3D: "作成した3Dモデル",
            counterExp: "年の経験",
            counterProjects: "完了したプロジェクト",
            
            // CTA Section
            ctaTitle: "開発したゲームを発見",
            ctaSubtitle: "私が作成したインタラクティブな体験を探索",
            ctaButton: "作品を見る",
            
            // 3D Models Section
            modelsIntro: "私のモデルをチェック！",
            modelsTitle: "3Dモデリング",
            viewPortfolio: "完全なポートフォリオを見る",
            
            // Footer
            rightsReserved: "全著作権所有"
        }
    };

    function changeLanguage(lang) {
        console.log('🌍 changeLanguage called with:', lang);
        
        // Add early return for debugging
        console.log('🧪 DEBUG: Page elements check');
        console.log('🧪 Body exists:', $('body').length);
        console.log('🧪 Hero section exists:', $('#home').length);
        console.log('🧪 Hero items total:', $('.hero__item').length);
        
        const t = translations[lang];
        
        if (!t) {
            console.error('❌ Translations not found for language:', lang);
            return;
        }
        
        console.log('✅ Translations found:', t);
        
        // Update navigation (both regular and SlickNav)
        console.log('🔧 Updating navigation...');
        var homeElements = $('nav ul li a[href="#home"], .slicknav_nav a[href="#home"]');
        console.log('🔍 Home elements found:', homeElements.length);
        homeElements.text(t.home);
        
        var aboutElements = $('nav ul li a[href="#about"], .slicknav_nav a[href="#about"]');
        console.log('🔍 About elements found:', aboutElements.length);  
        aboutElements.text(t.about);
        
        $('nav ul li a[href="#portfolio"], .slicknav_nav a[href="#portfolio"]').text(t.portfolio);
        $('nav ul li a[href="#modelos"], .slicknav_nav a[href="#modelos"]').text(t.models);
        $('nav ul li a[href="#contact"], .slicknav_nav a[href="#contact"]').text(t.contact);
        $('.mobile-social-title').text(t.followMe);
        
        console.log('🎯 Navigation updated');
        
        // Update hero section - Force update all slides including hidden ones
        console.log('🔧 Updating hero section...');
        
        // Strategy 1: Update original DOM elements directly (more reliable)
        var heroItems = $('.hero__slider .hero__item');
        console.log(`🔍 Found ${heroItems.length} hero items in original DOM`);
        
        // Update each item directly
        heroItems.each(function(index) {
            var $item = $(this);
            var $span = $item.find('.hero__text span');
            var $h2 = $item.find('.hero__text h2');
            var $btn = $item.find('.hero__text a');
            
            console.log(`🔄 Processing hero item ${index}:`);
            console.log(`   - Spans found: ${$span.length}`);
            console.log(`   - H2s found: ${$h2.length}`);
            console.log(`   - Buttons found: ${$btn.length}`);
            
            if ($span.length > 0) {
                console.log(`   - Current span text: "${$span.text()}"`);
            }
            
            switch(index) {
                case 0:
                    if ($span.length) {
                        $span.text(t.heroGreeting);
                        console.log(`   ✅ Updated item 0 span to: "${t.heroGreeting}"`);
                    }
                    if ($h2.length) {
                        $h2.text(t.heroTitle1);
                        console.log(`   ✅ Updated item 0 h2 to: "${t.heroTitle1}"`);
                    }
                    if ($btn.length) {
                        $btn.text(t.heroBtn1);
                        console.log(`   ✅ Updated item 0 btn to: "${t.heroBtn1}"`);
                    }
                    break;
                case 1:
                    if ($span.length) {
                        $span.text(t.heroSpan2);
                        console.log(`   ✅ Updated item 1 span to: "${t.heroSpan2}"`);
                    }
                    if ($h2.length) {
                        $h2.text(t.heroTitle2);
                        console.log(`   ✅ Updated item 1 h2 to: "${t.heroTitle2}"`);
                    }
                    if ($btn.length) {
                        $btn.text(t.heroBtn2);
                        console.log(`   ✅ Updated item 1 btn to: "${t.heroBtn2}"`);
                    }
                    break;
                case 2:
                    if ($span.length) {
                        $span.text(t.heroSpan3);
                        console.log(`   ✅ Updated item 2 span to: "${t.heroSpan3}"`);
                    }
                    if ($h2.length) {
                        $h2.text(t.heroTitle3);
                        console.log(`   ✅ Updated item 2 h2 to: "${t.heroTitle3}"`);
                    }
                    if ($btn.length) {
                        $btn.text(t.heroBtn3);
                        console.log(`   ✅ Updated item 2 btn to: "${t.heroBtn3}"`);
                    }
                    break;
            }
        });
        
        // Strategy 2: Also update any cloned items that Owl Carousel might have created
        setTimeout(function() {
            console.log('🦉 Updating any cloned carousel items...');
            var clonedItems = $('.owl-item .hero__item');
            console.log(`🔍 Found ${clonedItems.length} total items (including clones)`);
            
            clonedItems.each(function(index) {
                var $item = $(this);
                var $span = $item.find('.hero__text span');
                var $h2 = $item.find('.hero__text h2');
                var $btn = $item.find('.hero__text a');
                
                // Determine which slide this is (original index)
                var slideIndex = index % 3; // Assuming 3 original slides
                
                console.log(`🔄 Updating cloned item ${index} (slide ${slideIndex})`);
                
                switch(slideIndex) {
                    case 0:
                        if ($span.length) $span.text(t.heroGreeting);
                        if ($h2.length) $h2.text(t.heroTitle1);
                        if ($btn.length) $btn.text(t.heroBtn1);
                        break;
                    case 1:
                        if ($span.length) $span.text(t.heroSpan2);
                        if ($h2.length) $h2.text(t.heroTitle2);
                        if ($btn.length) $btn.text(t.heroBtn2);
                        break;
                    case 2:
                        if ($span.length) $span.text(t.heroSpan3);
                        if ($h2.length) $h2.text(t.heroTitle3);
                        if ($btn.length) $btn.text(t.heroBtn3);
                        break;
                }
            });
            
            console.log('🎯 All hero items updated (original + clones)');
        }, 50);
        
        
        // Update about section
        $('.services__title .section-title span').text(t.aboutTitle);
        $('.services__title .section-title h2').text(t.aboutSubtitle);
        $('.services__title p').text(t.aboutText);
        $('.services__item h4').each(function(index) {
            switch(index) {
                case 0: $(this).text(t.contactTitle); break;
                case 1: $(this).text(t.skillsTitle); break;
                case 2: $(this).text(t.toolsTitle); break;
            }
        });
        
        // Update skills tooltips
        console.log('🎯 Updating skills tooltips...');
        $('.skill-item').each(function(index) {
            var $item = $(this);
            switch(index) {
                case 0: 
                    $item.attr('data-tooltip', t.tooltip3DModeling);
                    console.log('✅ Updated tooltip 0:', t.tooltip3DModeling);
                    break;
                case 1: 
                    $item.attr('data-tooltip', t.tooltipZBrush);
                    console.log('✅ Updated tooltip 1:', t.tooltipZBrush);
                    break;
                case 2: 
                    $item.attr('data-tooltip', t.tooltipGameDev);
                    console.log('✅ Updated tooltip 2:', t.tooltipGameDev);
                    break;
                case 3: 
                    $item.attr('data-tooltip', t.tooltipTexturing);
                    console.log('✅ Updated tooltip 3:', t.tooltipTexturing);
                    break;
                case 4: 
                    $item.attr('data-tooltip', t.tooltipLevelDesign);
                    console.log('✅ Updated tooltip 4:', t.tooltipLevelDesign);
                    break;
            }
        });
        console.log('🎯 Skills tooltips updated');
        
        // Update counter section
        $('.counter__item__text p').each(function(index) {
            switch(index) {
                case 0: $(this).text(t.counterGames); break;
                case 1: $(this).text(t.counter3D); break;
                case 2: $(this).text(t.counterExp); break;
                case 3: $(this).text(t.counterProjects); break;
            }
        });
        
        // Update CTA section
        $('.callto__text h2').text(t.ctaTitle);
        $('.callto__text p').text(t.ctaSubtitle);
        $('.callto__text a').text(t.ctaButton);
        
        // Update 3D models section
        $('.team__title span').text(t.modelsIntro);
        $('.team__title h2').text(t.modelsTitle);
        $('.team__btn a').text(t.viewPortfolio);
        
        // Update footer safely (without document.write)
        const currentYear = new Date().getFullYear();
        $('.footer__copyright__text').html(`Gabriel Loaeza &copy; <span id="currentYear">${currentYear}</span> ${t.rightsReserved}`);
        console.log('📝 Footer updated safely with year:', currentYear);
        
        // Update language selector for all three options
        let flagSrc, langText;
        $('.language-option').removeClass('active');
        
        switch(lang) {
            case 'es':
                flagSrc = 'img/banderas/spain.svg';
                langText = 'ES';
                $('.language-option[data-lang="es"]').addClass('active');
                break;
            case 'en':
                flagSrc = 'img/banderas/usa.svg';
                langText = 'EN';
                $('.language-option[data-lang="en"]').addClass('active');
                break;
            case 'ja':
                flagSrc = 'img/banderas/japan.svg';
                langText = 'JA';
                $('.language-option[data-lang="ja"]').addClass('active');
                break;
            default:
                flagSrc = 'img/banderas/spain.svg';
                langText = 'ES';
                $('.language-option[data-lang="es"]').addClass('active');
        }
        
        // Update both desktop and mobile selectors
        $('#currentFlag').attr('src', flagSrc);
        $('#currentLang').text(langText);
        $('#currentFlagMobile').attr('src', flagSrc);
        $('#currentLangMobile').text(langText);
        
        // Also update SlickNav mobile language display if it exists
        $('.slicknav_nav .language-toggle .flag-icon').attr('src', flagSrc);
        $('.slicknav_nav .language-toggle .lang-text').text(langText);
        console.log('🎉 Language change completed successfully!');
    }

    // Load saved language on page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    console.log('🚀 Page loaded, saved language:', savedLang);
    
    // Initialize current year safely
    $('#currentYear').text(new Date().getFullYear());
    
    changeLanguage(savedLang);
    
    // Initialize mobile language selector after SlickNav is ready
    setTimeout(function() {
        initializeMobileLanguageSelector();
    }, 500);

    /*------------------
        Language Selector Functions (Moved to end)
    --------------------*/

})(jQuery);