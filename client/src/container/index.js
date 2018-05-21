import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import styles from "./styles.css";
import DocumentList from "../components/DocumentList";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import { getDocumentsQuery } from "../queries";
import { graphql } from "react-apollo";

export class Container extends Component {
  refetchDocs = () => {
    this.props.data.refetch();
  };
  render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Scanned Docs
            </Typography>
            <div className={styles.AlignRight}>
              <IconButton onClick={this.refetchDocs} color="inherit">
                <RefreshIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className={styles.Container}>
          <DocumentList data={this.props.data} />
        </div>
      </React.Fragment>
    );
  }
}

export default graphql(getDocumentsQuery)(Container);
