import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { deactivateDocumentMutation, getDocumentsQuery } from "../../queries";
import { graphql } from "react-apollo";

export class DeleteDialog extends Component {
  state = {
    snackbarState: false,
    snackbarText: ""
  };

  dialogOpenedHandler = () => {
    this.setState({ name: this.props.data.displayName });
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.mutate({
      variables: {
        id: this.props.data.id
      },
      refetchQueries: [{ query: getDocumentsQuery }]
    });
    this.setState({
      snackbarText: "Dokument gelöscht",
      snackbarState: true
    });
    this.props.closeHandler();
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
          <DialogTitle id="alert-dialog-title">Dokument löschen?</DialogTitle>
          <DialogContent>
            <p>Möchtest du das Dokument {data.displayName} wirklich löschen?</p>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={closeHandler}>
              Abbrechen
            </Button>,
            <Button color="primary" onClick={this.submitFormHandler}>
              Löschen
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

export default graphql(deactivateDocumentMutation)(DeleteDialog);
