'use strict';

var processInclude = require('./base/util');

window.jQuery = window.$ = require('jquery');


$(document).ready(function () {
	
//	processInclude(require('.base/thirdParty/bootstrap'));
	 
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
