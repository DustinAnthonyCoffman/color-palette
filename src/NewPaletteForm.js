import React, {Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state= {
            open: true,
            newColorName: "",
            colors: seedColors[0].colors
        }
    }
    handleDrawerOpen = () => {
        this.setState({open: true});
    };
    handleDrawerClose = () => {
        this.setState({open: false});
    };
    addNewColor = (newColor) => {
        this.setState({colors: [...this.state.colors, newColor], newColorName: ""})
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push("/")
    }
    removeColor = (colorName) => {
        this.setState({
        colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    }
    clearPalette = () => {
        this.setState({
            colors: []
        })
    }
    addRandomColor = () => {
        //grab an array of all colors from every palette
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let randomNum; 
        let randomColor;
        let isDuplicateColor = true;
        while(isDuplicateColor) {
            randomNum = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[randomNum];
            //execute callback function on each element until it finds one that is truthy to prevent duplicate colors
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name)
        }
        this.setState({
            colors: [...this.state.colors, allColors[randomNum]]
        })
    }
    render() {
        const {classes, maxColors, palettes} = this.props;
        const {open, colors} = this.state;
        const paletteIsFull = colors.length >= maxColors;
    return (
        <div className={classes.root}>
        <PaletteFormNav 
            open={open} 
            palettes={palettes} 
            handleSubmit={this.handleSubmit} 
            handleDrawerOpen={this.handleDrawerOpen}
            />
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
            </IconButton>
        </div>
        <div className= {classes.container}>
        <Divider />
            <Typography variant="h4">Design Your Palette</Typography>
        <div className={classes.buttons}>
        <Button 
            variant="contained" 
            color="secondary" 
            onClick={this.clearPalette}>
            Clear Palette
        </Button>
        <Button 
            variant="contained" 
            color="primary" 
            disabled={paletteIsFull}
            onClick={this.addRandomColor}
        >
            Random Color
        </Button>
        </div>
        <ColorPickerForm 
            paletteIsFull={paletteIsFull} 
            addNewColor={this.addNewColor} 
            colors={colors} 
            />
            </div>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open
        })}
        >
            <div className={classes.drawerHeader} />
                <DraggableColorList 
                    colors={colors} 
                    removeColor={this.removeColor}
                    axis='xy'
                    onSortEnd={this.onSortEnd}
                />
        </main>
    </div>
        );
    } 
}  


export default withStyles(styles, { withTheme: true })(NewPaletteForm);
