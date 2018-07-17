/**
* Description of the module and the logic it provides
*
* @module cartridge/scripts/service
*/

'use strict';

/**
 * function used to trigger service call as per form data filled by user
 */
function executeServiceCall (params) {
	
	var webServiceURL  = params['req_url'];
	var reqType = params['req_type'].toUpperCase();
	
	if (!empty(reqType) && !empty(webServiceURL)) {
		
		var HTTPClient = require('dw/net/HTTPClient');
		
		var apiResponse = null;
		var reqBody = params['reqBody'];
		var headers =  params['headers'];
		
		var httpClient  = new HTTPClient();
		
		if (!empty(headers)) {
			headers = JSON.parse(headers);
			
			// setting headers for api call
			for (var i = 0; i < headers.length; i++) {
				httpClient.setRequestHeader(headers[i]['name'], headers[i]['value']);
			}
		}
	    
	    if(!empty(params['selected_auth'])) {
	    	var selectedAuth = params['selected_auth'];
	    	
	    	if (selectedAuth == 'basic') {
	    		var userName = !empty(params['basicUserName']) ? params['basicUserName'] : null;
	    		var password = !empty(params['basicPassword']) ? params ['basicPassword'] : null;
	    		
	    		if (!empty(userName) && !empty(password)) {
	    			var token = dw.util.StringUtils.encodeBase64(userName + ':' + password);
	    			
	    			if (!empty(token)) {
	    				httpClient.setRequestHeader("Authorization", "Basic " + token);
	    			} else {
	    				httpClient.setRequestHeader("Authorization", "Basic");
	    			}
	    			
	    		} else {
	    			httpClient.setRequestHeader("Authorization", "Basic");
	    		}
	    		
	    	} else if (selectedAuth == 'bearer' && !empty(params['token'])) {
	    		httpClient.setRequestHeader("Authorization", "Bearer " + params['token']);
	    	}
	    }
	    
	    httpClient.open(reqType, webServiceURL);
	    
	    if (!empty(reqBody) && reqType != 'GET') {
	    	httpClient.send(reqBody);
	    } else {
	    	httpClient.send();
	    }
	    
	    
	    if(httpClient.statusCode == 200 || httpClient.statusCode == 201) {
	    	apiResponse = httpClient.text;
	    	
	    } else {
	    	
	    	if (!empty(httpClient.getErrorText())) {
	    		apiResponse = httpClient.getErrorText();
	    	} else {
	    		apiResponse = httpClient.getErrorStatus();
	    	}
	    	
	    }
	    
	} else {
		apiResponse = dw.web.Resource.msg('url.error','service',null);
	}
  
	return  apiResponse;
}

exports.executeServiceCall = executeServiceCall;