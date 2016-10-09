// ********************************
// # SketchSwatches.js
// # Swatches Plugin
//
// Class for generating rounded rects from color input,
// and adding these to the current document page.
// ********************************
class SketchSwatches {
    constructor(context, options) {
        this._doc    = context.document;
        this._page   = this._doc.currentPage();
        this.options = options;
    }

    generate(hexInput) {
        // Add group layer for swatch groups
        const swatchesGroup = MSLayerGroup.alloc().init();

        const swatches = [];

        // For each hex value
        for (let i = 0; i < hexInput.length; i++) {
            const swatchGroup = this._buildSwatchGroup(hexInput[i]['hex'], hexInput[i]['name'], i);
            swatches.push(swatchGroup);
        }

        // Add to Page
        if (swatches.length > 0) {
            swatchesGroup.addLayers(swatches);
            swatchesGroup.resizeToFitChildrenWithOption(0);
            swatchesGroup.name = "Color Swatches"

            this._page.deselectAllLayers();
            this._page.addLayers([swatchesGroup]);
        }

        this._doc.showMessage("Swatches Generated");
    }

    _buildSwatchGroup(hex, name, count) {
        const group     = MSLayerGroup.alloc().init();
        const swatch    = this._buildSwatch(hex);
        const hexLabel  = this._buildText(hex, 12, '#666666');
        const colorName = this._buildText(name, 14);

        // Position Labels
        colorName.frame().setY(this.options.swatchSize + 5);
        hexLabel.frame().setY(this.options.swatchSize + colorName.frame().height() + 5);

        // Position
        group.addLayers([swatch, colorName, hexLabel]);
        group.resizeToFitChildrenWithOption(0);

        group.frame().x = this._getSwatchOffsetX(group.frame().width(), count);
        group.frame().y = this._getSwatchOffsetY(group.frame().height(), count);

        // Name
        group.name = `Swatch - ${hex}`;
        return group;
    }

    _getSwatchOffsetX(width, count) {
        return (width + this.options.offsetX) * (count % 6);
    }

    _getSwatchOffsetY(height, count) {
        return (height + this.options.offsetY) * Math.floor(count / 6);
    }

    _buildText(textValue, fontSize, textColor) {
        const text = MSTextLayer.alloc().init();

        textColor = textColor || '#000000';

        text.stringValue = textValue;
        text.fontSize    = fontSize;
        text.textColor   = MSColor.colorWithSVGString(textColor);
        text.name        = textValue;

        text.adjustFrameToFit();
        text.frame().setWidth(this.options.swatchSize);

        return text;
    }

    _buildSwatch(hex) {
        const swatchRect = MSRectangleShape.alloc().init();
        let swatchGroup;
        let swatchFill;

        swatchRect.frame = MSRect.alloc().initWithRect(NSMakeRect(0, 0, this.options.swatchSize, this.options.swatchSize));
        swatchRect.cornerRadiusFloat = 4.0;

        swatchGroup = MSShapeGroup.shapeWithPath(swatchRect);
        swatchFill  = swatchGroup.style().addStylePartOfType(0);

        swatchFill.color = MSColor.colorWithSVGString(hex);

        return swatchGroup;
    }
}