/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {

    /*----------------------------------------------------*/
    /* Smooth Scrolling
    ------------------------------------------------------ */

    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });


    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({

        handler: function(event, direction) {

            var active_section;

            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'

    });


    /*----------------------------------------------------*/
    /*	Make sure that #header-background-image height is
    /* equal to the browser height.
    ------------------------------------------------------ */

    $('header').css({ 'height': $(window).height() });
    $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
    });


    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
    ------------------------------------------------------*/

    $(window).on('scroll', function() {

        var h = $('header').height();
        var y = $(window).scrollTop();
        var nav = $('#nav-wrap');

        if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
            nav.fadeOut('fast');
        } else {
            if (y < h * .20) {
                nav.removeClass('opaque').fadeIn('fast');
            } else {
                nav.addClass('opaque').fadeIn('fast');
            }
        }

    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/

    var portfolioList = [
        { id: "pic005", title: "Notre-Dame Cathedral", city: "Paris", name: "Cathedral" },
        { id: "pic003", title: "Arc de triomphe", city: "Paris", name: "Arc" },
        { id: "pic011", title: "Oxford Circus", city: "London", name: "Underground, Streetsight" },
        { id: "pic016", title: "Runis of St Paul's", city: "Macau", name: "Church" },
        { id: "pic026", title: "Cijin Ferry", city: "Kaohsiung", name: "Ocean, Ferry" },
        { id: "pic027", title: "Cijin Tianhou Temple", city: "Kaohsiung", name: "Temple" },
        { id: "pic030", title: "823 Memorial Park", city: "New Taipei", name: "Park" },
        { id: "pic045", title: "Taxi", city: "New York", name: "Streetsight" },
        { id: "pic046", title: "Empire State Building", city: "New York", name: "Nightview" },
        { id: "pic036", title: "Deer", city: "Dallas", name: "Wildlife, Park" },
        { id: "pic042", title: "Harvard University", city: "Boston", name: "Streetsight" },
        { id: "pic043", title: "Brooklyn Bridge", city: "New York", name: "Brooklyn" },
        { id: "pic047", title: "Expresso", city: "Rome", name: "Coffee" },
        { id: "pic048", title: "Forum Romanum", city: "Rome", name: "architecture" },
        { id: "pic049", title: "Colosseum", city: "Rome", name: "architecture" },
    ];

    var portfolioItem = portfolioList.map(function(i) {
        return '<div class="columns portfolio-item"><div class="item-wrap"><a href="#modal-' + i.id + '" title=""><img alt="" src="images/portfolio/' + i.id + '.jpg"><div class="overlay"><div class="portfolio-item-meta"><h5>' + i.title + '</h5><p>' + i.city + '</p></div></div><div class="link-icon"><i class="icon-plus"></i></div></a></div></div>';
    });
    var modalItem = portfolioList.map(function(i) {
        return '<div id="modal-' + i.id + '" class="popup-modal mfp-hide"><img class="scale-with-grid" src="images/portfolio/modals/' + i.id + '.jpg" alt="" /><div class="description-box"><h4>' + i.title + '</h4><span class="categories"><i class="fa fa-tag"></i>' + i.name + ', ' + i.city + '</span></div><div class="link-box"><a class="popup-modal-dismiss" data-i18n="app.comfirm">Comfirm</a><a class="popup-modal-dismiss" data-i18n="app.close">Close</a></div></div>';
    });
    $('#portfolio-wrapper').append(portfolioItem);
    $('#portfolio-list').append(modalItem);

    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    /*----------------------------------------------------*/
    /*	contact form
    ------------------------------------------------------*/

    $('form#contactForm button.submit').click(function() {

        $('#image-loader').fadeIn();

        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactSubject = $('#contactForm #contactSubject').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
            '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

        $.ajax({

            type: "POST",
            url: "inc/sendEmail.php",
            data: data,
            success: function(msg) {

                // Message was sent
                if (msg == 'OK') {
                    $('#image-loader').fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    $('#image-loader').fadeOut();
                    $('#message-warning').html(msg);
                    $('#message-warning').fadeIn();
                }

            }

        });
        return false;
    });

    /*----------------------------------------------------*/
    /*  dropdown
    ------------------------------------------------------*/

    $('#dropdownMenu').click(function() {
        $(this).parent()[0].className ? $(this).parent().removeClass("show") : $(this).parent().addClass("show");
    });

    $('#tw').click(function(event) {
        var url = window.location.href;
        var newurl = url.split("#")[0].split("?")[0] + '?lng=tw' + (url.match("#") ? '#' + url.split("#")[1] : '');
        window.location.href = newurl;
    });
    $('#en').click(function(event) {
        var url = window.location.href;
        var newurl = url.split("#")[0].split("?")[0] + '?lng=en' + (url.match("#") ? '#' + url.split("#")[1] : '');
        window.location.href = newurl;
    });
    $('.dropdown-item').click(function() {
        $('#dropdownMenu').parent().removeClass("show");
    });

    /*----------------------------------------------------*/
    /*  download
    ------------------------------------------------------*/

    $('#download').click(function() {
        var link = document.createElement('a');
        document.body.appendChild(link); // Firefox requires the link to be in the body
        var index = window.location.href.indexOf('?');
        var lng = index > -1 ? (window.location.href.slice(index + 5, index + 7) == "tw" ? "tw" : "en") : "tw";
        link.href = 'file/AnnHsu_Resume_' + lng + '.pdf';
        link.target = '_blank';
        link.click();
        document.body.removeChild(link); // remove the link when done
    });

});