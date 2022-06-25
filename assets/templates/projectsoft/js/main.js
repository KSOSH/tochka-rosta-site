
!(function($){
	/**
	 * Default options Fancybox
	**/
	$.fancybox.defaults.parentEl = ".fancybox__wrapper";
	$.fancybox.defaults.transitionEffect = "circular";
	$.fancybox.defaults.transitionDuration = 500;
	$.fancybox.defaults.lang = "ru";
	$.fancybox.defaults.i18n.ru = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		ERROR: "Запрошенный контент не может быть загружен.<br/>Повторите попытку позже.",
		PLAY_START: "Начать слайдшоу",
		PLAY_STOP: "Остановить слайдшоу",
		FULL_SCREEN: "Полный экран",
		THUMBS: "Миниатюры",
		DOWNLOAD: "Скачать",
		SHARE: "Поделиться",
		ZOOM: "Увеличить"
	};
	/**
	 ** Is PDF file open browser supports
	**/
	function isPdf(){
		var is_pdf = false,
			plugins = Array.from(window.navigator.plugins || {}),
			map = plugins.map(function(a){
				var map = Array.from(a);
				if (map[0].suffixes=='pdf' && !is_pdf){
					is_pdf = true;
				}
				return map;
			});
		return is_pdf;
	}
	const IS_PDF = isPdf();

	/**
	 ** Sliders
	**/
	$('.home').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: false,
		arrows: false
	});

	$(document).on("click", ".navigation-menu-button", function(e){
		e.preventDefault();
		$(this).toggleClass('open');
		return !1;
	})
}(jQuery));