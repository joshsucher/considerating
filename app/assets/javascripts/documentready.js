$(document).ready(function() {  
	if(jQuery.browser.mobile) {
	$('#rating').draggable();
	}
	$(":range").rangeinput();
});