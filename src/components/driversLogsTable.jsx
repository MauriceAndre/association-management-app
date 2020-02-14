import React, { Component } from "react";
import moment from "moment";
import Table from "./common/table";
import Button from "./common/button";
import { excludeKeys } from "../utils/objectUtils";

class DriversLogsTable extends Component {
  getColumns() {
    const { onDelete } = this.props;

    return [
      { key: "counter", counter: true },
      {
        content: "Driver",
        path: "driver",
        format: function({ firstName, lastName }) {
          return `${firstName} ${lastName}`;
        },
        sortable: true
      },
      {
        content: "Desparture Date",
        path: "departureDate",
        format: this.formatDate,
        sortable: true
      },
      {
        content: "Arrival Date",
        path: "arrivalDate",
        format: this.formatDate,
        sortable: true
      },
      {
        content: "Departure Mileage",
        path: "departureMileage",
        sortable: true
      },
      { content: "Arrival Mileage", path: "arrivalMileage", sortable: true },
      {
        key: "tools",
        renderContent: ({ _id }) => {
          return (
            <Button.Group>
              <Button
                icon="edit"
                to={`/drivers-log/${_id}`}
                basic
                color="black"
              />
              <Button icon="delete" onClick={onDelete} basic color="red" />
            </Button.Group>
          );
        }
      }
    ];
  }

  formatDate = content => {
    const dateFormat = "DD MMM. YYYY HH:mm";

    return moment(content).format(dateFormat);
  };

  render() {
    const props = excludeKeys(this.props, ["onDelete"]);

    return (
      <Table
        singleLine
        sortable
        striped
        unstackable
        definition
        selectable
        columns={this.getColumns()}
        {...props}
      />
    );
  }
}

export default DriversLogsTable;
