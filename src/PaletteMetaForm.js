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
            stage: "form",
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
    showEmojiPicker = () => {
        this.setState({
            stage: "emoji"
        })
    }
    savePalette = (emoji) => {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        };
        this.props.handleSubmit(newPalette);
        this.setState({ stage: ""});
    }
    render () {
        const {hideForm} = this.props; 
        const {newPaletteName} = this.state;
        return (
            <div>
            <Dialog 
                open={this.state.stage === "emoji"}
                onClose={hideForm}
                >
                <Picker title="Pick A Palette Emoji" onSelect={this.savePalette} />
            </Dialog>
                <Dialog
                    onClose={hideForm} 
                    open={this.state.stage === "form"} 
                    aria-labelledby="form-dialog-title"
                    >
                <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
                <ValidatorForm 
                        onSubmit={this.showEmojiPicker}
                        >
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your palette, make sure it's unique!
                    </DialogContentText>
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
                </div>
        );
    }
}

export default PaletteMetaForm;