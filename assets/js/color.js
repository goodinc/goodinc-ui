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
    var rgb;

    switch (document.body.className) {
      case 'tangerine':
        rgb = '255, 80, 26'; /* @tangerine */
        break;
      case 'orange':
        rgb = '249, 132, 12'; /* @orange */
        break;
      case 'purple':
        rgb = '168, 46, 255'; /* @purple */
        break;
      case 'blue':
        rgb = '0, 157, 255'; /* @blue */
        break;
      case 'teal':
        rgb = '48, 217, 101'; /* @teal */
        break;
      case 'green':
        rgb = '48, 217, 101'; /* @green */
        break;
      case 'yellow':
        rgb = '255, 214, 13'; /* @yellow */
        break;
      case 'red':
        rgb = '239, 20, 93'; /* @red */
        break;
      default:
        rgb = '255, 255, 255';
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