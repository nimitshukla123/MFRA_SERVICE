'use strict';



window.jQuery = window.$ = require('jquery');


$(document).ready(function () {
	

	 
	$("#myTab li:eq(1) a").tab('show');
	
	$('.check-response').click(function(){
		var url = $('#basic-url').val();
		
		$.ajax({
			url : url,
			datatype : "application/json",
			success : function (data) {
				
				$('#response').html(JSON.stringify(data));
			}
		})
	})
	
});
