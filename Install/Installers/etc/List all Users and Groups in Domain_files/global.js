var _gaq = _gaq || []; 
_gaq.push(['_setAccount', 'UA-3414659-1']);
_gaq.push(['_trackPageview']); 

/*Stretch sidebars to height of content divs*/
$('div.sidebar').css({height: $('div#wrap').height()});

$(document).ready(function() {
	trackCatAndAuthor()	
	siteTakeoverOverlay()
	
  $("#l_optin").click(function() {   $("#optin").slideToggle(500);   return false });
  ord = window.ord || Math.floor(Math.random()*1E16);
	if(!$.cookie('ipop8')) {
		$('#promo').center();
	  $('#dimmer').fadeIn();
		$('#promo').fadeIn('slow');
	}
	
/*Validate Webinar Registration Form*/
$('form#webinar').validate();
$('a.print').click(function() {
        window.print();
        return false;
    });
	
$('form').submit(function() {
	if($(this).attr('form-type') === "Search"){
		_gaq.push(['_trackEvent',$(this).attr('form-type'), $(this).attr('form-location'), $('#q').val()]);
	}
	else{	
	_gaq.push(['_trackEvent',$(this).attr('form-type'), $(this).attr('form-location'), $(this).attr('form-page')]);
	}
});


   (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
  })();

var pathname = window.location.pathname;
/*Do not display overlay on affiliate pages*/
if(pathname != '/forgot_administrator_password.htm'){       
	setupEmailOverlay()
}

   loadKiss();
   /*loadFB();*/
});

/*Track Author and Category Information on pages*/
/*Added 1/2/2013 -- Also track article publish date*/
function trackCatAndAuthor(){	
	_gaq.push(['_trackEvent', 'Category', $('span.authored').attr('data-category'), $('span.authored').attr('data-url')]);
	_gaq.push(['_trackEvent', 'Author', $('span.authored').attr('data-author'), $('span.authored').attr('data-url')]);
	_gaq.push(['_trackEvent', 'Publish Date', $('span.date').text(), $('span.authored').attr('data-url')]);
}

function siteTakeoverOverlay(){
	var overlay = $('div#site-takeover')
	
	var fadeInStyle = $('div#site-takeover').attr('fadeIn');
	var fadeOutStyle = $('div#site-takeover').attr('fadeOut');
	var fadeInDelay = $('div#site-takeover').attr('fadeInDelay');
	var fadeOutDelay = $('div#site-takeover').attr('fadeOutDelay');
	var cookieLength = $('div#site-takeover').attr('cookieLength');
	
	if(fadeInStyle  === undefined) {var fadeInStyle = 'fadeIn';}
	if(fadeOutStyle === undefined) {var fadeOutStyle = 'fadeOut';}
	if(fadeInDelay  === undefined) {var fadeInDelay = '400';}
	if(fadeOutDelay === undefined) {var fadeOutDelay = '400';}
	if(cookieLength === undefined) {var cookieLength = '7';}
 
	if($.cookie('site-takeover') != 'true'){
			if(fadeInStyle === 'fadeIn'){overlay.fadeIn( parseInt(fadeInDelay));}
			if(fadeInStyle === 'slideDown'){overlay.slideDown( parseInt(fadeInDelay));}

			$('a#site-overlay-close').click(function(){
				jQuery.cookie('site-takeover', 'true', { expires: parseInt(cookieLength) })
				if(fadeOutStyle === 'fadeOut'){$('#site-takeover').fadeOut(parseInt(fadeOutDelay))}
				if(fadeOutStyle === 'slideUp'){$('#site-takeover').slideUp(parseInt(fadeOutDelay))}
			});
		}			
}
	
/*Display Email Overlay*/
function setupEmailOverlay() {
	var delay = $('div#overlay').attr('delay');
		if($.cookie('emailOverlay') != 'true'){
		setTimeout(function(){
			var overlay = $('div#overlay, div#overlay-emailSignup-container')
			overlay.fadeIn();
			$('div#overlay-close, a#overlay-close').click(function() {
				overlay.fadeOut();
				})   
			jQuery.cookie('emailOverlay', 'true', { expires: 14 }) 
			},parseInt(delay));
		}
}
// Kiss
function loadKiss() {
     var _kiq = _kiq || [];
     (function(u){
     var s = document.createElement('script'), f = document.getElementsByTagName('script')[0];
     s.type = 'text/javascript'; s.async = true;
     s.src = '//s3.amazonaws.com/j.kissinsights.com/u/' + u + '.js?' + (5*Math.floor(new Date().getMinutes()/5));
     f.parentNode.insertBefore(s, f);
     })('2561/7b2c79f0617c5ad4542775d41c4bcbed37bec155');
}


jQuery.fn.center = function (absolute) {
    return this.each(function () {
        var t = jQuery(this);

        t.css({
            position:   absolute ? 'absolute' : 'fixed',
            left:       '50%',
            top:        '50%',
            zIndex:     '99'
        }).css({
            marginLeft: '-' + (t.outerWidth() / 2) + 'px',
            marginTop:  '-' + (t.outerHeight() / 2) + 'px'
        });

        if (absolute) {
            t.css({
                marginTop:  parseInt(t.css('marginTop'), 10) + jQuery(window).scrollTop(),
                marginLeft: parseInt(t.css('marginLeft'), 10) + jQuery(window).scrollLeft()
            });
        }
    }); 
};

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


function ipop(id) {
     $.cookie(id, '1', { expires: 8 });
     $('#promo').slideToggle(function() {
     $('#dimmer').fadeOut();
     });
}