define(['./Sprite', '../lib/protoJS'], function(Sprite, proto) {

    var spriteClone = proto({
        _proto: new Sprite(),

        _construct: function(original) {
            this.original = original;
            this._setListeners();

            this._layers = [];
            this._setNode();
            this.addLayer(0, 0, this.width, this.height);
            this._update();
        },

        _setListeners: function() {
            this.original.on('imageUpdate', this._update.bind(this));
        },

        _update: function() {
            var originalLayers = this.original.layers;
            this.activeLayer.width = this.width * this.scale;
            for (var i = 0; i < originalLayers.length; i++) {
                this.activeLayer.ctx.drawImage(originalLayers[i].layer.canvas, originalLayers[i].position[0] * this.scale, originalLayers[i].position[1] * this.scale);
            }
        }
    });

    return spriteClone;

});