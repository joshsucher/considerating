$(document).ready(function() {  
	if (!Modernizr.inputtypes.range) {    
		$(".modern_logged_out:input[name='rating']").html("<select name='rating'><option value='10'>considerate</option><option value='20'>2</option><option value='30'>3</option><option value='40'>4</option><option value='50'>5</option><option value='60'>6</option><option value='70'>7</option><option value='80'>4</option><option value='90'>9</option><option value='100'>creepy</option></select>"); 
	}
	$(":range").rangeinput();
});