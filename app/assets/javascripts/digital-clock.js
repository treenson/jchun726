$(function(){

	// Cache some selectors

	var clock = $('#clock'),
		ampm = clock.find('.ampm');

	// Map digits to their names (this will be an array)
	var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

	// This object will hold the digit elements
	var digits = {};

	// Positions for the hours, minutes, and seconds
	var positions = [
		'h0', 'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];

	// Generate the digits with the needed markup,
	// and add them to the clock

	var digit_holder = clock.find('.digits');

	$.each(positions, function(){

		if(this == ':'){
			digit_holder.append('<div class="dots">');
		}
		else{

			var pos = $('<div>');

			for(var i=1; i<8; i++){
				pos.append('<span class="d' + i + '">');
			}

			// Set the digits as key:value pairs in the digits object
			digits[this] = pos;

			// Add the digit elements to the page
			digit_holder.append(pos);
		}

	});

	// Run a timer every second and update the clock

	(function update_time(){

		// Use moment.js to output the current time as a string
		// hh is for the hours in 12-hour format,
		// mm - minutes, ss-seconds (all with leading zeroes),
		// d is for day of week and A is for AM/PM

		var time_int = (new Date()).getTime();
		var time_diff = Math.floor((1406275200000-time_int)/1000);
		var now = ("00"+parseInt(time_diff/3600)).slice(-3) + ("0"+parseInt((time_diff%3600)/60)).slice(-2) + ("0"+parseInt(time_diff%60)).slice(-2);

		digits.h0.attr('class', digit_to_name[now[0]]);
		digits.h1.attr('class', digit_to_name[now[1]]);
		digits.h2.attr('class', digit_to_name[now[2]]);
		digits.m1.attr('class', digit_to_name[now[3]]);
		digits.m2.attr('class', digit_to_name[now[4]]);
		digits.s1.attr('class', digit_to_name[now[5]]);
		digits.s2.attr('class', digit_to_name[now[6]]);

		// Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);

	})();

	// Switch the theme

	$('a.button').click(function(){
		clock.toggleClass('light dark');
	});

});
