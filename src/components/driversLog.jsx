import React, { Component, Fragment } from "react";
import { Header } from "semantic-ui-react";
import Table from "./common/table";
import Button from "./common/button";
import { getAll as getAllDriversLogs } from "../services/driversLogService";
import moment from "moment";
import feedback from "../utils/feedback";

class DriversLog extends Component {
  state = {
    tableHeader: [
      {},
      { content: "Driver", sorted: "ascending" },
      { content: "Departure Date" },
      { content: "Arrival Date" },
      { content: "Departure Mileage" },
      { content: "Arrival Mileage" },
      {}
    ],
    driversLogs: []
  };

  componentDidMount = async () => {
    const { data: driversLogs } = await getAllDriversLogs();
    this.setState({ driversLogs });
  };

  handleDelete = (event, data) => {
    feedback.form("Entry deleted.", feedback.TYPE.SUCCESS);
  };

  renderBodyRow = (
    {
      _id,
      driver,
      departureDate,
      arrivalDate,
      departureMileage,
      arrivalMileage
    },
    i
  ) => {
    const dateFormat = "DD MMM. YYYY HH:mm";

    return {
      key: _id,
      cells: [
        {
          content: i + 1,
          verticalAlign: "middle"
        },
        {
          content: driver.firstName + " " + driver.lastName,
          verticalAlign: "middle"
        },
        {
          content: moment(departureDate).format(dateFormat),
          verticalAlign: "middle"
        },
        {
          content: moment(arrivalDate).format(dateFormat),
          verticalAlign: "middle"
        },
        { content: departureMileage, verticalAlign: "middle" },
        { content: arrivalMileage, verticalAlign: "middle" },
        {
          content: (
            <Button.Group>
              <Button
                icon="edit"
                to={`/drivers-log/${driver._id}`}
                basic
                color="black"
              />
              <Button
                icon="delete"
                onClick={this.handleDelete}
                basic
                color="red"
              />
            </Button.Group>
          ),
          verticalAlign: "middle"
        }
      ]
    };
  };

  render() {
    return (
      <Fragment>
        <Header as="h1">Driver's Log</Header>
        <Button text="Add Entry" to="/drivers-log/new" />
        <Table
          singleLine
          sortable
          striped
          unstackable
          definition
          selectable
          headerRow={this.state.tableHeader}
          renderBodyRow={this.renderBodyRow}
          tableData={this.state.driversLogs}
        />
      </Fragment>
    );
  }
}

export default DriversLog;
