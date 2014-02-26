// Pre-load image button background pngs
function preloadImages(array) {
	if (!preloadImages.list) {
		preloadImages.list = [];
	}
	for (var i = 0; i < array.length; i++) {
		var img = new Image();
		img.src = array[i];
		preloadImages.list.push(img);
	}
}

function fixVimeo() {

	/*
		Better Vimeo Embeds 2.1 by Matthew Buchanan
		Modelled on the Vimeo Embedinator Script
		http://mattbu.ch/tumblr/vimeo-embeds/

		Released under a Creative Commons attribution license:
		http://creativecommons.org/licenses/by/3.0/nz/
	*/

	var color = "ffffff";
	var opts = "title=0&byline=0&portrait=0";
	$("iframe[src^='http://player.vimeo.com']").each(function() {
		var src = $(this).attr("src");
		var w = $(this).attr("width");
		var h = $(this).attr("height");
		if (src.indexOf("?") == -1) {
			$(this).replaceWith(
				"<iframe src='"+src+"?"+opts+"&color="+
				color+"' width='"+w+"' height='"+h+
				"' frameborder='0'></iframe>"
			);
		}
	});

	$("object[data^='http://vimeo.com']").each(function() {
		var $obj = $(this);
		var data = $obj.attr("data");
		var temp = data.split("clip_id=")[1];
		var id = temp.split("&")[0];
		var server = temp.split("&")[1];
		var w = $obj.attr("width");
		var h = $obj.attr("height");
		$obj.replaceWith(
			"<iframe src='http://player.vimeo.com/video/"
			+id+"?"+server+"&"+opts+"&color="+color+
			"' width='"+w+"' height='"+h+
			"' frameborder='0'></iframe>"
		);
	});
}

$(document).ready(function() {

	// Place target anchor for jknav when navigating to the previous page, then navigate to it
	$('article.post:last').before('<a class="jknav-back-target default" name="jknav-back-target"></a>');
	$('#body.masonry-page .jknav-back-target.default').remove();
	$('#body.permalink-page .jknav-back-target.default').remove();
	if(window.location.href.indexOf('#jknav-back-target') > -1) {
		window.location = window.location;
	}

	// Remove image captions and metadata from masonry pages
	// Inelegant to put it kindly, but necessitated by lack of {!block} or if-else selectors to exclude non-masonry pages
	$('#body.masonry-page .large-video').remove();
	$('#body.masonry-page section.caption').remove();
	$('#body.masonry-page .post.photo .post-meta').remove();
	$('#body.masonry-page .post.photoset .post-meta').remove();
	$('#body.masonry-page .post.panorama .post-meta').remove();

	// j/k navigation (next/previous post)
	$('article.post').jknav();
	$.jknav.init({
		speed: 0,
		circular: false,
		reevaluate: true
	});

	// Pre-load image button background pngs
	var pngs = [
		'http://static.tumblr.com/vmi5hwb/4Bsn0x39b/grey70a.png',
		'http://static.tumblr.com/vmi5hwb/9OOn0x3bz/grey50a.png'
	];
	preloadImages(pngs);
	
	// Masonry
	$container = $('#masonry-container');

	$(window).load(function() {
		$container.masonry({
			itemSelector: 'article.post',
			columnWidth: 250,
			gutter: 35
		});
		$('#load-gif').remove();
		$container.toggleClass('loaded');
	});
	
	// Custom keybinds
	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.which || e.keyCode) {

			case 78: // n

				if ($('input:focus, textarea:focus').length===0) {
					var next = $('a#next').attr('href');
					if (next) {
						window.location = next;	
					}
				}

			default: return;

			break;
			case 77: // m

				if ($('input:focus, textarea:focus').length===0) {
					var prev = $('a#prev').attr('href');
					if (prev) {
						window.location = prev;	
					}
				}

			default: return;

			break;
			case 83: // s (Note: char code for s is not consistent across modern browsers. This works for Chrome.)

				if ($('input:focus, textarea:focus').length===0) {
					event.preventDefault();
					$('#search-query').focus();
				}

			default: return;
		}
		event.preventDefault();
	}

	// Custom tag menus
	$('.custom-tags').each(function() {
		var $customTags = $(this);
		var $tagList = $(this).children('.custom-tags-string');
		tags = $tagList.text().split(/,\s*/);
		$tagList.replaceWith($('<ul class="menu custom-tag-list"/>'));
		tags.forEach(function(tag) {
			$customTags.children('ul').append('<li><a href="/tagged/' + tag + '">#' + tag + '</a></li>');
		});
	});
	$('.custom-tags').fadeIn(200);
	$('#link-list').fadeIn(200);

	$('.custom-tags-heading').click(function() {
		$(this).siblings('ul').slideToggle(100);
		$(this).parent().toggleClass('open');
	});

	fixVimeo();

	// Fixes for iOS: blur form when user taps outside it
	$('html.touch').click(function() {
		document.activeElement.blur();
	});
	$('html.touch form').click(function() {
		event.stopPropagation();
	});

});
