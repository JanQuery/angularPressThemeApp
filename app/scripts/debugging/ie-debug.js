/* Credit: 
    Mario
    https://codepen.io/gapcode/
*/

// Get IE or Edge browser version
var version = detectIE();

if (version === false) {
  // DO Nothing
} else if (version >= 12) {
  
    parallaxChoppingSolution();
  
} else {
    
    parallaxChoppingSolution();
}


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

/* Credit: 
    Ravi Sagar 
    http://stackoverflow.com/questions/18563802/chrome-and-ie-parallax-jquery-animate-is-not-smooth-when-using-mouse-wheel-to
*/


// fix parallax chopping issue

function parallaxChoppingSolution(){

    if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
    window.onmousewheel = document.onmousewheel = wheel;

    var time = 1000;
    var distance = 300;

    function wheel(event) {
        if (event.wheelDelta) delta = event.wheelDelta / 120;
        else if (event.detail) delta = -event.detail / 3;

        handle();
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
    }
    
            

    function handle() {
        
        //detect if sidenav is open
       if ($('#sidenav-overlay').length > 0) {
            var scrollme = '#side-nav';
        } else {
            var scrollme = 'html, body';
        }


        $(scrollme).stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time);
    }


    $(document).keydown(function (e) {

        switch (e.which) {
            //up
        case 38:
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() - distance
            }, time);
            break;

            //down
        case 40:
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() + distance
            }, time);
            break;
        }
    });
}