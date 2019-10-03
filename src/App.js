import React, { Component } from 'react';
import styled from 'styled-components';
import filesize from 'filesize';
import swal from 'sweetalert';
import api from './api';
import './App.css';

const Icon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1FB264"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-clipboard"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  )
}

const BuyMeACoffee = styled.div`
  padding: 56px 20px;
  min-height: 100%;
  width: 100%;
`;

const BuyMeACoffeeLink = styled.a`
  font-size: 12px;
  color: #676767
`;

const HomeContainer = styled.div`
  padding: 56px 20px;
  min-height: 100%;
  width: 100%;
`;

const FileUpload = styled.div`
	background-color: #ffffff;
	max-width: 600px;
	margin: 0 auto;
  padding: 20px;
  min-height: 370px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const FileUploadBtn = styled.label`
	color: #fff;
	background: #1FB264;
	border: none;
	padding: 10px;
	border-radius: 4px;
	border-bottom: 4px solid #15824B;
	transition: all .2s ease;
	outline: none;
	text-transform: uppercase;
  font-weight: 700;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 60px;
  &:hover {
    background: #1AA059;
    color: #ffffff;
    transition: all .2s ease;
    cursor: pointer;
  }
  &:active {
    border: 0;
    transition: all .2s ease;
  }
`;

const DragAndDropFile = styled.div`
  margin-top: 20px;
	border: 4px dashed #1FB264;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  &:hover {
    background-color: #1FB264;
    border: 4px dashed #ffffff;
  }
`;

const FileUploadInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  outline: none;
  opacity: 0;
  cursor: pointer;
  width: 100%;
`;

const DragTextConatiner = styled.div`
  text-align: center;
`;

const DragText = styled.h3`
  font-weight: 100;
  text-transform: uppercase;
  color: #15824B;
  padding: 60px 0;
`;

const PathInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const PathInput = styled.input`
  padding: 0 5px 0 5px;
  flex: 1;
  font-size: 14px;
`;

const ResultImage = styled.img`
  padding-top: 20px;
  height: auto;
  width: 130px;
  margin: 0 auto;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
  }

  onInput = (event) => {
    const file = event.target.files[0]
    console.log('file', file);

    const newFile = new FormData()
    newFile.append('file', file);
    newFile.append('title', file.name);
    newFile.append('size', filesize(file.size, { round: 0 }));
    api.createFile(newFile)
      .then(
        ({ data }) => {
          console.log('====================================')
          console.log('createFile', data)
          console.log('====================================')
          this.setState({ data })
        }
      )
      .catch(
        err => console.error(err)
      )
  }

  onClick = () => {
    this.setState({ data: undefined })
  }




  render() {
    const { data } = this.state
    return (
      <div className="App">
        <header className="App-header">
          {data
            ? <Result resultData={data} onClick={this.onClick.bind(this)} />
            : <Home onInput={this.onInput.bind(this)} />}
          <BuyMeACoffee>
            <BuyMeACoffeeLink href="https://bmc.xyz/l/Ex2sZtSlY" target="_blank" >Buy me a coffee, please</BuyMeACoffeeLink>
          </BuyMeACoffee>
        </header>
      </div>
    );
  }
}

function Home({ onInput }) {
  return (
    <HomeContainer>
      <FileUpload>
        <FileUploadBtn htmlFor="file">Add Image</FileUploadBtn>
        <DragAndDropFile>
          <FileUploadInput name="file" id="file" type="file" onInput={onInput} accept="image/*" />
          <DragTextConatiner>
            <DragText>Drag and drop a file or select add Image</DragText>
          </DragTextConatiner>
        </DragAndDropFile>
      </FileUpload>
    </HomeContainer>
  )
};

class Result extends Component {
  state = {
    inputValue: undefined
  }
  static getDerivedStateFromProps(props, state) {
    if (props.resultData.path && props.resultData.path !== state.inputValue) {
      return { inputValue: props.resultData.path }
    }
    return {}
  }

  copyToClipboard = () => {
    const stringClipboard = `https://25mbcloud.ml/${this.state.inputValue}`;
    navigator.clipboard.writeText(stringClipboard);
    console.log(stringClipboard);
    swal("Success!", "Link copied to clipboard!", "success");
  }

  changeInputValue = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { onClick } = this.props
    const { inputValue } = this.state
    return (
      <HomeContainer>
        <FileUpload>
          <FileUploadBtn onClick={onClick}>Add New Image</FileUploadBtn>
          <PathInputContainer>
            <PathInput
              type="text"
              ref={(textinput) => this.textInput = textinput}
              value={`https://25mbcloud.ml/${inputValue}`}
              onChange={this.changeInputValue}
            />
            <Icon onClick={this.copyToClipboard.bind(this)} />
          </PathInputContainer>
          <ResultImage src={`https://25mbcloud.ml/${inputValue}`} alt="image" />
        </FileUpload>
      </HomeContainer>
    )
  };
}

export default App;
