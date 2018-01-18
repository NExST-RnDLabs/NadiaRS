// dependencies
import uuid from 'uuid';

import Deferred from './Deferred';

export default class Transport {

    static serviceURL = 'service/';
    static formdata_id = 'formdata';

    // internal message queues
    static _msgQueue = [];
    static _callbackQueue = [];

    // handler for external services
    static send(service, d) {

        var deferredObject = new Deferred();

        var req_id = uuid.v4().replace(/-/g, '');

        var ts = Date.now; // see shim.js - please re-start webpack :)
        // setup data object
        var req = {
            id: req_id,
            service: service,
            data: d,
            timestamp: ts
        }

        // setup call back object
        var callback = null;

        // is this a FormData object ?
        if (d instanceof FormData) {
            // yes - don't queue it, dispatch now - with custom id for resolving later

            callback = {
                id: Transport.formdata_id,
                deferred: deferredObject,
                timestamp: ts
            }

            // register the callback in either case
            Transport._callbackQueue.push(callback);

            Transport._dispatchRequest(req, [Transport.formdata_id]);

        } else {

            // no - add to queue for dispatch later
            Transport._setTimer();
            Transport._msgQueue.push(req);

            callback = {
                id: req_id,
                deferred: deferredObject,
                timestamp: ts
            }

            // register the callback in either case
            Transport._callbackQueue.push(callback);

        }

        return deferredObject.promise();

    }

    // privates below this point

    static _dispatchRequest(req, requestedIds) {

        var dequeueId = function(queue, Ids, callback) {
            // scan the queue for the requested ids
            // it is assumed that all requested ids are responded to by the server
            for (var i = 0; i < queue.length; i++) {

                // check if the queue item id is a requested id
                if (Ids.indexOf(queue[i].id) != -1) {

                    // yes - this is a requested id, call the handler
                    if (callback) {
                        // call the callback for this requested
                        try {
                          callback(queue[i], i);
                        } catch (e) {
                          console.error('Callback handler has failed for service request id: ' + queue[i].id);
                          console.error(e);
                        }

                        //remove the item from queue(_callbackQueue)
                        queue.splice(i, 1);

                        //rewind to the previous item in the queue, beacuse we have removed one above
                        i--;
                    }
                }
            }
        }

        // AJAX Call handlers
        var resolve = function(data, status, xhr) {
            //Check if we're resolving a multipart formdata return
            if (requestedIds[0] === Transport.formdata_id) {

              var responses = JSON.parse(data);
              //if so, return all results to the callback
              responses.map(function(res) {
                 Transport._callbackQueue[0].deferred.resolve(res, status, xhr);
              });

              // find the formdata_id in the callbackQueue and then remove it
              for (var i = 0; i < Transport._callbackQueue.length; i++) {
                if(Transport._callbackQueue[i].id===Transport.formdata_id) {
                  Transport._callbackQueue.splice(i, 1);
                  break;
                }
              }

            } else {

                dequeueId(Transport._callbackQueue, requestedIds, function(item, idx) {

                    // is it a JSON response?
                    let contentType = xhr.getResponseHeader('content-type');
                    if (contentType !== null && contentType.indexOf('application/json') == 0) {
                        // yes, parse it and resolve with data
                        var responseData = JSON.parse(data);
                        var res = responseData.filter(function(msg) {
                            return (item.id == msg.id);
                        })[0];
                    } else {
                        // no, data is raw
                        res = data;
                    }

                    item.deferred.resolve(res, status, xhr);

                })
            }
        }

        var reject = function(xhr, status, err) {
            dequeueId(Transport._callbackQueue, requestedIds, function(item, idx) {
                item.deferred.reject(xhr, status, err);
                Transport._callbackQueue.splice(idx, 1);
            })
        }

        // Java JSON Services are all POST based
        var xhr = new XMLHttpRequest();
        xhr.open('POST', Transport.serviceURL);

        // is this not a FormData dispatch request?
        if (req.data instanceof FormData) {
            // yes, do not set the content-type and use a service name url
            xhr.open('POST', Transport.serviceURL + req.service);
        } else {
            // no, set the content-type and use the default url
            xhr.open('POST', Transport.serviceURL);
            xhr.setRequestHeader('Content-Type', 'application/json');
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

        // is this a FormData object dispatch request ?
        if (req.data instanceof FormData) {
            // yes - send the data component as is
            xhr.send(req.data);
        } else {
            // no - serialise whole request first then send
            xhr.send(JSON.stringify(req));
            //var stringify = require('json-stringify-safe');
            // xhr.send(strinfgify(req));
        }

    }

    // set bus transmit timer
    static _setTimer() {

        // only set the timer if queue is empty
        if (Transport._msgQueue.length == 0) {

            var context = this;

            setTimeout(function() {

                // get all ids in currect request
                var requestedIds = Transport._msgQueue.map(function(m) {
                    return m.id
                })

                // dispatch ids from queue
                Transport._dispatchRequest(Transport._msgQueue, requestedIds);

                // all messages dispatched, clear queue
                Transport._msgQueue.length = 0;

            }, 10);
        }
    }

}
