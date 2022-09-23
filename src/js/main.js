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
	 * Ссылки поделиться в футтере
	**/
	$(document).on("click", ".footer a[down-link]", function(e){
		e.preventDefault();
		var attr = $(this).attr('down-link'),
			link = window.location.href,
			title = $("h1").text() || $("title").text(),
			description = $("meta[name=description]").attr("content"),
			image = encodeURIComponent($("meta[itemprop=image]").attr("content")),
			str = "",
			$a = null,
			server = null,
			download = null;
		switch (attr) {
			// Скриншот страницы
			case "photo":
				download = title;
				break;
			// Поделиться в фейсбук
			case "facebook":
				server = "http://www.facebook.com/sharer.php?s=100";
				server += "&[url]=" + encodeURIComponent(link);
				server += "&p[images][0]=" + image;
				server += "&p[title]=" + encodeURIComponent(title);
				server += "&p[summary]=" + encodeURIComponent(description);
				break;
			// Поделиться в ОК
			case "ok":
				server = "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview";
				server += "&st.shareUrl=" + encodeURIComponent(link);
				break;
			// Поделиться в ВК
			case "vk":
				server = "https://vk.com/share.php?";
				server += "url=" + encodeURIComponent(link);
				server += "&title=" + encodeURIComponent(title);
				server += "&image=" + image;
				server += "&description=" + encodeURIComponent(description);
				break;
			// Поделиться в Twitter
			case "twitter":
				//Длина сообщения 255 символов
				description = description.slice(0, 255);
				server = "https://twitter.com/intent/tweet?";
				server += "url=" + encodeURIComponent(link);
				server += "&text=" + encodeURIComponent(description);
				break;
		}
		if(server){
			// Если ссылка есть
			// Открываем новое окно
			window.open(server);
		}else if(download) {
			// Если ссылки нет - скриншот
			// Запрос на скриншот страницы
			$("body").addClass('screen');
			var laad_screen = false,
				jq_xhr = $.ajax({
				url: window.location.origin + '/screenshot/',
				type: 'POST',
				data: 'shot=' + link + '&title=' + download,
				responseType: 'blob',
				processData: false,
				xhr:function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType= 'blob'
					return xhr;
				},
			}).done(
				function(blob, status, xhr){
					var disposition = JSON.parse(xhr.getResponseHeader('content-disposition').split("filename=")[1]);
					var a = $("<a>click</a>");
					a[0].href = URL.createObjectURL(blob);
					a[0].download = disposition.fname;
					$("body").append(a);
					a[0].click();
					$("body").removeClass('screen');
					setTimeout(function(){
						a.remove();
					}, 500);
				}
			).fail(
				function(){
					$("body").removeClass('screen');
					setTimeout(function(){
						alert("Не удалось обработать операцию");
					}, 500);
				}
			).always(
				function(data){
					$("body").removeClass('screen');
					//setTimeout(function(){
					//	alert("Не удалось обработать операцию");
					//}, 500);
				}
			);
			return !1;
		}
	})
	/**
	 * End Ссылки поделиться в футтере
	**/
	/**
	 * PDF View
	**/
	.on("click", "a[href$='.pdf']", function(e){
		// PDF документы на сервере
		var base = window.location.origin,
			reg = new RegExp("^" + base),
			href = this.href,
			go = false;// + "?v=" + new Date().getTime();
		if(!$(this).data('google')){
			var go = "https://docs.google.com/viewer?embedded=true&url=" + encodeURI(href);
			$(this).data('google', go);
		}
		if(reg.test(href)){
			e.preventDefault();
			if(!IS_PDF){
				href = $(this).data('google');
			}
			$.fancybox.open({
				src: href
			});
			return !1;
		}
	})
	/**
	 * End PDF View
	**/
	/**
	 * Обработка окна о куках
	**/
	.on("click", ".notification-button .btn", function(e){
		e.preventDefault();
		$(".notification-form").addClass("hidden");
		/* Set Cookie`s */
		let date = new Date(Date.now() + 86400000 * COOKIE_DATE);
		Cookies.set('notify_policy', 'true', { expires: date, path: '/' });
		return !1;
	});
	/**
	 * End Обработка окна о куках
	**/

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
	/**
	 * End Sliders
	**/

	/**
	 * Navigation
	**/
	$(document).on("click", ".navigation-menu-button", function(e){
		e.preventDefault();
		$(this).toggleClass('open');
		return !1;
	});
	/**
	 * End Navigation
	**/
	
	/**
	** Eye Panel
	**/
	const bvi = {
		bvi_target : ".bvi-open", // Класс ссылки включения плагина
		bvi_theme : "white", // Цвет сайта
		bvi_font : "arial", // Шрифт
		bvi_font_size : 18, // Размер шрифта
		bvi_letter_spacing : "normal", // Межбуквенный интервал
		bvi_line_height : "normal", // Междустрочный интервал
		bvi_images : true, // Изображения
		bvi_reload : false, // Перезагрузка страницы при выключении плагина
		bvi_fixed : false, // Фиксирование панели для слабовидящих вверху страницы
		bvi_tts : false, // Синтез речи
		bvi_flash_iframe : true, // Встроенные элементы (видео, карты и тд.)
		bvi_hide : false // Скрывает панель для слабовидящих и показывает иконку панели.
	};
	if(Cookies.get("bvi-panel-active")){
		$(".bvi-open").data('bvi-init', 1);
		$.bvi(bvi);
	} else {
		$(document).on("click", ".bvi-open", function(e){
			e.preventDefault();
			if(!$(this).data('bvi-init')){
				$.bvi(bvi);
				$(this).data('bvi-init', 1);
				$(this).click();
			}
		});
	}
	/**
	 * End Eye Panel
	**/
	/**
	 * Map
	**/
	const MapID = $("#map"),
		init = function() {
			let data_point = MapID.data('point').split(',').map(Number),
				data_addr = MapID.data('addr'),
				data_email = MapID.data('email'),
				data_phone = MapID.data('phone'),
				data_name = MapID.data('name');
			const placemark = new ymaps.Placemark(data_point,{
					balloonContentHeader: `${data_name}`,
					balloonContentFooter: '<p class="text-center"><button class="callme-btn btn" type="button">ЗАДАТЬ ВОПРОС</button></p>',
					balloonContentBody: `<p class="text-left">${data_addr}</p>` +
										`<p class="text-right">${data_phone}</p>` + 
										`<p class="text-center"><a href="mailto:${data_email}" target="_blank">${data_email}</a></p>`
				},
				{
					iconLayout: "default#image",
					iconImageHref: "/assets/templates/projectsoft/images/tr.png?_=v0.0",
					iconImageSize: [64, 64],
					iconImageOffset: [-32, -32]
				});
			const myMap = new ymaps.Map("map", {
				center: data_point,
				zoom: 17,
				controls: ["typeSelector", "zoomControl", "fullscreenControl"]
			});
			myMap.behaviors.disable("scrollZoom"),
			myMap.geoObjects.add(placemark),
			placemark.balloon.open();
		};
	if(MapID.length) {
		const scriptMap = document.createElement("script"),
			api_key = MapID.data('key');
		scriptMap.type = "text/javascript";
		scriptMap.src = `https://api-maps.yandex.ru/2.1.79/?apikey=${api_key}&lang=ru_RU`;
		scriptMap.onload = function() {
			ymaps.ready(init)
		};
		document.body.append(scriptMap);
	}
}(jQuery));