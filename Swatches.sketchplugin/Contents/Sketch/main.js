// ********************************
// Swatches Plugin
//
// Author: Wyatt Kirby
// Version: 1.0.0
// ********************************

@import './SketchSwatches.js';
@import './DefaultOptions.js';
@import './UserInput.js';
@import './Examples.js';

const SharedApplication = NSApplication.sharedApplication();

// Basic Action Handler
//
// Handle user input from a comma-delimmted string of HEX codes
function onRun(context) {
    try {
        hexInput = context.document.askForUserInput_initialValue(
            "Please enter a sequence of HEX values",
            EXAMPLE_HEX_STRING
        );
    } catch (e) {
        SharedApplication.displayDialog_withTitle("There was an error processing your hex string", "Hex Input Error")
    }

    if (hexInput) {
        hexInput = formatHexObjectFromString(hexInput);
        generateSwatches(context, hexInput);
    }
}

// Advanced Action Handler
//
// Handle user input from a formatted JSON object
function onAdvancedRun(context) {
    let hexInput;

    try {
        hexInput = JSON.parse(UserInput.askForUserInputWithTextField(
            "Please enter JSON definition for colors",
            JSON.stringify(EXAMPLE_HEX_OBJECT)
        ));
    } catch (e) {
        SharedApplication.displayDialog_withTitle("There was an error processing your JSON", "JSON Error");
    }

    if (hexInput && hexInput.length > 0) {
        generateSwatches(context, hexInput);
    }
}

function generateSwatches(context, hexInput) {
    try {
        var swatches = new SketchSwatches(context, DefaultOptions);
        swatches.generate(hexInput);
    } catch(e) {
        SharedApplication.displayDialog_withTitle(`Error while generating swatches: ${e}`, "Swatch Error");
    }
}

function formatHexObjectFromString(hexInput) {
    const rawHexInputArray = hexInput.split(',');
    const hexInputArray = [];

    for (let i = rawHexInputArray.length - 1; i >= 0; i--) {
        const hexValue = rawHexInputArray[i].trim();

        if (hexValue) {
            hexInputArray.push({ hex: hexValue, name: "Color Name" });
        }
    }

    return hexInputArray;
}