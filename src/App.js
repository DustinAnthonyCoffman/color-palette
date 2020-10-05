import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelpers.js";



class App extends Component {
    render() {
      console.log(generatePalette(seedColors[4]))
        return (
            <div>
                <h1>Color Palette</h1>
                <Palette {...seedColors[4]} />
            </div>
        )
    }
}

export default App;