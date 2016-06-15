
(function() {

  // Do we have the features we need?
  if (!document.querySelector || !document.addEventListener) return;

  // Turn the navigation headline into a toggle button.

  var button = document.querySelector('header .nav h6 a');

  if (!button) return;

  document.body.className += ' hidden-nav';

  var visible = false;
  var mask;

  function closest(element, tagName) {

    // If the element is the target
    if (element.nodeName.toLowerCase() === tagName) return element;

    var ancestor = element;
    while ((ancestor = ancestor.parentElement) && ancestor.nodeName && ancestor.nodeName.toLowerCase() !== tagName);
    if (ancestor && ancestor.nodeName && ancestor.nodeName.toLowerCase() === tagName) {
      return ancestor;
    }
  }

  function toggle(e) {
    var targetButton = closest(e.target, 'a');

    // If the navigation is visible, hide it
    if (visible) {
      visible = false;
      if (document.body.className.indexOf('hidden-nav') < 0) document.body.className += ' hidden-nav';

    // Else if the button was pressed, show the navigation
    } else if (targetButton === button) {
      visible = true;
      if (!mask) {
        mask = document.createElement('a');
        mask.setAttribute('href', '');
        mask.className = 'nav-mask';
        document.body.appendChild(mask);
      }

      document.body.className = document.body.className.replace(/hidden-nav/g, '');
    }

    if (targetButton === button) e.preventDefault();
  }

  document.body.addEventListener('click', toggle, false);
  document.body.addEventListener('keypress', function(e) {
    // If the enter key was pressed
    if ((e.key     && e.key     === 'Enter') || // Standard
        (e.keyCode && e.keyCode === 13     )) { // For backward compatibility
      toggle(e);
    }
  }, false);

  document.body.className += ' scripted-nav';
})();
