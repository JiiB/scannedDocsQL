import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import DeleteIcon from "@material-ui/icons/Delete";
import SocialIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import DescriptionIcon from "@material-ui/icons/Description";
import EditDialog from "../EditDialog";
import MailDialog from "../MailDialog";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import styles from "./styles.scss";
import { getDocumentsQuery } from "../../queries";
import { graphql } from "react-apollo";

export class DocumentList extends Component {
  state = {
    openDrawer: false,
    openEditDialog: false,
    openMailDialog: false,
    editDialogData: {
      id: "",
      name: "",
      displayName: "",
      create_date: ""
    }
  };

  openDrawerHandler = doc => {
    this.setState({
      editDialogData: doc,
      openDrawer: true
    });
  };

  closeDrawerHandler = () => {
    this.setState({ openDrawer: false });
  };

  openEditDialogHandler = () => {
    this.setState({
      openEditDialog: true,
      openDrawer: false
    });
  };

  closeEditDialogHandler = () => {
    this.setState({ openEditDialog: false });
  };

  openMailDialogHandler = () => {
    this.setState({
      openMailDialog: true,
      openDrawer: false
    });
  };

  closeMailDialogHandler = () => {
    this.setState({ openMailDialog: false });
  };

  render() {
    const { data } = this.props;
    let docs = <div className={styles.Text_Center}>{<CircularProgress />}</div>;
    if (!data.loading) {
      docs = data.documents.map(doc => {
        let newBadge = null;
        if (parseFloat(doc.create_date) > Date.now() - 120000) {
          newBadge = <Badge badgeContent={"🔔"} color="primary" />;
        }
        return (
          <ListItem
            key={doc.id}
            onClick={() => this.openDrawerHandler(doc)}
            button
          >
            <Avatar>
              <DescriptionIcon />
            </Avatar>
            <ListItemText primary={doc.displayName} secondary={doc.name} />
            {newBadge}
          </ListItem>
        );
      });
    }

    return (
      <React.Fragment>
        <div />
        <List>{docs}</List>
        <Drawer
          anchor="bottom"
          open={this.state.openDrawer}
          onClose={this.closeDrawerHandler}
        >
          <List>
            <ListItem
              button
              component="a"
              target="_blank"
              href={"/scan/" + this.state.editDialogData.name}
            >
              <ListItemIcon>
                <EyeIcon />
              </ListItemIcon>
              <ListItemText primary="Ansehen" />
            </ListItem>
            <ListItem button onClick={this.openEditDialogHandler}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Bearbeiten" />
            </ListItem>
            <ListItem button onClick={this.openMailDialogHandler}>
              <ListItemIcon>
                <SocialIcon />
              </ListItemIcon>
              <ListItemText primary="E-Mail senden" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Löschen" />
            </ListItem>
          </List>
        </Drawer>
        <EditDialog
          data={this.state.editDialogData}
          openHandler={this.state.openEditDialog}
          closeHandler={this.closeEditDialogHandler}
        />
        <MailDialog
          data={this.state.editDialogData}
          openHandler={this.state.openMailDialog}
          closeHandler={this.closeMailDialogHandler}
        />
      </React.Fragment>
    );
  }
}

export default graphql(getDocumentsQuery)(DocumentList);
