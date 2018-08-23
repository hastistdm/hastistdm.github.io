'use strict';
/*
[MAIN.js]

[0] Google map init
[1] Declaration of functions
[2] Declaration of variables
[3] Hero header class
[4] Parallax init
[5] Hover 3d init
[6] Accordions init
[7] ImagesLoaded
[8] Progress bars init
[9] Counters init
[10] Modal windows init
[11] Geometry background init
[12] Contact Form init
[13] Navbar init
[14] Gallery init
[15] Parallax init
[16] Background gradient init
[17] YTBvideo init
[18] Swiper init
[19] Form focus init
*/

/* [0] Google map init */
function initMap() {
    let lat_lng = {
        lat: 40.746912,
        lng: -73.984404
    };
    let map = new google.maps.Map(document.getElementById('map'), {
        center: lat_lng,
        zoom: 14,
    });
    let marker = new google.maps.Marker({
        position: lat_lng,
        map: map,
        title: 'Hello!'
    });
}

(function () {
    $(document).ready(function ($) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
        })();
        /* [1] Declaration of functions */

        // Flip Cards
        function sizes_flip_cards(section) {
            let flip_container = section.find('.flip-container');
            let flip_card_img = flip_container.find('img');
            let flip_front = flip_container.find('.front');
            let flip_back = flip_container.find('.back');
            for (let i = 0; i < flip_container.length; i++) {
                let height_img = $(flip_card_img[i]).innerHeight();
                $(flip_container[i]).css('height', height_img);
                $(flip_front[i]).css('height', height_img);
                $(flip_back[i]).css('height', height_img);
            }
        }

        // Counters
        function counters_init(element, count) {
            $(element).waypoint(function () {
                if (!$(element).hasClass("finished_counters")) {
                    let propertiesObj = {};
                    let param = {
                        targets: propertiesObj,
                        easing: 'easeInQuad',
                        round: 1,
                        duration: function (el, i, l) {
                            return 4000 + (i * 300);
                        },
                        update: function () {
                            let el = $(element).find(".prop-obj");
                            let i = 0;
                            for (const prop in propertiesObj) {
                                el[i].innerHTML = JSON.stringify(propertiesObj[prop]);
                                i++;
                            }
                        }
                    }
                    for (let i = 1; i < count + 1; i++) {
                        propertiesObj['prop' + i] = 0;
                        param['prop' + i] = $(element).find(".prop-obj" + i).data("count");
                    }
                    anime(param);
                    $(element).addClass("finished_counters");
                }
            }, {
                offset: '100%'
            });
        }

        // Progress Bars
        function progress_bars_line_init(element, progress) {
            let bar = new ProgressBar.Line(element, {
                strokeWidth: 1,
                easing: 'easeInOut',
                duration: 1400,
                color: color_scheme,
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '4px'},
                text: {
                    style: {},
                    autoStyleContainer: false
                },
                step: (state, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });
            bar.animate(progress);
        }

        // Parallax
        function parallax_init(container) {
            for (let i = 0; i < container.length; i++) {
                let data = $(container[i]).data('src');
                let speed = $(container[i]).data('speed');
                $(container[i]).parallax({
                    imageSrc: data,
                    speed: speed
                });
            }
        }

        // YTB
        function ytbvideo(id) {
            if (youtube_hero.length) {
                $(youtube_hero).YTPlayer({
                    fitToBackground: false,
                    videoId: id,
                    quality: 'hd1080'
                });
            }
        }

        // Isotope Grid
        function isotope_grid_init(handler, button_group) {
            let grid = handler.isotope({
                transitionDuration: '0.6s',
                stagger: 60,
                isOriginLeft: false
            });
            let buttons = $(button_group).find('button');
            button_group.on('click', 'button', function () {
                $(buttons).removeClass('active-button');
                $(this).addClass('active-button');
                let filter_value = $(this).attr('data-filter');
                grid.isotope({
                    filter: filter_value
                });
            });
        }

        // Close Toggle
        function close_toggle(toggle) {
            if (toggle !== 'toolbar') {
                modal_windows.toolbar_slide.hide("slide", {direction: "left"}, 300);
                $(modal_windows_toggle.navbar_toolbar_toggle).removeClass('link-wrapper-active');
            }
            if (toggle !== 'news') {
                modal_windows.news_slide.hide("slide", {direction: "left"}, 300);
                $(modal_windows_toggle.navbar_news_toggle).removeClass('link-wrapper-active');
            }
            if (toggle !== 'shop') {
                modal_windows.shop_slide.hide("slide", {direction: "left"}, 300);
                $(modal_windows_toggle.navbar_shop_toggle).removeClass('link-wrapper-active');
            }
            if (toggle !== 'search') {
                modal_windows.search_slide.hide("slide", {direction: "left"}, 300);
                $(modal_windows_toggle.navbar_search_toggle).removeClass('link-wrapper-active');
            }
        }

        // Navbar
        function navbar() {
            let navbar = $('.navbar')
            let logo_wrapper = $('.logo-wrapper');
            let menu_wrapper = navbar.find('.menu-wrapper');
            let menu_inside = navbar.find('.menu-inside');
            let menu = navbar.find('.menu');
            let navbar_overlay = navbar.find('.navbar-overlay');
            let navbar_footer = navbar.find('.navbar-footer');
            let menu_toggle = navbar.find('.hamburger');
            let menu_item = menu.find('.menu-item-has-children');
            let menu_item_toggle = menu_item.find('.sub-menu-toggle');
            let menu_item_back = menu_item.find('.menu-item-back');
            let sub_menus = menu_item.find('.sub-menu');
            let menu_height = logo_wrapper.outerHeight(true);
            menu.css({
                'height': 'calc(100% - ' + menu_height + 'px)'
            });
            let min_menu_height = menu.outerHeight(true);
            sub_menus.css({
                'min-height': min_menu_height - 1
            });
            menu_inside.niceScroll({
                cursorcolor: "#47362e",
                cursoropacitymin: 0,
                cursoropacitymax: 0.6,
                cursorwidth: "3px",
                cursorborder: 'none',
                cursorborderradius: "2px",
                autohidemode: false,
                zindex: 1000,
            });
            navbar.on('click', function (e) {
                let target = $(e.target);
                while (!$(target).is(this)) {
                    if ($(target).is(menu_toggle)) {
                        $(target).toggleClass('is-active');
                        menu_wrapper.toggleClass('active-wrapper');
                        navbar_overlay.toggleClass('disable-overlay');
                        close_toggle('menu');
                    }
                    if ($(target).is(menu_item_toggle)) {
                        let sub_menu = $(target).siblings();
                        let items = $(target).parent().siblings();
                        $(sub_menu).addClass('active-sub-menu');
                        $(navbar_footer).addClass('hide-navbar-footer');
                        let items_height = $(target).outerHeight(target);
                        for (let i = 0; i < items.length; i++) {
                            items_height = items_height + $(items[i]).outerHeight(target);
                        }
                        sub_menu.css('height', items_height + 1);
                    }
                    if ($(target).is(menu_item_back)) {
                        $(target).parent().removeClass('active-sub-menu');
                        if ($(target).parent().parent().hasClass('primary-item')) {
                            $(navbar_footer).removeClass('hide-navbar-footer');
                        }
                    }
                    if($(target).is(toggles_navbar)){
                        $(target).toggleClass('link-wrapper-active');
                    }
                    target = $(target).parent();
                }
            });
        }

        // Modal Init
        function modal_init(toggle, slide_window, active_toggle, full_height) {
            function check() {
                if ($(toggle).length) {
                    let toggle_index = count_toggles - ($(toggle).index() + 1) + 1;
                    let offset = toggle.position();
                    let bottom_position = VIEWPORT.h - offset.top;
                    if (full_height) {
                        slide_window.css({
                            'bottom': bottom_position - (navbar_width * toggle_index),
                            'min-height': ((toggles_navbar.outerHeight(true)) * count_toggles) + 1
                        });
                    } else {
                        slide_window.css({
                            'bottom': bottom_position - navbar_width,
                        });
                    }
                }
            }
            $(COMMON.win).resize(function () {
                check();
            });
            check();
            $(toggle).on('click', function () {
                close_toggle(active_toggle);
                slide_window.css('z-index', '900');
                if ($('.active-slide').length && !$(this).hasClass('active-slide')) {
                    slide_window.delay(350).toggle("slide", {direction: "left"}, 350);
                    $(toggles_navbar).removeClass('active-slide');
                } else {
                    slide_window.toggle("slide", {direction: "left"}, 350);
                }
                $(this).toggleClass('active-slide');
            });
        }

        // Swiper Init
        function swiper_init() {
            let swiper_team_multiple = '.swiper-team-multiple';
            let swiper_clients_multiple = '.swiper-clients-multiple';
            let swiper_team = '.team-slider';
            let swiper_portfolio = '.swiper-portfolio';
            let swiper_gallery = '.swiper-gallery';
            let swiper_testimonials = '.testimonials-slider';
            let team = new Swiper(swiper_team, {
                pagination: {
                    el: '.swiper-team-pagination',
                    type: 'fraction',
                },
                navigation: {
                    nextEl: '.swiper-team-button-next',
                    prevEl: '.swiper-team-button-prev',
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
            });
            let team_multiple = new Swiper(swiper_team_multiple, {
                slidesPerView: 3,
                spaceBetween: 15,
                loop: true,
                pagination: {
                    el: '.swiper-pagination-multiple',
                    clickable: true,
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                breakpoints: {
                    992: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                }
            });
            let portfolio = new Swiper(swiper_portfolio, {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next-portfolio',
                    prevEl: '.swiper-button-prev-portfolio',
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true
                },
            });
            let gallery = new Swiper(swiper_gallery, {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next-portfolio',
                    prevEl: '.swiper-button-prev-portfolio',
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true
                },
            });
            let testimonials = new Swiper(swiper_testimonials, {
                slidesPerView: 3,
                spaceBetween: 30,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                breakpoints: {
                    992: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                }
            });
            let clients_multiple = new Swiper(swiper_clients_multiple, {
                slidesPerView: 5,
                spaceBetween: 15,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    576: {
                        slidesPerView: 1,
                    }
                }
            });
        }

        // Gallery Init
        function gallery_init(gallery) {
            gallery.magnificPopup({
                delegate: '.image-item',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                fixedContentPos: false,
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function (item) {
                        return item.el.attr('title');
                    }
                },
            });
        }

        // Form Focus
        function form_focus() {
            let form_div = $('.form-div');
            form_div.on('click', function () {
                form_div.removeClass('form-div-focus');
                $(this).addClass('form-div-focus');
            });
        }

        // Ajax Contact Init
        function ajax_contact_init() {
            $(form).submit(function (e) {
                e.preventDefault();
                let form_data = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url: "mailer.php",
                    data: form_data,
                    success: function () {
                        alert("Your message send");
                    }
                });
            });
        }

        // Geometry Background
        function geometry_background() {
            let canvas = document.querySelector('.canvas-geometry-background');
            if (canvas !== null) {
                let ctx = canvas.getContext('2d');
                let resize = function () {
                    canvas.width = canvas.clientWidth;
                    canvas.height = canvas.clientHeight;
                };
                window.addEventListener('resize', resize);
                resize();
                let elements = [];
                let presets = {};
                presets.o = function (x, y, s, dx, dy) {
                    return {
                        x: x,
                        y: y,
                        r: 12 * s,
                        w: 5 * s,
                        dx: dx,
                        dy: dy,
                        draw: function (ctx, t) {
                            this.x += this.dx;
                            this.y += this.dy;

                            ctx.beginPath();
                            ctx.arc(this.x + +Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + +Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
                            ctx.lineWidth = this.w;
                            ctx.strokeStyle = color_scheme;
                            ctx.stroke();
                        }
                    }
                };
                presets.x = function (x, y, s, dx, dy, dr, r) {
                    r = r || 0;
                    return {
                        x: x,
                        y: y,
                        s: 20 * s,
                        w: 5 * s,
                        r: r,
                        dx: dx,
                        dy: dy,
                        dr: dr,
                        draw: function (ctx, t) {
                            this.x += this.dx;
                            this.y += this.dy;
                            this.r += this.dr;

                            let _this = this;
                            let line = function (x, y, tx, ty, c, o) {
                                o = o || 0;
                                ctx.beginPath();
                                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                                ctx.lineWidth = _this.w;
                                ctx.strokeStyle = c;
                                ctx.stroke();
                            };

                            ctx.save();

                            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
                            ctx.rotate(this.r * Math.PI / 180);

                            line(-1, -1, 1, 1, color_scheme);
                            line(1, -1, -1, 1, color_scheme);

                            ctx.restore();
                        }
                    }
                };
                for (let x = 0; x < canvas.width; x++) {
                    for (let y = 0; y < canvas.height; y++) {
                        if (Math.round(Math.random() * 8000) === 1) {
                            let s = ((Math.random() * 5) + 1) / 10;
                            if (Math.round(Math.random()) === 1)
                                elements.push(presets.o(x, y, s, 0, 0));
                            else
                                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
                        }
                    }
                }
                setInterval(function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let time = new Date().getTime();
                    for (let e in elements)
                        elements[e].draw(ctx, time);
                }, 10);
            }
        }

        // Background Gradient
        function background_gradient(container) {
            let colors = [
                [36, 77, 140],
                [27, 71, 142],
                [96, 70, 170],
                [20, 75, 160],
                [70, 90, 170],
                [140, 75, 160]
            ];
            let step = 0;
            let colorIndices = [0, 1, 2, 3];
            let gradientSpeed = 0.001;

            function updateGradient() {
                if ($ === undefined) return;
                let c0_0 = colors[colorIndices[0]];
                let c0_1 = colors[colorIndices[1]];
                let c1_0 = colors[colorIndices[2]];
                let c1_1 = colors[colorIndices[3]];
                let istep = 1 - step;
                let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
                let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
                container.css({
                    background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
                }).css({
                    background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
                });
                step += gradientSpeed;
                if (step >= 1) {
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];
                    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                }
            }

            setInterval(updateGradient, 10);
        }

        // Tab init
        (function (defaults, $, window, document, undefined) {
            'use strict';
            $.extend({
                tabifySetup: function (options) {
                    return $.extend(defaults, options);
                }
            }).fn.extend({
                tabify: function (options) {
                    options = $.extend({}, defaults, options);
                    return $(this).each(function () {
                        let $element, tabHTML, $tabs, $sections;

                        $element = $(this);
                        $sections = $element.children();
                        tabHTML = '<ul class="tab-nav">';
                        $sections.each(function () {
                            if ($(this).attr("title") && $(this).attr("id")) {
                                tabHTML += '<li><a href="#' + $(this).attr("id") + '">' + $(this).attr("title") + '</a></li>';
                            }
                        });
                        tabHTML += '</ul>';
                        $element.prepend(tabHTML);
                        $tabs = $element.find('.tab-nav li');
                        let activateTab = function (id) {
                            $tabs.filter('.active').removeClass('active');
                            $sections.filter('.active').removeClass('active');
                            $tabs.has('a[href="' + id + '"]').addClass('active');
                            $sections.filter(id).addClass('active');
                        };
                        $tabs.on('click', function (e) {
                            activateTab($(this).find('a').attr('href'));
                            e.preventDefault();
                        });
                        activateTab($tabs.first().find('a').attr('href'));
                    });
                }
            });
        })({
            property: "value",
            otherProperty: "value"
        }, jQuery, window, document);
        $('.tab-group').tabify();

        /* [2] Declaration of variables */
        // General variables
        const COMMON = {
            win: window,
            doc: document,
            body: $('body'),
        };
        const VIEWPORT = {
            w: COMMON.win.innerWidth,
            h: COMMON.win.innerHeight
        };
        $(COMMON.win).resize(function () {
            VIEWPORT.w = COMMON.win.innerWidth;
            VIEWPORT.h = COMMON.win.innerHeight;
        });
        // Root
        const root = COMMON.doc.querySelector(':root');
        // Youtube hero header
        let youtube_hero = $('.hero-video');
        // Isotope grid
        let isotope_grid = $('.grid-isotope');
        // Button group
        let button_group = $('.button-group-default');
        // Mobile breakpoint
        let mobile_point = 768;
        // 3d hover wrapper
        let hover3d = $('.hover3d-wrapper');
        // Hero header
        let hero_header = $('.hero-header');
        // Preloader
        let loader = $('.loader');
        // Color scheme
        let color_scheme = '#7E57C2';
        // Navbar width
        let navbar_width = 60;
        // Modal windows
        let modal_windows = {
            menu_slide: $('.menu-slide'),
            news_slide: $('.news-slide'),
            shop_slide: $('.shop-slide'),
            search_slide: $('.search-slide'),
            toolbar_slide: $('.toolbar-slide'),
        };
        let modal_windows_toggle = {
            navbar_toolbar_toggle: $('#navbar-toolbar'),
            navbar_news_toggle: $('#navbar-news'),
            navbar_shop_toggle: $('#navbar-shop'),
            navbar_search_toggle: $('#navbar-search'),
        };
        let count_toggles = Object.keys(modal_windows_toggle).length;
        let toggles_navbar = $('.additional-wrapper .link-wrapper');
        // Parallax background
        let parallax_background = $('.parallax-window');
        // Gallery
        let gallery = $('.popup-gallery');
        // Hero type
        let hero_type = hero_header.data('section-type');
        // Progress bar
        let progress_bar = '.progress-bar-box';
        // Progress check
        let progress_check = true;
        // Contact Form
        let form = $('#ajax-contact');
        // Progress bar count
        let progress_bar_count = $(progress_bar).length;
        // Counters wrapper
        let counters_wrapper = $('.counters-wrapper');
        // Flip cards
        let flip_section = $('.flip-section');
        // Background gradient
        let bg_gradient = $('.background_gradient');
        // Accordion
        let accordions = document.getElementsByClassName("accordions");

        /* [3] Hero header class */
        class HERO {
            // Constructor
            constructor() {
                this.canvas = COMMON.doc.getElementById('canvas-hero');
                this.canvas_header = $('#canvas-parent');
                this.canvas_width = COMMON.win.innerWidth;
                this.canvas_height = this.canvas_header.height();
                this.particles_wrapper = 'canvas-parent';
                this.wrapper_slider = '.swiper-hero';
            }

            // Particles snow
            _particles_snow_header() {
                let circles, target, animateHeader = true;
                let canvas = this.canvas;
                let width = this.canvas_width;
                let height = this.canvas_height;
                let canvas_header = this.canvas_header;
                let ctx = this.canvas.getContext('2d');

                initHeader();
                addListeners();

                function initHeader() {
                    canvas.width = width;
                    canvas.height = height;
                    target = {x: 0, y: height};
                    canvas_header.css({
                        'height': height + 'px'
                    });
                    circles = [];
                    for (let x = 0; x < width * 0.5; x++) {
                        let c = new Circle();
                        circles.push(c);
                    }
                    animate();
                }

                function addListeners() {
                    COMMON.win.addEventListener('scroll', scrollCheck);
                    COMMON.win.addEventListener('resize', resize);
                }

                function scrollCheck() {
                    if (COMMON.doc.body.scrollTop > height) animateHeader = false;
                    else animateHeader = true;
                }

                function resize() {
                    width = COMMON.win.innerWidth;
                    height = COMMON.win.innerHeight;
                    canvas_header.css({
                        'height': height + 'px'
                    });
                    canvas.width = width;
                    canvas.height = height;
                }

                function animate() {
                    if (animateHeader) {
                        ctx.clearRect(0, 0, width, height);
                        for (let i in circles) {
                            circles[i].draw();
                        }
                    }
                    requestAnimationFrame(animate);
                }


                function Circle() {
                    let $this = this;

                    (function () {
                        $this.pos = {};
                        init();
                    })();

                    function init() {
                        $this.pos.x = Math.random() * width;
                        $this.pos.y = height + Math.random() * 100;
                        $this.alpha = 0.1 + Math.random() * 0.4;
                        $this.scale = 0.1 + Math.random() * 0.3;
                        $this.velocity = Math.random();
                    }

                    this.draw = function () {
                        if ($this.alpha <= 0) {
                            init();
                        }
                        $this.pos.y -= $this.velocity;
                        $this.alpha -= 0.0003;
                        ctx.beginPath();
                        ctx.arc($this.pos.x, $this.pos.y, $this.scale * 10, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(255,255,255,' + $this.alpha + ')';
                        ctx.fill();
                    };
                }
            }

            // Particles default
            _particles_default_header() {
                const json = {
                    "particles": {
                        "number": {
                            "value": 200,
                            "density": {
                                "enable": true,
                                "value_area": 1200
                            }
                        },
                        "color": {
                            "value": '#448cc4'
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#448cc4"
                            },
                            "polygon": {
                                "nb_sides": 3
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 1,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 5,
                                "opacity_min": 0.5,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 10,
                                "size_min": 0.2,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 100,
                            "color": "#448cc4",
                            "opacity": 0.5,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 3,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "bounce",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 500,
                                "rotateY": 1000
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": false,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 150,
                                "duration": 0.1
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true
                }
                particlesJS(this.particles_wrapper, json);
            }

            // Particles connect
            _particles_connect_header() {
                let points;
                let animateHeader = true;
                let width = this.canvas_width;
                let height = this.canvas_height;
                let target = {x: width / 2, y: height / 2};
                let canvas = this.canvas;
                let ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                initHeader();
                initAnimation();
                addListeners();

                function initHeader() {
                    points = [];
                    for (let x = 0; x < width; x = x + width / 20) {
                        for (let y = 0; y < height; y = y + height / 20) {
                            let px = x + Math.random() * width / 20;
                            let py = y + Math.random() * height / 20;
                            let p = {x: px, originX: px, y: py, originY: py};
                            points.push(p);
                        }
                    }
                    for (let i = 0; i < points.length; i++) {
                        let closest = [];
                        let p1 = points[i];
                        for (let j = 0; j < points.length; j++) {
                            let p2 = points[j]
                            if (!(p1 === p2)) {
                                let placed = false;
                                for (let k = 0; k < 5; k++) {
                                    if (!placed) {
                                        if (closest[k] === undefined) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }

                                for (let k = 0; k < 5; k++) {
                                    if (!placed) {
                                        if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }
                            }
                        }
                        p1.closest = closest;
                    }
                    for (let i in points) {
                        let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
                        points[i].circle = c;
                    }
                }

                function addListeners() {
                    if (!('ontouchstart' in COMMON.win)) {
                        COMMON.win.addEventListener('mousemove', mouseMove);
                    }
                    COMMON.win.addEventListener('scroll', scrollCheck);
                    COMMON.win.addEventListener('resize', resize);
                }

                function mouseMove(e) {
                    let posx = 0;
                    let posy = 0;
                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    }
                    else if (e.clientX || e.clientY) {
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    target.x = posx;
                    target.y = posy;
                }

                function scrollCheck() {
                    if (document.body.scrollTop > height) animateHeader = false;
                    else animateHeader = true;
                }

                function resize() {
                    width = COMMON.win.innerWidth;
                    height = COMMON.win.innerHeight;
                    canvas.width = width;
                    canvas.height = height;
                }

                function initAnimation() {
                    animate();
                    for (let i in points) {
                        shiftPoint(points[i]);
                    }
                }

                function animate() {
                    if (animateHeader) {
                        ctx.clearRect(0, 0, width, height);
                        for (let i in points) {
                            if (Math.abs(getDistance(target, points[i])) < 4000) {
                                points[i].active = 0.3;
                                points[i].circle.active = 0.6;
                            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                                points[i].active = 0.1;
                                points[i].circle.active = 0.3;
                            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                                points[i].active = 0.02;
                                points[i].circle.active = 0.1;
                            } else {
                                points[i].active = 0;
                                points[i].circle.active = 0;
                            }

                            drawLines(points[i]);
                            points[i].circle.draw();
                        }
                    }
                    requestAnimationFrame(animate);
                }

                function shiftPoint(p) {
                    TweenLite.to(p, 1 + 1 * Math.random(), {
                        x: p.originX - 50 + Math.random() * 100,
                        y: p.originY - 50 + Math.random() * 100, ease: Circ.easeInOut,
                        onComplete: function () {
                            shiftPoint(p);
                        }
                    });
                }

                function drawLines(p) {
                    if (!p.active) return;
                    for (let i in p.closest) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.closest[i].x, p.closest[i].y);
                        ctx.strokeStyle = 'rgba(180,60,180,' + p.active + ')';
                        ctx.stroke();
                    }
                }

                function Circle(pos, rad, color) {
                    let _this = this;

                    (function () {
                        _this.pos = pos || null;
                        _this.radius = rad || null;
                        _this.color = color || null;
                    })();

                    this.draw = function () {
                        if (!_this.active) return;
                        ctx.beginPath();
                        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(180,60,180,' + _this.active + ')';
                        ctx.fill();
                    };
                }

                function getDistance(p1, p2) {
                    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
                }
            }

            // Particles moving
            _particles_moving_header() {
                function Star(id, x, y) {
                    this.id = id;
                    this.x = x;
                    this.y = y;
                    this.r = Math.floor(Math.random() * 2) + 1;
                    let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
                    this.color = "rgba(255,255,255," + alpha + ")";
                }

                Star.prototype.draw = function () {
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = this.r * 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                };
                Star.prototype.move = function () {
                    this.y -= .15 + params.backgroundSpeed / 100;
                    if (this.y <= -10) this.y = height + 10;
                    this.draw();
                };

                function Dot(id, x, y, r) {
                    this.id = id;
                    this.x = x;
                    this.y = y;
                    this.r = Math.floor(Math.random() * 5) + 1;
                    this.maxLinks = 2;
                    this.speed = .5;
                    this.a = .7;
                    this.aReduction = .005;
                    this.color = "rgba(68,140,196," + this.a + ")";
                    this.linkColor = "rgba(68,140,196," + this.a / 4 + ")";

                    this.dir = Math.floor(Math.random() * 140) + 200;
                }

                Dot.prototype.draw = function () {
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = this.r * 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                };
                Dot.prototype.link = function () {
                    if (this.id === 0) return;
                    let previousDot1 = getPreviousDot(this.id, 1);
                    let previousDot2 = getPreviousDot(this.id, 2);
                    let previousDot3 = getPreviousDot(this.id, 3);
                    if (!previousDot1) return;
                    ctx.strokeStyle = this.linkColor;
                    ctx.moveTo(previousDot1.x, previousDot1.y);
                    ctx.beginPath();
                    ctx.lineTo(this.x, this.y);
                    if (previousDot2 !== false) ctx.lineTo(previousDot2.x, previousDot2.y);
                    if (previousDot3 !== false) ctx.lineTo(previousDot3.x, previousDot3.y);
                    ctx.stroke();
                    ctx.closePath();
                };

                function getPreviousDot(id, stepback) {
                    if (id === 0 || id - stepback < 0) return false;
                    if (typeof dots[id - stepback] !== "undefined") return dots[id - stepback];
                    else return false;
                }

                Dot.prototype.move = function () {
                    this.a -= this.aReduction;
                    if (this.a <= 0) {
                        this.die();
                        return
                    }
                    this.color = "rgba(68,140,196," + this.a + ")";
                    this.linkColor = "rgba(68,140,196," + this.a / 6 + ")";
                    this.x = this.x + Math.cos(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100),
                        this.y = this.y + Math.sin(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);

                    this.draw();
                    this.link();
                };
                Dot.prototype.die = function () {
                    dots[this.id] = null;
                    delete dots[this.id];
                };
                let canvas = this.canvas;
                let ctx = canvas.getContext('2d');
                let width = this.canvas_width;
                let height = this.canvas_height;
                let mouseMoving = false;
                let mouseMoveChecker;
                let mouseX;
                let mouseY;
                let stars = [];
                let initStarsPopulation = 80;
                let dots = [];
                let dotsMinDist = 2;
                let params = {
                    maxDistFromCursor: 50,
                    dotsSpeed: 0,
                    backgroundSpeed: 0
                };
                setCanvasSize();
                init();

                function setCanvasSize() {
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                }

                function init() {
                    ctx.strokeStyle = "#222";
                    ctx.shadowColor = "#222";
                    for (let i = 0; i < initStarsPopulation; i++) {
                        stars[i] = new Star(i, Math.floor(Math.random() * width), Math.floor(Math.random() * height));
                        stars[i].draw();
                    }
                    ctx.shadowBlur = 0;
                    animate();
                }

                function animate() {
                    ctx.clearRect(0, 0, width, height);

                    for (let i in stars) {
                        stars[i].move();
                    }
                    for (let i in dots) {
                        dots[i].move();
                    }
                    drawIfMouseMoving();
                    requestAnimationFrame(animate);
                }

                COMMON.win.onmousemove = function (e) {
                    mouseMoving = true;
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    clearInterval(mouseMoveChecker);
                    mouseMoveChecker = setTimeout(function () {
                        mouseMoving = false;
                    }, 100);
                };

                function drawIfMouseMoving() {
                    if (!mouseMoving) return;
                    if (dots.length === 0) {
                        dots[0] = new Dot(0, mouseX, mouseY);
                        dots[0].draw();
                        return;
                    }
                    let previousDot = getPreviousDot(dots.length, 1);
                    let prevX = previousDot.x;
                    let prevY = previousDot.y;
                    let diffX = Math.abs(prevX - mouseX);
                    let diffY = Math.abs(prevY - mouseY);
                    if (diffX < dotsMinDist || diffY < dotsMinDist) return;
                    let xVariation = Math.random() > .5 ? -1 : 1;
                    xVariation = xVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
                    let yVariation = Math.random() > .5 ? -1 : 1;
                    yVariation = yVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
                    dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
                    dots[dots.length - 1].draw();
                    dots[dots.length - 1].link();
                }

                function degToRad(deg) {
                    return deg * (Math.PI / 180);
                }

            }

            // Default Swiper
            _swiper_default_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    pagination: {
                        el: '.swiper-hero-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                    },
                });
            }

            // Vertical Swiper
            _swiper_vertical_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    direction: 'vertical',
                    loop: true,
                    speed: 600,
                    pagination: {
                        el: '.swiper-hero-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                    },
                });
            }

            // Cube Swiper
            _swiper_cube_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    effect: 'cube',
                    cubeEffect: {
                        shadow: true,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-hero-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                    },
                });
            }

            // Fade Swiper
            _swiper_fade_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    effect: 'fade',
                    cubeEffect: {
                        shadow: true,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-hero-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                    },
                });
            }

            // Coverflow Swiper
            _swiper_coverflow_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    effect: 'coverflow',
                    centeredSlides: true,
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },
                    pagination: {
                        el: '.swiper-hero-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                    },
                });
            }

            // Flip Swiper
            _swiper_flip_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    speed: 600,
                    loop: true,
                    effect: 'flip',
                    flipEffect: {
                        rotate: 30,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-hero-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                    },
                });
            }

            // Init
            INIT(hero_type) {
                switch (hero_type) {
                    case 'canvas_snow' :
                        this._particles_snow_header();
                        break;
                    case 'canvas_default_particles' :
                        this._particles_default_header();
                        break;
                    case 'canvas_connect_particles' :
                        this._particles_connect_header();
                        break;
                    case 'canvas_moving_particles' :
                        this._particles_moving_header();
                        break;
                    case 'slider_default' :
                        this._swiper_default_header();
                        break;
                    case 'slider_vertical' :
                        this._swiper_vertical_header();
                        break;
                    case 'slider_cube' :
                        this._swiper_cube_header();
                        break;
                    case 'slider_fade' :
                        this._swiper_fade_header();
                        break;
                    case 'slider_coverflow' :
                        this._swiper_coverflow_header();
                        break;
                    case 'slider_flip' :
                        this._swiper_flip_header();
                        break;
                }
            }
        }

        const HERO_HEADER = new HERO();
        HERO_HEADER.INIT(hero_type);

        /* DEMO ONLY START */
        class TOOLBAR {
            constructor() {
                this.toolbar = $('.toolbar');
                this.color_scheme_wrapper = this.toolbar.find('.toolbar-color-scheme');
                this.jscolorbutton = $('.jscolor');
            }

            color_scheme() {
                let color = color_scheme;
                let color_btn = this.color_scheme_wrapper.find('.scheme-box');
                let picker_color;
                let jscolorbutton = this.jscolorbutton;

                function setColor() {
                    requestAnimationFrame(setColor);
                    let color_picker_wrap = $('.color-picker-wrap');
                    if (color_picker_wrap.length) {
                        picker_color = jscolorbutton.css('background-color');
                        root.style.setProperty('--primary-color', picker_color);
                        console.log(1)
                    }
                }

                setColor();
                for (let i = 0; i < color_btn.length; i++) {
                    $(color_btn[i]).css('background-color', $(color_btn[i]).data('color-scheme'));
                }
                color_btn.on('click', function () {
                    color = $(this).data('color-scheme');
                    root.style.setProperty('--primary-color', color);
                    let svg = $('.progress-bars-wrapper svg');
                    let path = $(svg).find('path:eq(-1)');
                    path.attr('stroke', color);
                });

            }

            INIT() {
                this.color_scheme();
            }
        }

        const DEMO = new TOOLBAR();
        DEMO.INIT();
        /* DEMO ONLY END */

        /* [4] Parallax init */
        let scene = document.querySelector('.parallax-scene');
        if (scene !== null) {
            let parallaxInstance = new Parallax(scene);
        }
        /* [5] Hover 3d init */
        if (VIEWPORT.w >= mobile_point) {
            if (hover3d.length) {
                $(hover3d).hover3d({
                    selector: ".hover3d-child"
                });
            }
        }
        /* [6] Accordions init */
        const ACCORDION = {
            settings: {
                first_expanded: false,
                toggle: false
            },
            openAccordion: function (toggle, content) {
                if (content.children.length) {
                    toggle.classList.add("is-open");
                    let final_height = Math.floor(content.children[0].offsetHeight);
                    content.style.height = final_height + "px";
                    $(COMMON.win).resize(function () {
                        let final_height = Math.floor(content.children[0].offsetHeight);
                        content.style.height = final_height + "px";
                    });
                }
            },
            closeAccordion: function (toggle, content) {
                toggle.classList.remove("is-open");
                content.style.height = 0;
                $(COMMON.win).resize(function () {
                    toggle.classList.remove("is-open");
                    content.style.height = 0;
                });
            },
            init: function (el) {
                const $this = this;
                let is_first_expanded = $this.settings.first_expanded;
                if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
                let is_toggle = $this.settings.toggle;
                if (el.classList.contains("is-toggle")) is_toggle = true;
                const sections = el.getElementsByClassName("accordion");
                const all_toggles = el.getElementsByClassName("accordion-head");
                const all_contents = el.getElementsByClassName("accordion-body");
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const toggle = all_toggles[i];
                    const content = all_contents[i];
                    toggle.addEventListener("click", function (e) {
                        if (!is_toggle) {
                            for (let a = 0; a < all_contents.length; a++) {
                                $this.closeAccordion(all_toggles[a], all_contents[a]);
                            }
                            $this.openAccordion(toggle, content);
                        } else {
                            if (toggle.classList.contains("is-open")) {
                                $this.closeAccordion(toggle, content);
                            } else {
                                $this.openAccordion(toggle, content);
                            }
                        }
                    });
                    if (i === 0 && is_first_expanded) {
                        $this.openAccordion(toggle, content);
                    }
                }
            }
        };
        /* [7] ImagesLoaded */
        $(COMMON.body).imagesLoaded({background: '.bg_img'}, function () {
            isotope_grid_init(isotope_grid, button_group);
            loader.addClass('off-loader');
            AOS.init();
            sizes_flip_cards(flip_section);
            for (let i = 0; i < accordions.length; i++) {
                ACCORDION.init(accordions[i]);
            }
            $(COMMON.win).resize(function () {
                sizes_flip_cards(flip_section);
            });
        });
        /* [8] Progress bars init */
        $(progress_bar).waypoint(() => {
            if (progress_check) {
                progress_check = false;
                if (progress_bar_count > 0) {
                    for (let i = 1; i < progress_bar_count + 1; i++) {
                        let progress = $(progress_bar + i).data('progress');
                        progress_bars_line_init(progress_bar + i, progress);
                    }
                }
            }
        }, {offset: '100%'});
        /* [9] Counters init */
        if (counters_wrapper.length) {
            for (let i = 0; i < counters_wrapper.length; i++) {
                let count = $(counters_wrapper[i]).find('.counter-box').length;
                counters_init(counters_wrapper[i], count);
            }
        }
        /* [10] Modal windows init */
        modal_init(modal_windows_toggle.navbar_toolbar_toggle, modal_windows.toolbar_slide, 'toolbar', true);
        modal_init(modal_windows_toggle.navbar_news_toggle, modal_windows.news_slide, 'news', true);
        modal_init(modal_windows_toggle.navbar_shop_toggle, modal_windows.shop_slide, 'shop', true);
        modal_init(modal_windows_toggle.navbar_search_toggle, modal_windows.search_slide, 'search', false);
        /* [11] Geometry background init */
        geometry_background();
        /* [12] Contact Form init */
        ajax_contact_init();
        /* [13] Navbar init */
        navbar();
        /* [14] Gallery init */
        gallery_init(gallery);
        /* [15] Parallax init */
        parallax_init(parallax_background);
        /* [16] Background gradient init */
        background_gradient(bg_gradient);
        /* [17] YTBvideo init */
        ytbvideo('iGpuQ0ioPrM');
        /* [18] Swiper init */
        swiper_init();
        /* [19] Form focus init */
        form_focus();

        //DEMO
        $(".anchor-link").on("click", function (event) {
            event.preventDefault();

            let id = $(this).attr('href'),

                top = $(id).offset().top;

            $('body,html').animate({scrollTop: top}, 1500);
        });
    });
})();
