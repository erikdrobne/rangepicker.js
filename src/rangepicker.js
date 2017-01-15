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
        height: 100,
        range: {
            size: 10,
            step: 10
        }
    },
    constants = {
        className: 'range-picker',
        rangeItemClass: 'range-picker__item',
        rangeItemSelectedClass: 'range-picker__item--selected'
    };

    function RangePicker(element, options) {
        this.element = element;
        this.rangeItems = [];
        this.constants = constants;

        if (options && typeof options === 'object') {
            this.options = extendDefaults(defaults, options);
        }
        this.element.classList.add(this.constants.className);
        setRangePickerStyle.call(this);
        renderRangeItems.call(this);
    }

    function setRangePickerStyle() {
        this.element.style.height = this.options.height + "px";
    }

    function renderRangeItems() {
        var i,
            item,
            itemWidth = this.element.clientWidth / this.options.range.size;

        for (i=0; i<this.options.range.size; i++) {
            item = document.createElement('div');
            item.setAttribute('data-id', i);
            item.classList.add(this.constants.rangeItemClass);
            item.style.display = 'inline-block';
            item.style.width = itemWidth + 'px';
            item.style.height = this.element.clientHeight + 'px';
            this.rangeItems.push(item);
            handleRangeItemSelect(item);
            this.element.appendChild(item);
        }
    }

    function handleRangeItemSelect(rangeItem) {
        rangeItem.addEventListener('mouseover', function(e) {
            if(e.which === 1) {
                console.log('mouseover', e.which);
            }
        });
        rangeItem.addEventListener('mousedown', function(e) {
            var index = parseInt(e.target.getAttribute('data-id'));
            console.log(index);
        });
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

    function init(element, options) {
        return new RangePicker(element, options);
    }

    return init;
});
