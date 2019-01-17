import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./Master.css";

export default class Master extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      master: null,
      description: ""
    };
  }

  async componentDidMount() {
    try {
      const master = await this.getMaster();
      const { description } = master;

      this.setState({ master, description });
    } catch (e) {
      alert(e);
    }
  }

  getMaster() {
    return API.get("masters", `/master/${this.props.match.params.id}`);
  }

  enrolToMaster(masterId) {
    return API.post("masters", `/master`, {
      body: { masterId: masterId }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.enrolToMaster(this.state.master.id);

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="Notes">
        {this.state.master && (
          <div>
            <div>
              <h2>{this.state.master.name}</h2>
              <p>{this.state.master.description}</p>
            </div>
            <form onSubmit={this.handleSubmit}>
              <LoaderButton
                block
                bsStyle="primary"
                bsSize="large"
                type="submit"
                isLoading={this.state.isLoading}
                text="Enrol"
                loadingText="Enrolling..."
              />
            </form>
          </div>

        )
        }
      </div>
    );
  }
}
