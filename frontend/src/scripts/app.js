

particlesJS.load('particles-js', '/frontend/build/assets/particles.json', function () {

});

$(document).ready(function () {
	var sliceStart = 0;
	var sliceEnd = 4;
	var targetItem = ".project__item";
	var btnLoadMore = "#btn--load-more";
	var hidden = "hidden";

	$(targetItem).slice(sliceStart,sliceEnd).show();
	if ($(targetItem + ":" + hidden).length !== 0) {
		$(btnLoadMore).show();
	}
	$(btnLoadMore).on('click', function (e) {
		e.preventDefault();
		$(targetItem + ":" + hidden).slice(sliceStart, sliceEnd).show();
		if ($(targetItem + ":" + hidden).length === 0) {
			$(btnLoadMore).fadeOut('slow');
			$(btnLoadMore)[0].parentElement.className = hidden;
		}
	});
});