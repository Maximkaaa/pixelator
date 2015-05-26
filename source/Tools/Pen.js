define(['../../lib/protoJS', '../../lib/eventJS'], function(proto, event) {

    var Pen = proto({
        size: 1,
        color: 'black',

        sprite: {
            set: function(sprite) {
                this._sprite = sprite;
                this._setListeners();
            }
        },

        _construct: function(options) {
            proto.init(this, options || {});
        },

        _setListeners: function() {
            this._mouseDownHandler = event.add(this._sprite.node, 'mousedown', this._onMouseDown.bind(this));
        },

        _onMouseDown: function(e) {
            if (this._mouseMoveHandler) this._clearHandlers();

            var layer = this.sprite.activeLayer;
            if (e.target === layer.canvas) {
                layer.setPoint(e.offsetX / layer.scale, e.offsetY / layer.scale, this.size, this.color);
            }

            this._mouseMoveHandler = event.add(this._sprite.node, 'mousemove', this._onMouseMove.bind(this));
            this._mouseUpHandler = event.add(document.body, 'mouseup', this._onMouseUp.bind(this));
        },

        _onMouseMove: function(e) {
            var layer = this.sprite.activeLayer;
            if (e.target === layer.canvas) {
                layer.setPoint(e.offsetX / layer.scale, e.offsetY / layer.scale, this.size, this.color);
            }
        },

        _onMouseUp: function(e) {
            this._clearHandlers();
        },

        _clearHandlers: function() {
            event.remove(this._sprite.node, 'mousemove', this._mouseMoveHandler);
            event.remove(document.body, 'mouseup', this._mouseUpHandler);

            this._mouseMoveHandler = null;
            this._mouseUpHandler = null;
        }
    });

    return Pen;

});