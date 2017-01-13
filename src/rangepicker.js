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
        className: 'range-picker',
        disabledClass: 'range-picker--disabled',
        range: {
            size: 10,
            step: 10
        }
    };

    /**
    * RangePicker
    * @public
    */
    function RangePicker(element, options) {
        this.element = element;
        if (options && typeof options === 'object') {
            this.options = extendDefaults(defaults, options);
        }

        this.element.classList.add(this.options.className);
        renderRangeItems.call(this);
    }


    /**
    * @private
    */

    function renderRangeItems() {
        var i,
            item;
        for (i=0; i<this.options.range.size; i++) {
            item = document.createElement('div');
            this.element.appendChild(item);
        }
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function init(element, options) {
        return new RangePicker(element, options);
    }

    return init
});
