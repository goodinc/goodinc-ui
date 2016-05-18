
/* OPTIONAL: Make the numbers count up. */
(function() {
  if (!CountUp) return;

  var numbersContainer = document.querySelector('.statistics');

  if (!numbersContainer) return;

  var numbers = numbersContainer.querySelectorAll('span[data-value]');

  if (numbers.length <= 0) return;

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

  function isVisible(element, elementTop, windowTop) {
    var elementBottom = elementTop + element.offsetHeight;
    var windowBottom  = windowTop  + window.innerHeight;

    // If the top edge of the window is greater than the top edge of the target
    if ((elementTop > windowTop && elementTop < windowBottom) || (elementBottom > windowTop && elementBottom < windowBottom)) {
      return true;
    } else {
      return false;
    }
  }

  var numbersContainerTop;
  function updatePositions() {
    numbersContainerTop = getAbsolutePositionY(numbersContainer);
  }

  function numbersAreVisible() {
    var scrollY = getScrollY();
    if (isVisible(numbersContainer, numbersContainerTop, scrollY)) {
      return true;
    }
  }

  function updateNumbers() {
    // https://inorganik.github.io/countUp.js

    var startValue = 0;
    var duration = 2.5;
    var decimals = 0;
    for (var index = 0; index < numbers.length; index++) {
      (function() {
        var endValue = Number(numbers[index].getAttribute('data-value'));

        var options = {
          useEasing : true, 
          useGrouping : true
        };

        if (numbers[index].getAttribute('data-decimal-places')) {
          options.decimals = Number(numbers[index].getAttribute('data-decimal-places'));
        }

        // If the end value is large, tweak the animation so it doesn’t stop suddenly (recommended by the CountUp author).
        if (endValue > 1000) {
          var animation = new CountUp(numbers[index], startValue, endValue - 100, decimals, duration / 2, options);
          animation.start(function() {
            animation.update(endValue);
          });
        } else {
          var animation = new CountUp(numbers[index], startValue, endValue, decimals, duration, options);
          animation.start();
        }
      })();
    }
  }

  var numbersUpdated;
  function updateIfVisible() {
    if (numbersUpdated) return;
    if (numbersAreVisible()) {
      updateNumbers();
      numbersUpdated = true;
    }
  }

  updatePositions();

  window.addEventListener('scroll', updateIfVisible, false);

  /* OPTIONAL: Handle slow loading content and and resizing windows.
  ----------------------------------------------- */
  window.addEventListener('load', function() {
    updatePositions();
    updateIfVisible();
  }, false);

  (function() {
    var throttle;
    window.addEventListener('resize', function() {
      if (throttle) clearTimeout(throttle);
      throttle = setTimeout(function() {
        updatePositions();
        updateIfVisible();
      }, 100);
    }, false);
  })();

})();
