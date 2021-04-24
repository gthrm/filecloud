import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "./CopyIcon";
import styled from "styled-components";

export function Result({ onClick, resultData }) {
  const [inputValue, setInputValue] = useState("");

  const copyToClipboard = () => {
    swal("Success!", "Link copied to clipboard!", "success");
  };

  useEffect(() => {
    if (resultData?.path && resultData.path !== inputValue) {
      setInputValue(resultData.path);
    }
  }, [inputValue, resultData.path]);

  const host = window.location.href;
  return (
    <HomeContainer>
      <FileUpload>
        <FileUploadBtn onClick={onClick}>Add New Image</FileUploadBtn>
        <CopyToClipboard
          text={`${host}/${inputValue}`}
          onCopy={copyToClipboard}
        >
          <PathInputContainer>
            <PathInput
              id="pathInput"
              type="text"
              value={`${host}${inputValue}`}
            />
            <CopyIcon onClick={copyToClipboard} />
          </PathInputContainer>
        </CopyToClipboard>
        <ResultImage src={`${host}/${inputValue}`} alt="image" />
      </FileUpload>
    </HomeContainer>
  );
}

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
  background: #1fb264;
  border: none;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 4px solid #15824b;
  transition: all 0.2s ease;
  outline: none;
  text-transform: uppercase;
  font-weight: 700;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 60px;
  &:hover {
    background: #1aa059;
    color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  &:active {
    border: 0;
    transition: all 0.2s ease;
  }
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
  height: fit-content;
  width: 100%;
  margin: 0 auto;
`;
