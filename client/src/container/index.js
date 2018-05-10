import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import styles from "./styles.scss";
import DocumentList from "../components/DocumentList";

export class Container extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar title="Scanned Docs" showMenuIconButton={false} />
        <div className={styles.Container}>
          <DocumentList />
        </div>
      </React.Fragment>
    );
  }
}

export default Container;
