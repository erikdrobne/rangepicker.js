(function (win, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(win));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory();
    } else {
        win.rangepicker = factory(win);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (win) {
    var defaults = {
        range: {
            size: 10,
            step: 10,
            value: 40
        },
        orientation: 'horizontal',
        disabled: false
    },
    namespace = 'rp',
    constants = {
        classes: {
            rangepicker: 'rangepicker',
            rangepickerDisabled: 'rangepicker--disabled',
            rangeItem: 'rangepicker__item',
            rangeItemSelected: 'rangepicker__item--selected'
        },
        events: {
            onChange: namespace + '.change'
        }
    };

    /**
     * RangePicker
     * @param {Object} element
     * @param {Object} options
     */
    function RangePicker(element, options) {
        this.element = element;
        this.rangeItems = [];
        this.constants = constants;
        if (options && typeof options === 'object') {
            this.options = privateMethods.helpers.extendDefaults(defaults, options);
        }
        this.selectedValue = this.options.range.value;
        this.element.classList.add(this.constants.classes.rangepicker);

        privateMethods.renderRangeValue = privateMethods.renderRangeValue.bind(this);
        privateMethods.setRangePicker.call(this);
        privateMethods.setRangeItemSize = privateMethods.setRangeItemSize.call(this);
        privateMethods.renderRangeItems.call(this);
        privateMethods.renderRangeValue();
        privateMethods.handleTouchSelect.call(this);
    }

    RangePicker.prototype.setValue = function(value) {
        var range = this.options.range;
        range.value = value;
        privateMethods.renderRangeValue();
        this.element.dispatchEvent(privateMethods.getChangeEvent(range.value));
    };

    RangePicker.prototype.getValue = function() {
        return this.options.range.value;
    };

    RangePicker.prototype.enable = function() {
        if(this.options.disabled === true) {
            this.options.disabled = false;
            this.element.classList.remove(
                this.constants.classes.rangepickerDisabled
            );
        }
    };

    RangePicker.prototype.disable = function() {
        if(this.options.disabled === false) {
            this.options.disabled = true;
            this.element.classList.add(
                this.constants.classes.rangepickerDisabled
            );
        }
    };

    RangePicker.prototype.next = function() {
        var range = this.options.range;
        if(range.step * range.size !== range.value) {
            range.value += range.step;
            privateMethods.renderRangeValue();
            this.element.dispatchEvent(privateMethods.getChangeEvent(range.value));
        }
    };

    RangePicker.prototype.prev = function() {
        var range = this.options.range;
        if(range.value !== 0) {
            range.value -= range.step;
            privateMethods.renderRangeValue();
            this.element.dispatchEvent(privateMethods.getChangeEvent(range.value));
        }
    };

    RangePicker.prototype.on = function(eventName, handler) {
        this.element.addEventListener(eventName, function(e) {
            handler(e.detail.value);
        });
    };

    var privateMethods = {
        setRangeItemSize: setRangeItemSize,
        setRangePicker: setRangePicker,
        renderRangeItems: renderRangeItems,
        renderRangeValue: renderRangeValue,
        handleSelect: handleSelect,
        handleTouchSelect: handleTouchSelect,
        getChangeEvent: getChangeEvent,
        helpers: {
            extendDefaults: extendDefaults
        }
    };

    /**
     * calculate size options
     *
     */
    function setRangeItemSize() {
        switch (this.options.orientation) {
            case 'horizontal':
                this.options.itemWidth =
                    this.element.clientWidth / this.options.range.size;
                if(!this.options.hasOwnProperty('itemHeight')) {
                    this.options.itemHeight = this.options.itemWidth;
                }
                break;
            case 'vertical':
                this.options.itemHeight =
                    this.element.clientHeight / this.options.range.size;
                if(!this.options.hasOwnProperty('itemWidth')) {
                    this.options.itemWidth = this.options.itemHeight;
                }
                break;
            default:
                break;
        }
    }

    /**
     * set range picker properties
     *
     */
    function setRangePicker() {
        if(this.options.disabled === true) {
            this.element.classList.add(
                this.constants.classes.rangepickerDisabled
            );
        }

        switch (this.options.orientation) {
            case 'horizontal':
                this.element.style.width = '100%';
                this.element.style.height = 'auto';
                break;
            case 'vertical':
                this.element.style.height = '100%';
                this.element.style.width = 'auto';
                break;
            default:
                break;
        }
    }

    /**
     * render range items
     *
     */
    function renderRangeItems() {
        var i,
            item;
        for(i=0; i<this.options.range.size; i++) {
            item = document.createElement('div');
            item.setAttribute('data-value', (i + 1) * this.options.range.step);
            item.classList.add(this.constants.classes.rangeItem);
            item.style.width = this.options.itemWidth + 'px';
            item.style.height = this.options.itemHeight + 'px';

            switch (this.options.orientation) {
                case 'horizontal':
                    item.style.display = 'inline-block';
                    this.element.appendChild(item);
                    break;
                case 'vertical':
                    item.style.display = 'block';
                    if(this.element.hasChildNodes()) {
                        this.element.insertBefore(item, this.element.firstChild);
                    } else {
                        this.element.appendChild(item);
                    }
                    break;
                default:
                    break;
            }
            this.rangeItems.push(item);
            privateMethods.handleSelect.call(this, item);
        }
    }

    /**
     * render selected range
     *
     */
    function renderRangeValue() {
        var i,
            range = this.options.range,
            index = parseInt(range.value/range.step) - 1,
            rangeItem;

        for(i=0; i<this.rangeItems.length; i++) {
            rangeItem = this.rangeItems[i];
            if(i<=index) {
                rangeItem.classList.add(
                    this.constants.classes.rangeItemSelected
                );
            } else {
                rangeItem.classList.remove(
                    this.constants.classes.rangeItemSelected
                );
            }
        }
    }

    /**
     * handle mouseclick select
     *
     * @param  {Object} rangeItem
     */
    function handleSelect(rangeItem) {
        rangeItem.addEventListener('mousedown', function(e) {
            var value = parseInt(e.target.getAttribute('data-value')),
                range = this.options.range;
            if(value === range.step && range.value === range.step) {
                this.setValue(0);
            } else {
                if(value !== range.value) {
                    this.setValue(value);
                }
            }
        }.bind(this));
    }

    /**
     * handle touch select
     *
     */
    function handleTouchSelect() {
        var currentElement,
            value = this.options.range.value;
        this.element.addEventListener('touchmove', function(e) {
            currentElement = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            );

            if(currentElement) {
                if(currentElement.classList.contains(this.constants.classes.rangeItem)) {
                    value = parseInt(currentElement.getAttribute('data-value'));
                    if(this.options.range.value !== value) {
                        this.setValue(value);
                    }
                }
            }
        }.bind(this));
    }

    /**
     * get value change event
     *
     * @param  {Number} value
     * @return {CustomEvent}
     */
    function getChangeEvent(value) {
        return new CustomEvent(
            constants.events.onChange, {
                detail: { value: value }
            }
        );
    }

    /**
     * extend defaults with properties
     *
     * @param  {Object} source
     * @param  {Object} properties
     * @return {Object}
     */
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    /**
     * initialize
     *
     * @param  {Object} element
     * @param  {Object} options
     * @return {RangePicker}
     */
    function init(element, options) {
        return new RangePicker(element, options);
    }

    return init;
});
