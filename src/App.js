import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelpers.js";



class App extends Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    })
  }  
  render() {
        return (
          <Switch>
            <Route exact path="/" render={() => <PaletteList palettes={seedColors} />} />
            <Route  
              exact 
              path="/palette/:id"
              render={routeProps => (
                <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
              )} 
            />
          </Switch>
            // <div>
            //     <h1>Color Palette</h1>
            //     <Palette palette={generatePalette(seedColors[4])} />
            // </div>
        );
    }
}

export default App;