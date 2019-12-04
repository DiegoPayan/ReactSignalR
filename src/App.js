import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connection: ''
    }
  }

  componentDidMount() {
    let connection = new signalR.HubConnectionBuilder().withUrl("/reportesHub").build();
    this.setState({ connection }, () => {
      connection.start()
        .then(() => console.log("Conexión establecida con éxito"))
        .catch((err) => console.log(`Error: ${err}`))
    });

    connection.on("newReport", (message) => console.log(message))

  }

  sendMessage = () => {
    this.state.connection.invoke("newEmergencyReport", "Hello");
  }

  render() {
    return (
      <div className="App">
        Hola
        <button onClick={() => this.sendMessage()}>Message</button>
      </div>
    );
  }
}

export default App;
