import React, { Component, Fragment } from "react";
import { Header } from "semantic-ui-react";
import _ from "lodash";
import { getAll as getAllDriversLogs } from "../services/driversLogService";
import feedback from "../utils/feedback";
import Button from "./common/button";
import DriversLogsTable from "./driversLogsTable";

class DriversLog extends Component {
  state = {
    driversLogs: [],
    sortColumn: "",
    sortDirection: ""
  };

  componentDidMount = async () => {
    const { data: driversLogs } = await getAllDriversLogs();
    this.setState({ driversLogs });
  };

  handleSort = clickedColumn => {
    const { sortColumn, sortDirection, driversLogs } = this.state;

    if (sortColumn !== clickedColumn) {
      this.setState({
        sortColumn: clickedColumn,
        driversLogs: _.sortBy(driversLogs, [clickedColumn]),
        sortDirection: "ascending"
      });

      return;
    }

    this.setState({
      driversLogs: driversLogs.reverse(),
      sortDirection: sortDirection === "ascending" ? "descending" : "ascending"
    });
  };

  handleDelete = (event, data) => {
    feedback.form("Entry deleted.", feedback.TYPE.SUCCESS);
  };

  render() {
    const { driversLogs, sortColumn, sortDirection } = this.state;

    return (
      <Fragment>
        <Header as="h1">Driver's Log</Header>
        <Button text="Add Entry" to="/drivers-log/new" />
        <DriversLogsTable
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          data={driversLogs}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
      </Fragment>
    );
  }
}

export default DriversLog;
