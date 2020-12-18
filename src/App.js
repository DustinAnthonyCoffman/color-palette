import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers.js';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = {
      palettes: savedPalettes || seedColors

    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    })
  } 
  deletePalette(id) {
    this.setState(st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
    this.syncLocalStorage
    );
  }
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
  }
  syncLocalStorage() {
    //save palettes held in state to local storage, to be called within setState
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
  render() {
    const {savePalette, palettes} = this.state;
        return (
          <Route 
            render={({location}) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={1000}>
                <Switch location={location}>
                  <Route 
                    exact 
                    path="/palette/new"
                    render={(routeProps) => (
                      <Page>
                        <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
                      </Page>
                      )}
                    />
                  <Route 
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={(routeProps) => (
                      <Page>
                        <SingleColorPalette
                          colorId={routeProps.match.params.colorId}
                          palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                        />
                      </Page>
                    )}
                  />
                  <Route 
                    exact 
                    path="/" 
                    render={(routeProps) => (
                    <Page>
                      <PaletteList deletePalette={this.deletePalette} palettes={palettes} {...routeProps} /> 
                    </Page>
                    )}
                  />
                  <Route  
                    exact 
                    path="/palette/:id"
                    render={routeProps => (
                      <Page>
                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                      </Page>
                    )} 
                  />
                  <Route
                      render={routeProps => (
                        <Page>
                          <PaletteList
                            palettes={this.state.palettes}
                            deletePalette={this.deletePalette}
                            {...routeProps}
                            />
                        </Page>
                      )}
                      />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
          
        );
    }
}

export default App;