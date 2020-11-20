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
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/PaletteFormNavStyles';


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {newPaletteName: "", formShowing: false};
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    showForm() {
        this.setState({
            formShowing: true
        })
    }
    hideForm() {
        this.setState({
            formShowing: false
        })
    }

    render() {
        const { classes, open, palettes, handleSubmit} = this.props;
        return (
            <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
            >
            <Toolbar disableGutters={!open}>
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
                {this.state.formShowing && (
                <PaletteMetaForm 
                    palettes={palettes} 
                    handleSubmit={handleSubmit} 
                    hideForm={this.hideForm} 
                    />
                )} 
            <div>
                <Link to="/">
                    <Button variant="contained" color="secondary">
                        Go Back
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.showForm}
                    >
                        Save
                </Button>
            </div>

        </AppBar>
        </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(PaletteFormNav);