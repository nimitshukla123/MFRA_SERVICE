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
	
	var apiResponse = null;
	var webServiceURL  = params['req_url'];
	var reqType = params['req_type'].toUpperCase();
	var reqBody = params['reqBody'];
	
//	if (!empty(reqBody)) {
//		var data = JSON.stringify(JSON.parse(reqBody));
//	}
	
	var HTTPClient = require('dw/net/HTTPClient');
	var httpClient  = new HTTPClient();
	httpClient.setTimeout(30000);
    httpClient.setRequestHeader("Content-Type","application/xml");
    
    httpClient.setRequestHeader("apikey", '8TrYBMLWMMAxXA8nVJttmRcHEYdtTbAQ');
    httpClient.setRequestHeader("tracerId", 'kjdlka8798');
    httpClient.setRequestHeader("Authentication", 'Basic');
    
    if(!empty(params['selected_auth'])) {
    	var selectedAuth = params['selected_auth'];
    	
    	if (selectedAuth == 'basic') {
    		var userName = !empty(params['basicUserName']) ? params['basicUserName'] : null;
    		var password = !empty(params['basicPassword']) ? params ['basicPassword'] : null;
    		
    		if (!empty(userName) && !empty(password)) {
    			var token = dw.util.StringUtils.encodeBase64(userName + ':' + password);
    			
    			if (!empty(token)) {
    				httpClient.setRequestHeader("Authorization", "Basic " + token);
    			}
    			
    		}
    		
    	} else if (selectedAuth == 'bearer' && !empty(params['token'])) {
    		httpClient.setRequestHeader("Authorization", "Bearer " + params['token']);
    	}
    }
    
    httpClient.open(reqType, webServiceURL);
    
    if (!empty(reqBody)) {
    	httpClient.send(reqBody);
    } else {
    	httpClient.send();
    }
    
    
    if(httpClient.statusCode == 200 || httpClient.statusCode == 201) {
    	
    	apiResponse = httpClient.text;
    	
    } else if(httpClient.statusCode == 400) {
    	
    	apiResponse = httpClient.getErrorText();
    }
    	
  
	return  apiResponse;
}

exports.executeServiceCall = executeServiceCall;