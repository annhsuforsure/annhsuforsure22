/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
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

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
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
    if(getUrlVars()){
      if((getUrlVars() == 'en')){
        window.location.href = window.location.href.replace('en', 'tw');
      }
    }else{
      window.location.href = newurl;
    }
  });
  $('#en').click(function(event) {
    var url = window.location.href;
    var newurl = url.split("#")[0].split("?")[0] + '?lng=en' + (url.match("#") ? '#' + url.split("#")[1] : '');
    if(getUrlVars()){
      if((getUrlVars() == 'tw')){
        window.location.href = window.location.href.replace('tw', 'en');
      }
    }else{
      window.location.href = newurl;
    }
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
    link.href = 'file/AnnHsu_Resume_' + getUrlVars() + '.pdf';
    link.target = '_blank';
    link.click();
    document.body.removeChild(link); // remove the link when done
  });

});

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  vars = vars.lng ? (vars.lng.match("#") ? vars.lng.split("#")[0] : vars.lng) : "";
  return vars;
}
