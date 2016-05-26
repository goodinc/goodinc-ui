(function() {

  var projects = document.querySelector('.projects .list');
  if (!projects) return;

  var images = projects.querySelectorAll('li a div[style]');

  // KUDOS: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  function getScrollY() {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  }

  // KUDOS: http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element#answer-11396681
  function getAbsolutePositionY(element) {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = element.getBoundingClientRect();
    return elemRect.top - bodyRect.top;
  }

  var contentTop;
  function updateContentHeight() {
    contentTop = getAbsolutePositionY(projects);
  }

  window.addEventListener('scroll', function() {
    var scrollY = getScrollY();
    for (var index = 0; index < images.length; index++) {
      if (scrollY < contentTop) {
        images[index].style.position = null;
      } else {
        images[index].style.position = "fixed";
      }
    }
  }, false);

  updateContentHeight();

  /* OPTIONAL: Handle slow loading content and and resizing windows.
  ----------------------------------------------- */
  window.addEventListener('load', function() {
    updateContentHeight();
  }, false);

  (function() {
    var throttle;
    window.addEventListener('resize', function() {
      if (throttle) clearTimeout(throttle);
      throttle = setTimeout(function() {
        updateContentHeight();
      }, 100);
    }, false);
  })();

  projects.className += ' scripted';

})();
