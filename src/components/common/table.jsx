import React, { Component } from "react";
import { Table as SemanticTable } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";

class Table extends Component {
  static Cell = SemanticTable.Cell;

  renderHeader() {
    const { columns, onSort } = this.props;

    return columns.map(({ key, path, sortable, content }) => ({
      key: key || path,
      onClick:
        sortable &&
        function() {
          onSort(path);
        },
      content
    }));
  }

  renderBodyRow = (item, idx) => {
    return {
      key: item._id,
      cells: this.renderBodyCells(item, idx)
    };
  };

  renderBodyCells(item, idx) {
    const { columns } = this.props;

    return columns.map(column => ({
      key: this.createKey(item, column),
      content: this.getBodyContent(item, column, idx),
      verticalAlign: column.verticalAlign || "middle"
    }));
  }

  createKey(item, column) {
    return item._id + (column.path || column.key);
  }

  getBodyContent(item, column, idx) {
    const { counter, format, path, renderContent } = column;

    if (counter) return idx + 1;
    if (renderContent) return renderContent(item, column, idx);

    let content = _.get(item, path);
    if (format) content = format(content, { item, column, idx });

    return content;
  }

  render() {
    const props = { ...this.props };
    delete props.columns;
    delete props.onSort;

    return (
      <SemanticTable
        headerRow={this.renderHeader()}
        renderBodyRow={this.renderBodyRow}
        tableData={props.data}
        {...props}
      />
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired
};

export default Table;
