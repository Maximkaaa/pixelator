define(['../lib/protoJS', '../lib/IEventHandler'], function(proto, IEventHandler) {

    var Layer = proto({
        width: 0,
        height: 0,
        scale: 1,

        canvas: {set: null},
        ctx: {set: null},

        _construct: function(options) {
            proto.init(this, options);
            this._setNode();
        },

        _mixin: IEventHandler,

        _setNode: function() {
            this._canvas = document.createElement('canvas');
            this._canvas.width = this.width * this.scale;
            this._canvas.height = this.height * this.scale;

            this._ctx = this._canvas.getContext('2d');
        },

        setPoint: function(x, y, size, color) {
            this._ctx.fillStyle = color;
            var sizeAdj = Math.floor(size) * this.scale;
            var d = Math.floor((size  - 1) / 2);
            this._ctx.fillRect(Math.floor(x - d) * this.scale, Math.floor(y - d) * this.scale, sizeAdj, sizeAdj);

            this.fire('imageUpdate');
        }
    });

    return Layer;
});