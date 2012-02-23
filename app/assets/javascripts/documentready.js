$(document).ready(function() {  
	if (!Modernizr.inputtypes.range) {    
		$('#new-vote-<%= @consideration.id %>').html("<%= escape_javascript(render('shared/dropdown_voting_logged_out')) %>"); 
	}
	$(":range").rangeinput();
});