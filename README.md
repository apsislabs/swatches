# Swatches

## Generating Swatches

There are two ways to generate swatches for your Sketch document.

### Basic

Select `Plugins > Swatches > Make Swatches...` and enter a comma-separated list of hex values:

```
"#e74c3c, #e67e22, #f1c40f, #2ecc71, #3498db, #9b59b6"
```

This will generate a group on your currently selected page named `Color Swatches`.

![](assets/images/swatches.png)

### Advanced

Select `Plugins > Swatches > Make Swatches...` and enter a JSON array of color objects. This will allow you to name the swatches before they are generated:

```
[
    {"hex": "#e74c3c", "name": "Alizarin"},
    {"hex": "#e67e22", "name": "Carrot"},
    {"hex": "#f1c40f", "name": "Sunflower"},
    {"hex": "#2ecc71", "name": "Emerald"},
    {"hex": "#3498db", "name": "Peter River"},
    {"hex": "#9b59b6", "name": "Amethyst"}
]
```

![](assets/images/swatches_advanced.png)

## Thanks

This plugin is adapted from https://github.com/jodyheavener/Swatches. Thanks to [jodyheavener](https://github.com/jodyheavener) for his original work.

Thanks also to the folks over at https://flatuicolors.com/ for the default colors and names.