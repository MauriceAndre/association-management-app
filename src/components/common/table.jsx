import React, { Component } from "react";
import { Table as SemanticTable } from "semantic-ui-react";

class Table extends Component {
  state = {};

  static Cell = SemanticTable.Cell;

  render() {
    return <SemanticTable {...this.props} />;
  }
}

export default Table;
