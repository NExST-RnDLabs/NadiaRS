export default class Deferred {
    constructor() {
        this._done = [];
        this._fail = [];
    }

    promise = () => {

      return({
          done: this.done,
          fail: this.fail
      });

    }

    execute = (list, args) => {

        // convert arguments to an array
        // so they can be sent to the
        // callbacks via the apply method
        args = Array.prototype.slice.call(args);

        for (let item of list) {
            let ok = item.apply(null, args);
            if(!ok) break;
        }
    }

    resolve = (...args) => {
        this.execute(this._done, args);
    }

    reject = (...args) => {
        this.execute(this._fail, args);
    }

    done = (callback) => {
        this._done.push(callback);
    }

    fail = (callback) => {
        this._fail.push(callback);
    }
}
