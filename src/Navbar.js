import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {format: "hex", open: false};
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }
    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true})
        this.props.handleChange(e.target.value)
    }
    closeSnackBar(){
        this.setState({open: false})
    }

    render() {
        const {level, changeLevel, handleChange} = this.props;
        const {format} = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="/">ReactColorPicker</a>
                </div>
                <div className="slider-container">
                    <span>Level: {level} </span>
                    <div className="slider">
                        <Slider 
                            defaultValue={level} 
                            min={100} max={900} 
                            onAfterChange={changeLevel} 
                            step={100}
                            />
                    </div>
                </div>
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
                    open={this.state.open} 
                    autoHideDuration={3000} 
                    message={<span id="message-id">Color Format Changed To {this.state.format.toUpperCase()} </span>} 
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackBar} 
                    action={[ 
                        <IconButton>
                            <CloseIcon onClick={this.closeSnackBar} color="inherit" key="close" aria-label="close" />
                        </IconButton>
                        ]}
                        />
            </header>
        )
    }
}


export default Navbar;