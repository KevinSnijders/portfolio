'use strict';
function loadMorePortfolioItems() {
  var o = '.portfolio__item',
    t = '#btn--load-more',
    s = 'hidden';
  $(o)
    .slice(0, 4)
    .show(),
    0 !== $(o + ':' + s).length && $(t).show(),
    $(t).on('click', function(e) {
      e.preventDefault(),
        $(o + ':' + s)
          .slice(0, 4)
          .show(),
        0 === $(o + ':' + s).length &&
          ($(t).fadeOut('slow'),
          ($(t)[0].parentElement.className = s));
    });
}
particlesJS.load('particles-js', '/assets/particles.json'),
  $(document).ready(function() {
    loadMorePortfolioItems();
  });
