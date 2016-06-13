
(function() {

  // Do we have the features we need?
  if (!document.querySelector || !document.addEventListener) return;

  // Turn the navigation headline into a toggle button.

  var button = document.querySelector('header .nav h6 a');

  if (!button) return;

  document.body.className += ' hidden-nav';

  var visible = false;

  function getAncestor(element, tagName) {
    var ancestor = element;
    while ((ancestor = ancestor.parentElement) && ancestor.nodeName && ancestor.nodeName.toLowerCase() !== tagName);
    if (ancestor && ancestor.nodeName && ancestor.nodeName.toLowerCase() === tagName) {
      return ancestor;
    }
  }

  document.body.addEventListener('click', function(e) {
    var targetButton = getAncestor(e.target, 'a');
    if (visible) {
      visible = false;
      document.body.className += ' hidden-nav';
    } else if (targetButton === button) {
      visible = true;
      document.body.className = document.body.className.replace(/hidden-nav/g, '');
    }
    if (targetButton === button) e.preventDefault();
  }, false);

  document.body.className += ' scripted-nav';
})();
