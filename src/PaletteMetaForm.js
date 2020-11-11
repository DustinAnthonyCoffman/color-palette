import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        };
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
        this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
        );
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClose = () => {
        this.setState({
            open: false
        })
    };
    render () {
        const {hideForm, handleSubmit} = this.props; 
        const {newPaletteName, open} = this.state;
        return (
                <Dialog
                    onClose={hideForm} 
                    open={open} 
                    onClose={this.handleClose} 
                    aria-labelledby="form-dialog-title"
                    >
                <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
                <ValidatorForm 
                        onSubmit={() => handleSubmit(newPaletteName)}
                        >
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your palette, make sure it's unique!
                    </DialogContentText>
                    <Picker />
                        <TextValidator 
                            label="Palette Name" 
                            value={newPaletteName} 
                            name="newPaletteName"
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter palette name", "Name already used"]} 
                            />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            >
                                Save Palette
                        </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                    Cancel
                    </Button>
                </DialogActions>
                    </ValidatorForm>
                </Dialog>
        );
    }
}

export default PaletteMetaForm;