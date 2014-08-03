/*!
 * Matcha - High-res timer for Node.js
 * Copyright(c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Primary Export
 */

module.exports = Timer;

/**
 * Timer (constructor)
 *
 * Constructs a timer that will return a high accuracy
 * elapsed calculation.
 *
 * @api public
 */

function Timer () {
  this._start = null;
  this._elapsed = null;
  this._paused = false;
  this._pausedElapsed = 0;
}

/**
 * .elapsed
 *
 * Calculate the milliseconds elapsed time
 * for the given elapsed hrdiff.
 *
 * @returns Number ms elapsed since start
 */

Object.defineProperty(Timer.prototype, 'elapsed',
  { get: function () {
      if (!this._elapsed) return null;

      var el = this._elapsed,
          total = el[0] * 1e9 + el[1];

      if (this._pausedElapsed) {
        total += this._pausedElapsed;
      }

      return total * 1e-6;
    }
});

/**
 * .start ()
 *
 * Mark the starting point for this timer.
 *
 * @api public
 */

Timer.prototype.start = function () {
  this._start = process.hrtime();
  return this;
};

Timer.prototype.pause = function () {
  this.stop();
  this._pausedElapsed += this._elapsed[0] * 1e9 + this._elapsed[1];
  return this;
};

/**
 * .stop ()
 *
 * Mark the stopping point for this timer.
 * using hrtimes built in differ capability.
 *
 * @api public
 */

Timer.prototype.stop = function () {
  this._elapsed = process.hrtime(this._start);
  return this;
};
