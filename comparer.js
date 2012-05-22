$(function() {
	$('#font_input').append(
		$('.font-form-base')
		.clone()
		.removeClass('font-form-base')
		.show()
	);

    $('a.change_fonts').on('click', function(event) {
    	event.preventDefault();
    	$('#overlay').fopen();
    });

    $(document).on('change', '#font_input', function() {
    	setFonts();
    });
    
    $(document).on('click', '.add_font', function(event) {
    	event.preventDefault();
    	
        $('#font_input').append(
        	$(event.target).parents('.font-form')
        	.clone()
        	.removeClass('font-form-base')
        	.show()
        );
    });
    
    $(document).on('click', 'button.close', function() {
    	$('#overlay').fclose();
    });
});

var setFonts = function() {
	var wrapper = $('#wrapper');
	var source = $('.comparision.source');
	
	wrapper.empty();
	$('head .font').remove();
	
	$('#font_input div').each(function(i, font) {
		font = $(font);
		var link = font.find('.link').val();
		var fonts = {};
		var sections = ['body', 'summary', 'sub-headline', 'headline'];
		for (var section in sections) {
			section = sections[section];
			
			fonts[section] = [
			                  font.find('.' + section + ' .family').val(),
			                  font.find('.' + section + ' .weight').val()
			                  ];
		}
		
		$('head').append($(link).addClass('font'));
		
		var available = link.match(/family=(.*?)['"]/i)[1];
    	font.find('.available-fonts').text(
    				available.replace(/\|/g, ', ').replace(/\+/g, ' '));
		                                                 
		
		var comp = source.clone().removeClass('source');
		var set = function(tag, name) {
            comp.find(tag).css({
            	'font-family': '"' + fonts[name][0] + '"',
            	'font-weight': fonts[name][1]
            });
		}
        comp.css({
        	'font-family': '"' + fonts['body'][0] + '"',
        	'font-weight': fonts['body'][1]
        });
		set('h1', 'headline');
		set('h2', 'sub-headline');
		set('.summary', 'summary');
		wrapper.append(comp.show());
	});
	
	var divs = $('#wrapper div');
	width = divs.first().outerWidth() * divs.length;
	// For no reason apparent to me, this is not wide enough, so just add something
	width+= width * 0.1;
	$('#wrapper').width(width);
};