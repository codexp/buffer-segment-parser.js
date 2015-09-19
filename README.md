# Buffer segment parser

This are **ES6** classes for splitting data buffer into segments and emitting 'segment' event.

**JSON** segment parser additionally parses segment data into a javascript hash object and emits the 'json' event.

### Example

**Simple** parser:

```javascript
var BufferParser = require('@codexp/buffer-segment-parser').Simple;

var parser = new BufferParser('\n', 'utf8'); // given params are defaults and can be omitted
client.on('data', parser.parser()); // parser method returns a parser function
parser.on('segment', function (line) {
    console.log('Msg: ' + line);
});
```

**JSON** parser:

```javascript
var JSONBufferParser = require('@codexp/buffer-segment-parser').JSON;
var util = require('util');

var parser = new JSONBufferParser('\n', 'utf8'); // given params are defaults and can be omitted
client.on('data', parser.parser()); // parser method returns a parser function
parser
    .on('json', function(json) {
        console.log('json: ' + util.inspect(json));
    })
    .on('error', function (err) {
        console.log('error: invalid json: ' + util.inspect(err));
    });

```
