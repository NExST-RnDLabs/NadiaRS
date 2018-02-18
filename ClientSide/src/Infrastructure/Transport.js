// dependencies
import uuid from 'uuid';

import Deferred from './Deferred';
import Utils from './Utils';

export default class Transport {

    static serviceURL = 'service/';

    // handler for external services
    static send(type, service, data) {

        var response = new Deferred();

        Transport._dispatchRequest(type, service,data, response);

        return response.promise();

    }

    // privates below this point

    static _dispatchRequest(type, service,data, response) {

       
        // AJAX Call handlers
        var resolve = function(data, status, xhr) {
            //Is it a JSON response?
            let contentType = xhr.getResponseHeader('content-type');
            if(contentType != null && contentType.indexOf('application/json') == 0){
                //yes, parse it and resolve with data
                let res = JSON.parse(data);
                response.resolve(res, status, xhr);
            }else{
                //no, data is raw, resolve as is
                let res = data;
                response.resolve(res, status, xhr);
            }
        }

        var reject = function(xhr, status, err) {
            response.reject(xhr, status, err);
        }

        // Construct AJAX request
        var xhr = new XMLHttpRequest();
        if(type == 'FORMDATA')
        {
            //do not set the content-type
            xhr.open('POST', Transport.serviceURL+service);
        }
        else if(type == 'POST')
        {
            xhr.open('POST', Transport.serviceURL+service);
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        else if(type == 'GET')
        {
            var qryStr = Transport.serviceURL+service;
            if(data != null)
            {
                qryStr += '?'+Utils.jsonToQueryString(data);
            }
            xhr.open('GET', qryStr);
        }
       
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response, this.status, xhr);
            } else {
                reject(xhr, this.status, xhr.statusText);
            }
        };

        xhr.onerror = function() {
            reject(xhr, this.status, xhr.statusText);
        };

       if(type == 'FORMDATA')
        {
            //send the data component as is
            xhr.send(data);
        }
        else if(type == 'POST')
        {
            // serialise the data first then send
            xhr.send(JSON.stringify(data));
        }
        else if(type == 'GET')
        {
            //send nothing
            xhr.send();
        }
    }
}
