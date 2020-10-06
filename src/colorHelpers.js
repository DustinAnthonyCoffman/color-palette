// {
//     paletteName: "Material UI Colors",
//     id: "material-ui-colors",
//     emoji: "🎨",
//     colors: [
//       { name: "red", color: "#F44336" },
//       { name: "pink", color: "#E91E63" },
//       { name: "purple", color: "#9C27B0" },
//       { name: "deeppurple", color: "#673AB7" },
//       { name: "indigo", color: "#3F51B5" },
//       { name: "blue", color: "#2196F3" },
//       { name: "lightblue", color: "#03A9F4" },
//       { name: "cyan", color: "#00BCD4" },
//       { name: "teal", color: "#009688" },
//       { name: "green", color: "#4CAF50" },
//       { name: "lightgreen", color: "#8BC34A" },
//       { name: "lime", color: "#CDDC39" },
//       { name: "yellow", color: "#FFEB3B" },
//       { name: "amber", color: "#FFC107" },
//       { name: "orange", color: "#FF9800" },
//       { name: "deeporange", color: "#FF5722" },
//       { name: "brown", color: "#795548" },
//       { name: "grey", color: "#9E9E9E" },
//       { name: "bluegrey", color: "#607D8B" }
//     ]
//   }

import chroma from "chroma-js";

const levels = [50,100, 200, 300, 400, 500, 600, 700, 800, 900];

//instead of mutating the starterPalette we create a new one with the same properties, the only thing we'll be changing is the colors portion
function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };
    //loop over every level and for each one were going to add it into 'colors'
    for (let level of levels) {
        newPalette.colors[level] = [];
        //this function does this to newPalette
        //colors: {
            // 50: [],
            // 100: [],
            // 200: [],
            // 300: [],
            // 400: [],
            // etc.
        // }
    }
    //next we must loop over every color that we just created...
    // in order to generate a scale with all the different colors with the lightest color to be added to the 50 value, the second lightest to the 100 value, the next lightest to the 200 value, etc.
    for (let color of starterPalette.colors) {
        //this is what each color looks like {name: "SpicedNectarine", color: "#ffbe76"}
        let scale = getScale(color.color, 10).reverse();
        //this is what scale will look like (10) ["#ffffff", "#fff9e6", "#fdf3cc", "#fbedb3", "#f8e89a", "#eedd86", "#ddcd77", "#cdbe68", "#bdaf5a", "#ada04c"]
        for(let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i])
                        .css()
                        .replace("rgba", "rgba")
                        .replace(")", "1.0)")
                    });
        }
    }
    console.log(newPalette)
    return newPalette;
}


function getRange(hexColor) {
    const endColor = "#fff"; //this is our end color, it is white
    //return an array with three color values. One that goes from to a slightly darker, to the color given, to endColor(white)
    //intuitivaly it seems like black-color-white would have worked but black is too dark for that to work so we just use a darkened color of our base to start
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
            hexColor,
            endColor
    ];
    //itll look like something like this ['f343r', 23553, white]
}

//getScale gives us a number of colors based on an input color and a quantity

function getScale(hexColor, numberOfColors) {
   return chroma
            .scale(getRange(hexColor))
            .mode("lab")
            .colors(numberOfColors);
}

//mode just sets color mode as lightness ab? 
// .colors will take the scale we generated and spit out ten colors

export {generatePalette};