import React, { Component } from "react";
import axios from "../../axios-mail";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "./styles.css";
import Snackbar from "@material-ui/core/Snackbar";
import { MAIL_REGEX } from "../../constants";

export class MailDialog extends Component {
  state = {
    snackbarState: false,
    snackbarText: "",
    name: "",
    inputError: false
  };

  updateTitleHandler = event => {
    let error = false;
    if (event.target.value.length > 0 && MAIL_REGEX.test(event.target.value)) {
      error = false;
    } else {
      error = true;
    }
    this.setState({ name: event.target.value, inputError: error });
  };

  dialogOpenedHandler = () => {
    this.setState({ name: this.props.data.displayName });
  };

  submitFormHandler = event => {
    event.preventDefault();

    if (this.state.name.length > 0 && !this.state.inputError) {
      const postData = {
        email: this.state.name,
        ...this.props.data
      };
      console.log("send email", postData);

      axios
        .post("/mail", postData, {
          "Content-Type": "application/json"
        })
        .then(res => {
          this.setState({
            snackbarText: "E-Mail wird versendet...",
            snackbarState: true
          });
        });

      this.props.closeHandler();
    } else {
      this.setState({
        snackbarText: "Bitte gültige E-Mail Adresse angeben!",
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
        <Dialog open={openHandler} onClose={closeHandler}>
          <DialogTitle id="alert-dialog-title">E-Mail senden</DialogTitle>
          <DialogContent>
            <div className={styles.DialogInfo}>
              Willst du das Dokument <strong>{data && data.displayName}</strong>{" "}
              per E-Mail verschicken?
            </div>
            <form onSubmit={this.submitFormHandler}>
              <TextField
                autoComplete="email"
                error={this.state.inputError}
                required={true}
                placeholder="E-Mail Adresse"
                fullWidth={true}
                label="E-Mail des Empfängers"
                type="email"
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

export default MailDialog;
