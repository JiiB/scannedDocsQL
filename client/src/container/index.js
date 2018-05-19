import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import styles from "./styles.scss";
import DocumentList from "../components/DocumentList";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export class Container extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Scanned Docs
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.Container}>
          <DocumentList />
        </div>
      </React.Fragment>
    );
  }
}

export default Container;
