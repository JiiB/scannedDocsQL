import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export class EditDialog extends Component {
  state = {
    name: ""
  };

  componentWillReceiveProps() {
    this.setState({ name: this.props.data.displayName });
  }

  updateTitle = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { openHandler, closeHandler, data } = this.props;

    return (
      <div>
        <Dialog open={openHandler} onClose={closeHandler}>
          <DialogTitle id="alert-dialog-title">Dokument umbenennen</DialogTitle>
          <DialogContent>
            <TextField
              placeholder={data && data.displayName}
              fullWidth={true}
              label="Name des Dokuments"
              value={this.state.name}
              onChange={event => this.updateTitle(event)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={closeHandler}>
              Cancel
            </Button>,
            <Button color="primary" onClick={closeHandler}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditDialog;
