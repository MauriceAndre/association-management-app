import React, { Fragment } from "react";
import { Header, Segment } from "semantic-ui-react";
import Joi from "joi-browser";
import feedback from "../utils/feedback";
import user from "../services/userService";
import { save as saveDriversLog } from "../services/driversLogService";
import Form from "./common/form";

class DriversLogForm extends Form {
  state = {
    data: {
      driver: "",
      departureDate: "",
      arrivalDate: "",
      departureMileage: "",
      arrivalMileage: ""
    },
    drivers: [],
    errors: {}
  };

  schema = {
    driver: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Driver"),
    departureDate: Joi.date()
      .required()
      .label("Departure Date"),
    arrivalDate: Joi.date()
      .required()
      .label("Arrival Date"),
    departureMileage: Joi.number()
      .required()
      .min(0)
      .label("Departure Mileage"),
    arrivalMileage: Joi.number()
      .min(0)
      .required()
      .label("Arrival Mileage")
  };

  componentDidMount = async () => {
    const users = await user.getAllUsers();
    const drivers = users.map(user => this.mapToDriver(user));

    this.setState({ drivers });
  };

  mapToDriver(user) {
    return {
      key: user._id,
      text: `${user.firstName} ${user.lastName}`,
      value: user._id
    };
  }

  doSubmit = async () => {
    try {
      const driversLog = this.state.data;
      await saveDriversLog(driversLog);

      feedback.form("Entry was added to driver's log.", feedback.TYPE.SUCCESS);
      this.props.history.replace("/drivers-log");
    } catch (ex) {
      if (ex.response) {
        feedback.form(ex.response.data, feedback.TYPE.ERROR);
      }
    }
  };

  render() {
    const { drivers } = this.state;

    return (
      <Fragment>
        <Header as="h1">New Driver's Log Entry</Header>
        <Segment>
          <Form.Container onSubmit={this.handleSubmit}>
            <Form.Select
              search
              name="driver"
              label="Driver"
              options={drivers}
              scope={this}
            />
            <Form.Group widths="equal">
              <Form.Input
                type="date"
                name="departureDate"
                label="Departure Date"
                scope={this}
              />
              <Form.Input
                type="date"
                name="arrivalDate"
                label="Arrival Date"
                scope={this}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                type="number"
                name="departureMileage"
                label="Departure Mileage in KM"
                scope={this}
              />
              <Form.Input
                type="number"
                name="arrivalMileage"
                label="Arrival Mileage in KM"
                scope={this}
              />
            </Form.Group>
            <Form.Button type="submit" text="Add" />
          </Form.Container>
        </Segment>
      </Fragment>
    );
  }
}

export default DriversLogForm;
