(function() {

  // Measure the height of the content area (header + main)
  // As the user scrolls down, adjust the page background color opacity between 0 (scrolled all the way up) and 0.3 (scrolled all the way down)


  // KUDOS: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  function getScrollY() {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  }

  var contentHeight;
  function updateContentHeight() {
    contentHeight = document.getElementsByTagName('header')[0].offsetHeight + document.getElementsByTagName('main')[0].offsetHeight;
  }

  function updateBackground() {
    var scrollY = getScrollY();
    var opacity = (scrollY / contentHeight) * 0.3;
    var rgb = '255, 255, 255';

    if (document.body.className.indexOf('tangerine') >= 0) {
      rgb = '255, 80, 26'; /* @tangerine */
    } else if (document.body.className.indexOf('orange') >= 0) { 
      rgb = '249, 132, 12'; /* @orange */
    } else if (document.body.className.indexOf('purple') >= 0) { 
      rgb = '168, 46, 255'; /* @purple */
    } else if (document.body.className.indexOf('blue') >= 0) { 
      rgb = '0, 157, 255'; /* @blue */
    } else if (document.body.className.indexOf('teal') >= 0) { 
      rgb = '48, 217, 101'; /* @teal */
    } else if (document.body.className.indexOf('green') >= 0) { 
      rgb = '48, 217, 101'; /* @green */
    } else if (document.body.className.indexOf('yellow') >= 0) { 
      rgb = '255, 214, 13'; /* @yellow */
    } else if (document.body.className.indexOf('red') >= 0) { 
      rgb = '239, 20, 93'; /* @red */
    }
    document.body.style.backgroundColor = 'rgba(' + rgb + ', ' + opacity + ')';
  }

  updateContentHeight();

  window.addEventListener('scroll', updateBackground, false);


  /* OPTIONAL: Handle slow loading content and and resizing windows.
  ----------------------------------------------- */
  window.addEventListener('load', function() {
    updateContentHeight();
    updateBackground();
  }, false);

  (function() {
    var throttle;
    window.addEventListener('resize', function() {
      if (throttle) clearTimeout(throttle);
      throttle = setTimeout(function() {
        updateContentHeight();
        updateBackground();
      }, 100);
    }, false);
  })();

})();
