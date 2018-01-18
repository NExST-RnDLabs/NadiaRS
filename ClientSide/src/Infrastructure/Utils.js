export default class Utils {
    static getDifferentDays(date1, date2)
    {
      let fromParts = date1.split(' ');
      let dateDate1 = fromParts[0].split('-');
      let timeDate1 = fromParts[1].split(':');

      let toParts = date2.split(' ');
      let dateDate2 = toParts[0].split('-');
      let timeDate2 = toParts[1].split(':');

      dateDate1 = new Date(dateDate1[0], parseInt(dateDate1[1])-1, dateDate1[2], timeDate1[0], timeDate1[1]);
      dateDate2 = new Date(dateDate2[0], parseInt(dateDate2[1])-1, dateDate2[2], timeDate2[0], timeDate2[1]);

      let date1_ms = dateDate1.getTime();
      let date2_ms = dateDate2.getTime();
      let difference_ms = date2_ms - date1_ms;

      return difference_ms;
    }

    static isSameDay(date1, date2)
    {
      date1 = date1.split('-');
      if (date2 != null) {
        date2 = date2.split('-');
      } else {
        // get current date - assume they're still serving?
        let curDate = new Date();
        date2 = [curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()];
      }

      return date1[0]==date2[0] && date1[1]==date2[1] && date1[2]==date2[2]?true:false;
    }

    static checkNull(data)
    {
      if((typeof data != 'undefined' && data != null) || typeof data == '')
        return data;
        else {
          return ' '
      }
    }

    static jsonToQueryString(json) {
        let params = Object.keys(json)
            .filter(function(key) {
                // filter out null values
                return (json[key] != null);
            })
            .map(function(key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            });

        // deal with case of empty object
        return (params.length && params.join('&') || '');
    }

    //Pad an input string with up to max zeroes - will attempt a conversion to string
    static padStr(str, max) {
        str = str.toString();
        return str.length < max ? Utils.padStr('0' + str, max) : str;
    }

    static toISODate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        var result = yyyy + '-' + mm + '-' + dd;

        return result;
    }

    static toISODateTime(date) {
        var hh = date.getHours();
        var min = date.getMinutes();
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        if(hh < 10) {
          hh = '0' + hh
        }

        if(hh < 10) {
          hh = '0' + hh
        }
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        var result = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;

        return result;
    }
    //Return a string yyyy-mm-dd of today's date
    static todayAsISODate() {

        var today = new Date();
        return Utils.toISODate(today);
    }

    static todayASISODateTime() {
        var today = new Date();
        return Utils.toISODateTime(today);
    }

    // takes a Date object or ISO date string, and returns a date string in dd/mm/yyyy format
    static toAussieDate(date) {
      let dd = '';
      let mm = '';
      let yyyy = '';
      let result = '';

      try {
        switch (typeof date) {
          case 'object':
            if (date.constructor.name == 'Date') {
              dd = date.getDate();
              mm = date.getMonth() + 1; //January is 0!
              yyyy = date.getFullYear();
            }
            break;

          case 'string': // Assume ISO date.
            [yyyy, mm, dd] = date.split('-');
            yyyy = Number.parseInt(yyyy);
            mm = Number.parseInt(mm);
            if(typeof dd != 'undefined')
            dd = Number.parseInt(dd);
            break;
        }

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        result = typeof dd != 'undefined'?dd + ' / ' + mm + ' / ' + yyyy:mm + ' / ' + yyyy;

      } catch (e) {
        //result = 'Invalid date parameter.';
        result='';
      }
      return result;
    }

    // returns formated human readable file sizes
    static formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1024;
        var dm = decimals + 1 || 2;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    static scrollTo(node, activeStatus) {
      var settings = {
  			duration: 1000,
  			easing: {
  				outQuint: function (x, t, b, c, d) {
  					return c*((t=t/d-1)*t*t*t*t + 1) + b;
  				}
  			}
  		};
  		var percentage;
  		var startTime;
  		var nodeTop = node.offsetTop;
  		var nodeHeight = node.offsetHeight;
  		var body = document.body;
  		var html = document.documentElement;

      var cardHeight=0;
      if(activeStatus == 'Submitted' || activeStatus == 'Review')
      {
        cardHeight = document.getElementById('card')!=null?document.getElementById('card').offsetHeight-50:0; //50 is div ui container height
      } else {
        cardHeight = 0;
      }

  		var height = Math.max(
  			body.scrollHeight,
  			body.offsetHeight,
  			html.clientHeight,
  			html.scrollHeight,
  			html.offsetHeight
  		);
  		var windowHeight = window.innerHeight
  		var offset = window.pageYOffset;
      var delta = nodeTop + cardHeight - offset;
  		var bottomScrollableY = height;
  		var targetY = (bottomScrollableY < delta) ?
  			bottomScrollableY - (height - nodeTop - nodeHeight + offset):
  			delta;

  		startTime = Date.now();
  		percentage = 0;

  		if (this.timer) {
  			clearInterval(this.timer);
  		}

  		function step () {
  			var yScroll;
  			var elapsed = Date.now() - startTime;

  			if (elapsed > settings.duration) {
  				clearTimeout(this.timer);
  			}

  			percentage = elapsed / settings.duration;

  			if (percentage > 1) {
  				clearTimeout(this.timer);
  			} else {
  				yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
  				window.scrollTo(0, yScroll);
  				this.timer = setTimeout(step, 10);
  			}
  		}
  		this.timer = setTimeout(step, 10);
  	}

    static scrollUpOnlyTo(element) {
      var bodyRect = document.body.getBoundingClientRect(),
          elemRect = element.getBoundingClientRect(),
          offset   = elemRect.top - bodyRect.top;
      var navOffset = document.getElementsByTagName('nav')[0] !== undefined ? document.getElementsByTagName('nav')[0].offsetHeight - 10 : 0;
      var target = offset - navOffset; // Account for header size and some free space


      var startPosition = window.pageYOffset;
      var duration = 1000;
      if (target < startPosition) {
        function step() {
          var now = Date.now();
          var elapsed = now - startTime;
          if (elapsed > duration) elapsed = duration;

          window.scroll(0, Utils.outQuint(0, elapsed, startPosition, target - startPosition, duration));
          if (elapsed < duration) setTimeout(step, 10);
        }

        var startTime = Date.now();
        setTimeout(step, 10);
      }
    }

    static scrollDownOnlyTo(element) {
      var bodyRect = document.body.getBoundingClientRect(),
          elemRect = element.getBoundingClientRect(),
          offset   = elemRect.top - bodyRect.top;
      var navOffset = document.getElementsByTagName('nav')[0] !== undefined ? document.getElementsByTagName('nav')[0].offsetHeight - 10 : 0;
      var target = offset - navOffset; // Account for header size and some free space


      var startPosition = window.pageYOffset;
      var duration = 1000;
      function step() {
        var now = Date.now();
        var elapsed = now - startTime;
        if (elapsed > duration) elapsed = duration;

        window.scroll(0, Utils.outQuint(0, elapsed, startPosition, target - startPosition, duration));
        if (elapsed < duration) setTimeout(step, 10);
      }

      var startTime = Date.now();
      setTimeout(step, 10);
    }

    static outQuint(x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		}

    // nl2br
    static nl2br(data) {
      if (data != null && typeof data == 'string') {
        let newData = data.replace(new RegExp('\r\n', 'g'), '<br />');
        newData = newData.replace(new RegExp('\n', 'g'), '<br />');
        return newData;
      }
      return data;
    }

    // br2nl
    static br2nl(data) {
      if (data != null && typeof data == 'string') {
        let newData = data.replace(new RegExp('<br>', 'g'), '\n');
        newData = newData.replace(new RegExp('<br/>', 'g'), '\n');
        newData = newData.replace(new RegExp('<br />', 'g'), '\n');
        return newData;
      }
      return data;
    }

    static toAussieDateWithMonthName(date) {
      let dd = '';
      let mm = '';
      let yyyy = '';
      let result = '';

      try {
        switch (typeof date) {
          case 'object':
            if (date.constructor.name == 'Date') {
              dd = date.getDate();
              mm = date.getMonth() + 1; //January is 0!
              yyyy = date.getFullYear();
            }
            break;

          case 'string': // Assume ISO date.
            [yyyy, mm, dd] = date.split('-');
            yyyy = Number.parseInt(yyyy);
            mm = Number.parseInt(mm);
            if(typeof dd != 'undefined')
            dd = Number.parseInt(dd);
            break;
        }

        if (dd < 10) {
            dd = '0' + dd
        }

        result = dd + ' ' + Utils.getMonthName(mm) + ' ' + yyyy;

      } catch (e) {
        //result = 'Invalid date parameter.';
        result='';
      }
      return result;
    }

    static getMonthName(date) {
      var monthName = ['January','February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return monthName[date-1];
    }

    static setTime(date) {
      var hours = date.split(':')[0];
      var minutes = date.split(':')[1];
      date = (hours >= 12 && hours < 24)
        ? ((hours==12)?12:(hours-12))+':'+minutes+' PM AEST'
        : ((hours==24 || hours==0)?(12+':'+minutes):date)+' AM AEST';
      return date;
    }

    static getCurrentPageName(removeReactRouterParameterStrings) {
      let addressArr = window.location.href.split('#');

      // Note: this is NOT for RFC 3986 query strings - this is for parameters
      // to React Router when changing page, which resembles a query string.
      if (removeReactRouterParameterStrings === true) {
        if (addressArr[1] != null) {
          addressArr[1] = addressArr[1].split('?')[0];
        } else {
          addressArr[0] = addressArr[0].split('?')[0];
        }
      }

      return (addressArr.length==2) ? addressArr[1] : 'Landing page';
    }

    static resetTabIndexSelection() {
      // this is a hack = this will force tab selection to reset to top of
      // page after a navigation update. (used by the **AppComponent top-level classes)
      let topSelectHack = document.getElementById('content');
      topSelectHack.setAttribute('tabindex','0');
      topSelectHack.focus();
      topSelectHack.removeAttribute('tabindex');
    }

    // Borrowed from: https://stackoverflow.com/a/7394787
    static decodeHtml(html) {
      let txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }

    static smoothScrollTo(element, to, duration) {
        if (duration <= 0) {
          element.scrollTop = 0;
          return;
        }

        let difference = to - element.scrollTop;
        let perTick = difference / duration * 10;

        let component = this;
        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            component.smoothScrollTo(element, to, duration - 10);
        }, 10);
    }

    // needed to handle strange cases where click does not fire on <a> tags
    // that do not have a href.  note that they will still need a tabIndex={0}
    // for the fields to be tab-accessible via keyboard without an href.
    // Or you could just use href="javascript:void(0);"
    static handleKeyboardClick(e) {
      if (e != null) {
        if (e.key != null && e.key == 'Enter') {
          if (e.target != null) {
            e.target.click();
          }
        }
      }
    }

    // Used to compare the curent realm (auth, unauth, staff) with the list of realms passed in
    // This can be used to handle realm based logic.
    // realmlist format: 'realm: { auth: false, unauth: false}'
    static compareRealms(realm, realmList) {
      if(realmList != null) {
        if(realmList[realm]!=null)
          return realmList[realm]
        else
          return false
        } else {
          return false;
        }
    }

    // Used to trim strings down to a specified max length and append a specified string to the
    // end (i.e. an ellipses)
    // Example: trimLongStr('reallyreallyreallylong', 18, '...') returns
    // reallyreallyreally...
    static trimLongStr(str, max, end) {
      let trimStr = str;
      if(typeof str != 'undefined' && str != null) {
        if(str.length > max) {
          trimStr = str.substr(0, max) + end;
        }
      }
      return trimStr;
    }

    // Used to re-write minified JSON with indentations
    static prettyJSON(json) {
      //Check if we have an object already.
      if( json === Object(json))
        return JSON.stringify(json, null, '  ');

      let obj = JSON.parse(json);
      return JSON.stringify(obj, null, '  ');
    }


    // Returns index of array item based on property and value
    static getIndex(value, arr, prop) {
      if(arr != null) {
        for(var i = 0; i < arr.length; i++) {
          if(arr[i][prop] === value) {
            return i;
          }
        }
      }
      return -1; //to handle the case where the value doesn't exist
    }

    // Returns actual element from an array based on the fieldName Property
    static getServerErrorFor(value, serverErrors) {
      if (serverErrors == null) return null;
      
      return serverErrors.find((element) => { return element.fieldName === value; });
    }

    // Needed for enabling/disabling browser scroll bar (eg: for modal display).
    // As browser body exists outside of React DOM, this needs to be handled
    // directly. (See: https://stackoverflow.com/questions/39962757/prevent-scrolling-using-css-on-react-rendered-components)
    static showScrollBar(flag) {
      document.body.style.overflow = (flag == false) ? 'hidden' : 'auto';
    }
}
