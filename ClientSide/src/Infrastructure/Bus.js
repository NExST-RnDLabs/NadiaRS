 import Utils from './Utils';
import Transport from './Transport';

export default class Bus {

    // *************************************************************************
    // Public bus API
    // *************************************************************************
    // reload     -- reloads the application script - for a change in realms without changing route
    // root       -- reloads the application script and navigates to root location / for the home screen
    // navigate   -- navigate to a new relative link location
    // error      -- navigate to the error page #error (a route to this page must still be defined)
    // open       -- open link in a new browser window
    //
    // query      -- sends a query service request to the server by doing a batched HTTP POST
    // command    -- sends a command service request to the server by doing a batched HTTP POST
    // download   -- starts off a file download by navigating to the service by doing a HTTP GET
    // upload     -- sends a FormData object to the server by doing a HTTP POST
    //
    // publish    -- publishes an event and passes event data to all registered callbacks
    // subscribe  -- subscribes to an event and registers a callback
    // unregister -- clears all subscriptions to a named event
    //
    // realm      -- gets or sets the security realm
    // *************************************************************************

    // *************************************************************************
    // Bus events - in built events
    // *************************************************************************
    // transport.fail    -- transport layer has returned an error
    // bus.error         -- an error response was sent back on the bus
    // router.navigate   -- client router navigation event occured
    //
    // *************************************************************************


    // reloads the application script - for a change in realms without changing route
    static reload() {

        // ATTEMPT 2:
        // This is the only way I can get webpack to reload a bundle
        // that had previously been loaded - a page refresh.
        location.reload();


        // ATTEMPT 1: -- This works, except when reloading a bundle already loaded
        // // remove old app script tag
        // let appTag = document.getElementById('app');
        // if (appTag.parentNode != null) {
        //     appTag.parentNode.removeChild(appTag);
        // }
        //
        // // create new app script tag
        // let script = document.createElement('script');
        // script.id = 'app';
        // script.src = 'service/app.js?ts=' + Date.now();
        // script.type = 'text/javascript';
        //
        // // animate loder while we wait for app to load
        // animateLoader('react-app');
        //
        // // inject new script tag
        // let body = document.getElementsByTagName('body')[0];
        // body.appendChild(script);
        // ------------------------------------------------------------------
    }

    // reloads the application script and navigates to root location / for the home screen
    static root() {
      Bus.navigate('#');

      // This is needed for IE
      Bus.reload();
    }

    // navigate to a relative location
    static navigate(location, data) {

        var qryStr = '?';

        if (data != null) {
            qryStr += Utils.jsonToQueryString(data);
        } else {
            qryStr = '';
        }

        // navigate to relative location
        window.location.assign(window.location.pathname + window.location.search + location + qryStr);

    }

    // navigate to the error page #error (a route to this page must still be defined)
    static error(data) {
          Bus.navigate('#error', data);
    }

    // open location in a new browser window
    static open(location, data) {

        var qryStr = '?';

        if (data != null) {
            qryStr += Utils.jsonToQueryString(data);
        } else {
            qryStr = '';
        }

        // navigate to relative location
        window.open(location + qryStr, '_blank');

    }

    // event subscription
    static subscribe(event, callback) {

        // is this an event we already know about?
        if (!(event in Bus._subscriptions)) {
            // no, create callback Array
            Bus._subscriptions[event] = []

        }

        // add to callback array
        Bus._subscriptions[event].push(callback);

    }

    // event publication
    static publish(event, data) {

        // is this an event we know about?
        if (event in Bus._subscriptions) {

            let list = Bus._subscriptions[event];

            for (let callback of list)
                callback(event, data);
        }
    }

    // remove all subscriptions registered to this event name
    static unregister(event) {

      if (event in Bus._subscriptions) {
        delete Bus._subscriptions[event];
      }
    }

    // file download
    static download(service, data) {
        var qryStr = '?';

        if (data != null) {
            qryStr += Utils.jsonToQueryString(data);
        } else {
            qryStr = '';
        }

        // navigate

        let navLoc = (window.location.host.indexOf('localhost:') != -1)

            // used for testing locally
            ? window.location.protocol + '//localhost:3030/' + Transport.serviceURL + service + qryStr

            // used in deployed environment
            : window.location.pathname + window.location.search + Transport.serviceURL + service + qryStr;

        //window.location.assign(window.location.pathname + window.location.search + Transport.serviceURL + service + qryStr);
        if (navigator.userAgent.indexOf('MSIE') != -1 || navigator.userAgent.indexOf('Trident') != -1
         || navigator.userAgent.indexOf('Edge') != -1 || (!!window.MSInputMethodContext))
        {
          // Firefox tends not to close new download windows by default. Leaving it to IE/Edge for now
          // but works fine with Chrome..
          let newWin = window.open(navLoc);

          //newWin.onload = function() { close(); };
          //setTimeout(()=>{newWin.close()}, 1000);
          //newWin.addEventListener('load', (e) => { /*newWin.location.assign(newWin);*/ newWin.close(); }, true);
        } else {
          // This does not work well with IE or Edge
          window.location.assign(navLoc);
        }
    }

    // file upload
    static upload(service, data) {
      return Bus._send(service, data);
    }

    // query service
    static query(service, data) {
      return Bus._send(service, data);
    }

    // command service
    static command(service, data) {
      return Bus._send(service, data);
    }

    // gets or sets the security realm
    static realm(realm) {
      // security realm cannot be changed once set
      if ((realm!=null)&&(Bus._realm==null)) {
        Bus._realm = realm;
      }
      return Bus._realm;
    }

    //gets or sets the sessionmode
    static sessionMode(mode) {
      if(mode!=null && !Bus._sessionMode.toUpperCase().includes(mode.toUpperCase())) {
        Bus._sessionMode = mode;
      }
      return Bus._sessionMode;
    }

    // privates beyond this point
    // ----------------------------------------------------------------------

    static _realm = null;
    static _sessionMode = '';

    static _subscriptions = {};

    static _send(service, data) {

        // handle extrnal query:
        // there is no difference between
        // query and command, now you know!
        var deferred = Transport.send(service, data);

        // handle and raise transport fail event
        deferred.fail((xhr, status, statusText) => {
            Bus.publish('transport.fail', {
                'service': service,
                'sentdata': data,
                'status': status,
                'statusText': statusText
            });
        });

        // handle and raise bus error response event
        deferred.done((result, status) => {
            if (result.error) {
                Bus.publish('bus.error', {
                    'service': service,
                    'sentdata': data,
                    'result': result,
                    'status': status
                });
                return false;
            }

            return true;
        });

        return deferred;
    }

};
