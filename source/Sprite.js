define(['../lib/protoJS', '../lib/IEventHandler', './Layer'], function(proto, IEventHandler, Layer) {

    var Sprite = proto({
        node: {set: null},
        width: 256,
        height: 256,
        scale: 1,
        activeLayer: null,
        layers: {set: null},

        _construct: function(options) {
            proto.init(this, options || {});

            this._layers = [];

            this._setNode();
            this.addLayer(0, 0, this.width, this.height);
        },

        _mixin: IEventHandler,

        _setNode: function() {
            this._node = document.createElement('div');
            this._updateSize();
        },

        _updateSize: function() {
            this._node.style.width = this.width * this.scale + 'px';
            this._node.style.height = this.height * this.scale + 'px';
        },

        addLayer: function(x, y, width, height) {
            var layer = new Layer({width: width, height: height, scale: this.scale});
            layer.on('imageUpdate', this._onLayerImageUpdate.bind(this, layer));
            this._node.appendChild(layer.canvas);

            this._layers.push({layer: layer, position: [x,y]});
            this.activeLayer = layer;
        },

        _onLayerImageUpdate: function(layer) {
            this.fire('imageUpdate');
        }
    });

    return Sprite;

});