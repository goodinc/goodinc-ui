
(function() {

  // Do we have the features we need?
  if (!document.querySelector || !document.addEventListener) return;

  var nav = document.querySelector('header .nav');

  // Turn the navigation headline into a toggle button.

  var button = nav.querySelector('h6 a');

  nav.className += ' hidden';

  var visible = false;

  button.addEventListener('click', function(e) {
    if (visible) {
      visible = false;
      nav.className += ' hidden';
    } else {
      visible = true;
      nav.className = nav.className.replace(/hidden/g, '');
    }
    e.preventDefault();
  }, false);

  document.body.className += ' scripted-nav';
})();
