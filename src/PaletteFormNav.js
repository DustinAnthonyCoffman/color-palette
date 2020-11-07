import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from "./PaletteMetaForm";



class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {newPaletteName: ""};
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    render() {
        const {classes, open, palettes, handleSubmit} = this.props;
        const {newPaletteName} = this.state;
        return (
            <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
            >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.props.handleDrawerOpen}
                    edge="start"
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                    Create A Palette
                </Typography>
            </Toolbar>
            <div>
                    <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />
                    <Link to="/">
                        <Button variant="contained" color="secondary">Go Back</Button>
                    </Link>
            </div>
        </AppBar>
        </div>
        )
    }
}


export default PaletteFormNav;