export default class Completion {
    constructor(callback) {
        this._flags = [];
        this._callback = callback;
        this._count = 0;
    }

    // wait on this flag to be signaled
    wait = (flagName) => {
      if (typeof flagName != 'undefined') {
        this._flags[flagName] = false;
      }
      else {
        this._flags['_flag'+this._count] = false;
        this._count++;
      }
    }

    // signal this flag, this may cause completion
    signal = (flagName) => {
      if (typeof flagName != 'undefined') {
        this._flags[flagName] = true;
      }
      else {
        this._count--;
        this._flags['_flag'+this._count] = true;
      }

      // check if we're complete and fire callback
      if(this._check())
        this._callback();
    }

    // private method: checks all flags
    _check() {

        // loop through flags
        var map = this._flags;
        let set = true;
        for (let flag in map) {
            set = set && map[flag];
        }
        // we're complete if none are false
        return set;
    }
}
