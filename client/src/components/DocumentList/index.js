import React, { Component } from "react";
import CircularProgress from "material-ui/CircularProgress";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Eye from "material-ui/svg-icons/image/remove-red-eye";
import Delete from "material-ui/svg-icons/action/delete";
import Social from "material-ui/svg-icons/social/share";
import Edit from "material-ui/svg-icons/image/edit";
import EditDialog from "../EditDialog";

import { List, ListItem } from "material-ui/List";
import NavigationMore from "material-ui/svg-icons/navigation/more-vert";

import styles from "./styles.scss";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getDocumentsQuery = gql`
  {
    documents {
      id
      name
      displayName
      create_date
    }
  }
`;

export class DocumentList extends Component {
  state = {
    open: false,
    editDialogData: null
  };

  handleOpen = doc => {
    this.setState({
      editDialogData: doc,
      open: true
    });
    console.log(doc);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { data } = this.props;
    let docs = (
      <div className={styles.Text_Center}>
        <CircularProgress />
      </div>
    );
    if (!data.loading) {
      docs = data.documents.map(doc => {
        let cssStyles = styles.DisplayBlock;
        if (parseFloat(doc.create_date) > Date.now() - 120000) {
          cssStyles = [styles.DisplayBlock, styles.New].join(" ");
        }
        return (
          <IconMenu
            key={doc.id}
            className={cssStyles}
            iconButtonElement={
              <ListItem
                primaryText={doc.displayName}
                secondaryText={doc.name}
                rightIcon={<NavigationMore />}
              />
            }
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            targetOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem
              primaryText="Ansehen"
              href={`http://192.168.1.127/scan/${doc.name}`}
              target="_blank"
              leftIcon={<Eye />}
            />
            <MenuItem primaryText="Teilen" leftIcon={<Social />} />
            <MenuItem
              primaryText="Bearbeiten"
              onClick={() => this.handleOpen(doc)}
              leftIcon={<Edit />}
            />
            <MenuItem primaryText="Löschen" leftIcon={<Delete />} />
          </IconMenu>
        );
      });
    }

    return (
      <React.Fragment>
        <div />
        <List>{docs}</List>
        <EditDialog 
          data={this.state.editDialogData} 
          openHandler={this.state.open} 
          closeHandler={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

export default graphql(getDocumentsQuery)(DocumentList);
