'use strict';

var format = require('xml-formatter');
// This JS file handles all the events triggered on service panel 

/**
 * function callApi 
 * This function is used to trigger Ajax call to call web api and print response on storefront
 */
var callApi = function () {
	
	$('.check-response').click(function() {
		
		$('.loading').removeClass('hide');
		var url = $('#url-text').attr('data-href');
		var formData = $('form:not("#headersForm")').serializeArray();
		
		var headerForm = JSON.stringify($('form#headersForm').serializeArray());
		formData.push({name : 'headers', value : headerForm});
		
		$.ajax({
			url : url,
			type : "POST",
			data : formData,
			success : function (result) {
				$('#response textarea').text((result.response.data));
				$('.loading').addClass('hide');
			},
			error : function (result) {
				$('#response textarea').text((result.responseText.trim()));
				$('.loading').addClass('hide');
			}
		})
	});
}


/**
 * authenticationHandler
 * Function used to show authentication type basic or bearer as per selection
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
 * handleParamterSection
 * handles parameter section
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
 * handleHeaderSection
 * Used to handle authentication header section.
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
			var newid = addIndexToAttr(currentId);
			currentElement.attr('id',newid);
			
		}
		$('#headers .headers-field:last').after(clonedParamsFields);
	});
	
	// function to creating dynamic header section input field to pass in ajax call
	
	$(document).on('blur','#headersForm .key,#headersForm .value',function(e){
		var key = '';
		var value = '';
		if(e.target.className.indexOf('key') > -1) {
			key = $(this).val();
			value = $(this).siblings().val();
		} else {
			value = $(this).val();
			key = $(this).siblings().val();
		}
		
		if (key != '' && value != '') {
			
			if ($(this).parents('.headers-field').find('#'+key).length > 0) {
				$(this).parents('.headers-field').find('#'+key).val(value);
			} else {
				$('<input>').attr({type: 'hidden', id : key, class : 'headerfields', name : key, value : value}).appendTo($(this).parents('.headers-field'));
			}
			
		}
		
		$(this).parents('.headers-field').find('.headerfields').each(function() {
			if ($(this).attr('name') != key || key == '' || value == '') {
				$(this).remove();
			}
		})
	})
	
}

/*
 * 
 */
var addIndexToAttr = function (attr) {
	
	if (attr != null && attr.indexOf('_') > -1) {
		var split = attr.split('_');
		
		if (!isNaN(split[1])) {
			var newINdex = parseInt(split[1]) + 1;
		}
		
		return split[0] +'_'+newINdex;
	}
}

/**
 * handleApiInfo
 * function used to show API information as per selected api
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
			
			if (selectedApi.length > 0) {
				selectedApi.siblings().addClass('hide');
				selectedApi.find('.api-env-type').addClass('hide');
				selectedApi.find('.'+selectedEnv).removeClass('hide');
				selectedApi.find('.sample-request').removeClass('hide');
				selectedApi.removeClass('hide');
				$('.api-specification').removeClass('hide');
				
			} else {
				
				$('.api-specification').addClass('hide');
			}
			
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
	
	
	$("#floatbar").click(function(e){
	    e.preventDefault();
	    var content = $(this).find(".popup").text();
	    var formattedXml = format(content);
	    var popupHtml = ('<div class="popupoverlay"><div class="content"><div class="popup"><xmp>'+ content +'</xmp></div><div class="buttons"><span class="copybtn">Copy</span><span class="closebtn">Close</span></div></div></div>');
	    $('body').append(popupHtml);
	});
	
	$(document).on('click','.popupoverlay .closebtn', function () {
		$('.popupoverlay').remove();
	});
	
	$(document).on('click','.popupoverlay .copybtn', function () {
		var targetElement = $(this).parents('.content').find('xmp').text();
		
		targetElement.select();

		/* Copy the text inside the text field */
		document.execCommand("copy");

		/* Alert the copied text */
		alert("Copied the text: " + targetElement.value);
	})
});

