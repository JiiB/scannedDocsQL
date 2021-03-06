import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { updateDocumentMutation, getDocumentsQuery } from "../../queries";
import { graphql } from "react-apollo";

export class EditDialog extends Component {
  state = {
    snackbarState: false,
    snackbarText: "",
    name: "",
    inputError: false
  };

  updateTitleHandler = event => {
    const error = event.target.value.length > 0 ? false : true;
    this.setState({ name: event.target.value, inputError: error });
  };

  dialogOpenedHandler = () => {
    this.setState({ name: this.props.data.displayName });
  };

  submitFormHandler = event => {
    event.preventDefault();
    if (this.state.name.length > 0) {
      this.props.mutate({
        variables: {
          id: this.props.data.id,
          displayName: this.state.name
        },
        refetchQueries: [{ query: getDocumentsQuery }]
      });
      this.setState({
        snackbarText: "Name aktualisiert!",
        snackbarState: true
      });
      this.props.closeHandler();
    } else {
      this.setState({
        snackbarText: "Bitte gültigen Namen angeben!",
        snackbarState: true
      });
    }
  };

  snackbarCloseHandler = () => {
    this.setState({ snackbarState: false });
  };

  render() {
    const { openHandler, closeHandler, data } = this.props;

    return (
      <div>
        <Dialog
          open={openHandler}
          onClose={closeHandler}
          onEntering={this.dialogOpenedHandler}
        >
          <DialogTitle id="alert-dialog-title">Dokument umbenennen</DialogTitle>
          <DialogContent>
            <form onSubmit={event => this.submitFormHandler(event)}>
              <TextField
                error={this.state.inputError}
                placeholder={data && data.displayName}
                fullWidth={true}
                label="Name des Dokuments"
                value={this.state.name}
                onChange={event => this.updateTitleHandler(event)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={closeHandler}>
              Cancel
            </Button>,
            <Button color="primary" onClick={this.submitFormHandler}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarState}
          autoHideDuration={3000}
          onClose={this.snackbarCloseHandler}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackbarText}</span>}
        />
      </div>
    );
  }
}

export default graphql(updateDocumentMutation)(EditDialog);
