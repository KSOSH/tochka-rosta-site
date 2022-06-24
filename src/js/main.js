!(function($){
	$(document).on("click", ".navigation-menu-button", function(e){
		e.preventDefault();
		$(this).toggleClass('open');
		return !1;
	})
}(jQuery));