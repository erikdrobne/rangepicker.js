# rangepicker.js

## Installation

Pre build files can be found in the ```/build``` folder.

Include ```rangepicker.js``` and/or ```rangepicker.css```

## Usage

```html
<div id="rangePicker"></div>
```
```javascript
var element = document.getElementById('rangePicker');
var rp = rangepicker(element, options);
```

## API

### Properties

Property | Description
--- | ---
`element` | Element where you would like to initialize ```rangepicker.js``` |
`options` | An object containing configuration options. Pass ```{}``` for default |

#### Options

Option | Description
--- | ---
`range` | An object containing range options. It consists of ```size```, ```step``` and ```value``` parameters |

### Methods

Usage: ```javascript rp.methodName() ```

Method | Description
--- | ---
`setValue(value)` | Set given value |
`on(event, handler)` | Adds event listener |
