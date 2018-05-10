import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

const customContentStyle = {
  width: "95%",
  maxWidth: "400px"
};

export class EditDialog extends Component {


  render() {
    const { openHandler, closeHandler, data } = this.props;
    console.log(this.props);
    const actions = [
      <FlatButton label="Cancel" secondary onClick={closeHandler} />,
      <FlatButton
        label="Submit"
        primary
        onClick={closeHandler}
      />
    ];

    return (
      <div>
        <Dialog
          title="Dokumentname ändern"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={openHandler}
        >
          <TextField
            hintText={data && data.displayName}
            floatingLabelText="Name des Dokuments"
          />
        </Dialog>
      </div>
    );
  }
}

export default EditDialog;
