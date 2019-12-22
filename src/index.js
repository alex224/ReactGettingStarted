import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as axios from "axios";

import "./styles.css"; // Tell Webpack that Button.js uses these styles

const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook"
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu"
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook"
  }
];

class App extends React.Component {
  //state = { testData }

  constructor(props) {
    super(props);
    this.state = {
      profiles: testData
    };
    this.addProfile = profile => {
      this.setState(prevState => {
        return { profiles: [profile, ...prevState.profiles] };
      });
    };
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form addProfile={this.addProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="profile" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

const CardList = props => {
  return (
    <div>
      {props.profiles.map(profile => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = async event => {
      event.preventDefault();
      //console.log(this.userNameInput.current.value);
      console.log(this.state.userName);
      const resp = await axios.get(
        `https://api.github.com/users/${this.state.userName}`
      );
      console.log(resp.data);
      props.addProfile(resp.data);
      this.setState({ userName: "" });
    };
    //this.userNameInput = React.createRef();
    this.state = { userName: "" };
  }
  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          /* ref={this.userNameInput} */
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

ReactDOM.render(
  <App title="The Github Cards App" />,
  document.getElementById("root")
);
