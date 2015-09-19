"use strict";

var EventEmitter = require('events').EventEmitter;

class SimpleParser extends EventEmitter {
    constructor(delimiter, encoding) {
        super();
        this.delimiter = (undefined === delimiter) ? '\n' : String(delimiter);
        this.encoding = String(encoding || 'utf8').toLowerCase();
        this._buffer = '';
    }

    parser(data) {
        if (undefined === data) {
            return this.parser.bind(this);
        }

        this._buffer += data.toString(this.encoding);

        if (this._buffer.indexOf(this.delimiter) >= 0) {
            var segments = this._buffer.split(this.delimiter);
            for (var i = 0; i < segments.length - 1; ++i) {
                this.emit('segment', segments[i]);
            }
            // keep unterminated segment in buffer
            this._buffer = segments[i];
        }
    }
}

class JsonParser extends SimpleParser {
    constructor() {
        super();
        this.on('segment', function (data) {
            try {
                this.emit('json', JSON.parse(data));
            } catch (e) {
                if (this.listenerCount('error')) {
                    this.emit('error', e);
                } else {
                    throw e;
                }
            }
        });
    }
}

module.exports = {
    Simple: SimpleParser,
    JSON: JsonParser
};
