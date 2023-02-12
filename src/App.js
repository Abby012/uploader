import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

onFileChange = event => {
  this.setState({selectedFile: event.target.files[0]});
}

onFileUpload = () => {
  const formData = new FormData()
  formData.append(
    "demo file",
    this.state.selectedFile,
    this.state.selectedFile.name
  )
  //call api
  axios.post("https://r5aoyfxi8l.execute-api.ca-central-1.amazonaws.com/prod/file-upload", formData).then(() => {
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully: true});
  })
}

fileData = () => {
  console.log(this.state.selectedFile)
  if (this.state.selectedFile) {
    return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Type: {this.state.selectedFile.type}</p>
        <p>Last Modified: {" "}
          {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
      </div>
    );
  } else if (this.state.fileUploadedSuccessfully) {
    return (
      <div>
        <br />
        <h4>Fichier Téléchargé</h4>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <h4>Choisissez un fichier et appuyez le button Télécharger</h4>
      </div>
    )
  }
}

  render() {
    return (
      <div className="container">
        <h1 class='title'>Traducteur ASL</h1>
        <h3>American Sign Language</h3>
        <div>
          <input type='file' onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Télécharger
          </button>
        </div>
        {this.fileData()}
      </div>
    )
  }
}

export default App;
