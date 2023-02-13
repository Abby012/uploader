import logo from './logo.svg';
import './App.css';
import './index.css'
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false,
    letter: 'unknown',
    confidence: '0%'
  }

onFileChange = event => {
  this.setState({selectedFile: event.target.files[0]});
}

onFileUpload = () => {
  let formData = new FormData()
  formData.append(
    "file",
    this.state.selectedFile,
    this.state.selectedFile.name
  )

  //call api
  axios.post("https://yoxzxcmno3pjwnavdcvoczurl40slzig.lambda-url.ca-central-1.on.aws/", formData, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    }
  }).then((response) => {
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully: true});
    this.setState({letter: response.data.Letter});
    this.setState({confidence: response.data.Confidence});
    console.log(response.data.Letter);
    console.log(response.data.Confidence);
  })
  .catch((error)=>{
    console.error(error);
  })


}

fileData = () => {
  // console.log(this.state.selectedFile)
  if (this.state.selectedFile) {
    return (
      <div className='show'>
        <h2>Détails du Fichier:</h2>
        <p>Nom du Fichier: {this.state.selectedFile.name}</p>
        <p>Type de Fichier: {this.state.selectedFile.type}</p>
        <p>Dernière Modification: {" "}
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
        <h4>Choisissez un fichier et appuyez le button Télécharger</h4>
      </div>
    )
  }
}

prediction = () => {
  return (
    <div className='prediction'>
      <h2>Prédiction:</h2>
      <p>Lettre: {this.state.letter}</p>
      <p>Confiance {this.state.confidence}</p>
    </div>
  )

}

  render() {
    return (
      <div className="container">
        <h1 className='title'>Traducteur ASL</h1>
        <h3>American Sign Language</h3>
        <div>
          <input type='file' onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Télécharger
          </button>
        </div>
        {this.fileData()}
        {this.prediction()}
      </div>
    )
  }
}

export default App;
