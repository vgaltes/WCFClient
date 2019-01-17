import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import config from "../config";

const http = require("superagent-promise")(require("superagent"), Promise);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      masters: []
    };
  }

  async componentDidMount() {
    try {
      const masters = await this.masters();
      this.setState({ masters });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  async masters() {
    const url = `${config.apiGateway.URL}/masters`;
    try {
      const masters = await http("GET", url);
      return masters.body;
    } catch (e) {
      alert(e);
      return [];
    }
  }

  renderMastersList(masters) {
    return masters.map((master, i) =>
      this.props.isAuthenticated ? (
        <ListGroupItem
          key={master.id}
          href={`/master/${master.id}`}
          onClick={this.handleMasterClick}
          header={master.name.trim().split("\n")[0]}
        />
      ) : (
          <ListGroupItem
            key={master.id}
            header={master.name.trim().split("\n")[0]}
          />
        )
    );
  }

  handleMasterClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  };

  renderMasters() {
    return (
      <div className="notes">
        <PageHeader>Nuestros masters</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderMastersList(this.state.masters)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return <div className="Home">{this.renderMasters()}</div>;
  }
}
