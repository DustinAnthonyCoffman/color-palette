import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
import Palette from './Palette';
import {withStyles} from '@material-ui/styles';





class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.state = {format: "hex"};
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors) {
            shades = shades.concat(
                //why isnt this key.filter ?
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        //first shade [0] is white, we don't need it. Slice gives us every shade from 1 onwards
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val })
    }
    render() {
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const { classes } = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]} 
                showingFullPalette={false} //we dont want to show the more link, we add this so we can falsify a ternary in colorBox
                />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar 
                    handleChange={this.changeFormat} 
                    showingAllColors={false} 
                    />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} alt="return">Return</Link>
                        </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles) (SingleColorPalette);