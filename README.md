# rangepicker.js
<a href="https://www.npmjs.com/package/rangepicker.js"><img src="https://img.shields.io/npm/v/rangepicker.js.svg" alt="Version"></a>

![rangepicker.js](rangepicker.png)

## Installation

```bash
$ npm install rangepicker.js
```
or clone repository.

Pre build files can be found in the ```/build``` folder.
Include ```rangepicker.js``` and(optionally) ```rangepicker.css``` in your project.

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
`element` | Element where you would like to initialize ```rangepicker.js```. |
`options` | An object containing configuration options. Pass ```{}``` for defaults. |

#### Options

Option | Description
--- | ---
`range` | An object containing range options. It consists of ```size```, ```step``` and ```value``` parameters. |
`orientation` | Component orientation. Possible values ```horizontal | vertical```. Default ```horizontal```. |
`itemHeight` | Range item height in ```px```. It will take effect in ``` horizontal``` mode. |
`itemWidth` | Range item width in ```px```. It will take effect in ``` vertical``` mode. |
`disabled` | Default ```false```. If ```true```, component will be disabled.
`onInitialize` | ```callback```, fired when component is initialized.


### Methods

Usage: ```rp.methodName()```

Method | Description
--- | ---
`setValue(value)` | Sets given value. |
`getValue()` | Returns the component current value. |
`next()` | Sets next range value. |
`prev()` | Sets previous range value. |
`enable()` | Enables component. |
`disable()` | Disables component. |
`on(event, handler)` | Adds event listener. |

### Events

Event | Description
--- | ---
`rp.change` | Fired when value is changed. |

## Contribution

1. Fork it
2. Create feature branch
3. Commit changes
4. Push to the branch
5. Create new pull request
