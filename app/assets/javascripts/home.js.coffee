# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

scrollBackground = () ->
	target = $('.carousel .active')
	image = new Image()
	image.src = target.css('background-image').match(/^url\("?(.+?)"?\)$/)[1]
	$(image).load ->
		w = $(window).width()
		h = $(window).height()
		iw = image.width
		ih = image.height
		wr = iw / w
		hr = ih / h
		r = wr
		if(r > hr)
			r = hr
		target.stop().animate
			'background-position-x': (w - iw/r)+'px',
			'background-position-y': (h - ih/r)+'px'
		,
			duration: 5000,
			easing: 'easeInOutQuart'
		return
$(document).ready ->
	$(".carousel").carousel
		interval: 7000
		pause: "false"
	$(".carousel").bind 'slide.bs.carousel', (e)->
		$(e.relatedTarget).css 'backgroundPosition', '0px 0px'
		return
	$(".carousel").bind 'slid.bs.carousel', (e)->
		scrollBackground()
		return
	scrollBackground()
	return
