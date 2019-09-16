particlesJS.load('particles-js', '/assets/particles.json');

$(document).ready(function() {
  loadMorePortfolioItems();
});

function loadMorePortfolioItems() {
  let sliceStart = 0;
  let sliceEnd = 4;
  let targetItem = '.portfolio__item';
  let btnLoadMore = '#btn--load-more';
  let hidden = 'hidden';

  $(targetItem)
    .slice(sliceStart, sliceEnd)
    .show();
  if ($(targetItem + ':' + hidden).length !== 0) {
    $(btnLoadMore).show();
  }
  $(btnLoadMore).on('click', function(e) {
    e.preventDefault();
    $(targetItem + ':' + hidden)
      .slice(sliceStart, sliceEnd)
      .show();
    if ($(targetItem + ':' + hidden).length === 0) {
      $(btnLoadMore).fadeOut('slow');
      $(btnLoadMore)[0].parentElement.className = hidden;
    }
  });
}
