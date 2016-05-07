
/* OPTIONAL: Make the header sticky as you scroll until the content area is in view */

(function() {

  // If we’ve moved past the featured items

  var featuredItems = document.querySelectorAll('.featured-project-list > li');
  var lastFeaturedItem = featuredItems[featuredItems.length - 1];
  var featuredItemsHeight;
  var header = document.querySelector('header');
  var logo = header.querySelector('h2');
  var nav = header.querySelector('.nav');
  var headline = document.querySelector('header[style] + main > h1:first-child');
  var logoOffsetTop;
  var navOffsetTop;
  var headlineOffsetTop;
  var featuredItemTopPositions = [];

  // Switch the header to position absolute
  // Calculate the current position of the header elements and apply them as “top” styles

  // KUDOS: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  function getScrollY() {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  }

  function getAbsolutePositionY(element) {
    if (element.parentNode && element.parentNode.offsetTop) {
      return getAbsolutePositionY(element.parentNode) + element.offsetTop;
    } else {
      return element.offsetTop;
    }
  }

  function updateContentHeight() {
    featuredItemsHeight = getAbsolutePositionY(lastFeaturedItem);
    logo.style.top = null;
    nav.style.top = null;
    headline.style.top = null;
    logoOffsetTop = logo.offsetTop;
    navOffsetTop = nav.offsetTop;
    headlineOffsetTop = headline.offsetTop;

    for (var index = 0; index < featuredItems.length; index++) {
      featuredItemTopPositions[index] = getAbsolutePositionY(featuredItems[index]);
    }
  }

  function updatePositions() {
    var scrollY = getScrollY();
    if (scrollY > featuredItemsHeight) {
      header.className = header.className.replace(/fixed/g, '');
      logo.style.top = (logoOffsetTop + featuredItemsHeight) + 'px';
      nav.style.top = (navOffsetTop + featuredItemsHeight) + 'px';
      headline.style.top = (headlineOffsetTop + featuredItemsHeight) + 'px';
    } else {
      if (header.className.indexOf('fixed') < 0) header.className += ' fixed';
      logo.style.top = null;
      nav.style.top = null;
      headline.style.top = null;
    }
  }

  function updateOpacity() {

    for (var index = 0; index < featuredItems.length; index++) {

      // If the next item is fully visible, show its name
      var itemHeight = featuredItems[index].offsetHeight;
      if (scrollY > featuredItemTopPositions[index] - (itemHeight / 4) && scrollY < featuredItemTopPositions[index] + (itemHeight / 6)) {
        featuredItems[index].className = featuredItems[index].className.replace(/hidden-text/g, '');
        // document.body.className = featuredItems[index].className;

      // Else hide it
      } else { // unless this is the last item
        if (featuredItems[index].className.indexOf('hidden-text') < 0) {
          //featuredItems[index].className += ' hidden-text';
        }
      }

    }

  }

  updateContentHeight();
  updatePositions();
  updateOpacity();

  window.addEventListener('scroll', function() {
    updatePositions();
    updateOpacity();
  }, false);

  /*
  http://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
  (function() {
    var throttle;
    window.addEventListener('scroll', function() {
      if (throttle) clearTimeout(throttle);
      throttle = setTimeout(function() {
        lastFeaturedItem.scrollIntoView({
          behavior: "smooth",
          block:    "end",
        });
        updatePositions();
      }, 100);
    }, false);
  })();
  */

  /* OPTIONAL: Handle slow loading content and and resizing windows.
  ----------------------------------------------- */
  window.addEventListener('load', function() {
    updateContentHeight();
    updatePositions();
    updateOpacity();
  }, false);

  (function() {
    var throttle;
    window.addEventListener('resize', function() {
      if (throttle) clearTimeout(throttle);
      throttle = setTimeout(function() {
        updateContentHeight();
        updatePositions();
        updateOpacity();
      }, 100);
    }, false);
  })();

})();
