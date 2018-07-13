'use strict';

// initnalizing JS for service panel 

/**
 * function callApi 
 * This function is used to trigger Ajax call to call web api and print response on storefront
 */
var callApi = function () {
	
	$('.check-response').click(function() {
		
		var url = $('#url-text').attr('data-href');
		var formData = $('form').serializeArray();
		
		$.ajax({
			url : url,
			type : "POST",
			data : formData,
			success : function (result) {
				$('#response textarea').text((result.response.data))
			}
		})
	});
}


/**
 * 
 */
var authenticationHandler = function () {
	
	$('#selected-auth-type').change(function () {
		var selectedAuthType = this.value;
		var authDom = $('#authorization .auth-fields');
		
		if (selectedAuthType != '') {
			authDom.find('.auth-field-details').addClass('hide');
			authDom.find('.'+selectedAuthType).removeClass('hide');
			authDom.removeClass('hide');
			
		} else {
			authDom.addClass('hide');
		}
	});
}

/**
 * 
 */
var handleParamterSection = function () {
	
	$('.params-button').click(function() {
		$('.param-sections').toggleClass('hide');
		
	});
	
	// function to handle add more parameters 
	// it will create field for adding more parameters
	$('.param-sections .params-button-container button').click(function () {
		var clonedParamsFields = $('.param-sections .param-fields:last').clone();
		
		for (var i = 0; i < clonedParamsFields.children().length; i++) {
			var currentElement = $(clonedParamsFields.children()[i]);
			currentElement.val('');
			var currentId = currentElement.attr('id');
			var currentName = currentElement.attr('name');
			var newid = addIndexToAttr(currentId);
			var newName = addIndexToAttr(currentName);
			currentElement.attr('id',newid);
			currentElement.attr('name',newName);
			
		}
		$('.param-sections .param-fields:last').after(clonedParamsFields);
	});
	
}


/**
 * 
 */
var handleHeaderSection = function () {
	
	// function to handle add more parameters 
	// it will create field for adding more parameters
	$('#headers .headers-button-container button').click(function () {
		var clonedParamsFields = $('#headers .headers-field:last').clone();
		
		for (var i = 0; i < clonedParamsFields.children().length; i++) {
			var currentElement = $(clonedParamsFields.children()[i]);
			currentElement.val('');
			var currentId = currentElement.attr('id');
			var currentName = currentElement.attr('name');
			var newid = addIndexToAttr(currentId);
			var newName = addIndexToAttr(currentName);
			currentElement.attr('id',newid);
			currentElement.attr('name',newName);
			
		}
		$('#headers .headers-field:last').after(clonedParamsFields);
	});
	
}

/*
 * 
 */
var addIndexToAttr = function (attr) {
	
	if (attr != null && attr.indexOf('-') > -1) {
		
		var split = attr.split('-');
		
		if (!isNaN(split[1])) {
			var newINdex = parseInt(split[1]) + 1;
		}
		
		return split[0] +'-'+newINdex;
	}
}

/**
 * 
 */
var handleApiInfo = function () {
	
	$('.api-type').change(function() {
		
		var selectedApiVal = this.value;
		var selectedEnvironment = $('.environment-type').val();
		
		showApiSpecification(selectedApiVal, selectedEnvironment);
		
	});
	
	$('.environment-type').change(function () {
		
		var selectedEnvironment = this.value;
		var selectedApiVal = $('.api-type').val();
		showApiSpecification(selectedApiVal, selectedEnvironment);
	});
	
	var showApiSpecification = function (selectedApiVal, selectedEnv) {
		
		if ($('.api-specification').length > 0 && selectedApiVal != '') {
			
			var selectedApi = $('.api-specification').find('.'+selectedApiVal);
			selectedApi.find('.api-env-type').addClass('hide');
			selectedApi.find('.'+selectedEnv).removeClass('hide');
			selectedApi.removeClass('hide');
			$('.api-specification').removeClass('hide');
			
		} else {
			$('.api-specification').addClass('hide');
		}
	}
	
}
 

$(document).ready(function () {
	callApi();
	authenticationHandler();
	handleParamterSection();
	handleHeaderSection();
	handleApiInfo();
});

