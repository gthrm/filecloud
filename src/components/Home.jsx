import React from "react";
import styled from "styled-components";

export function Home({ onInput }) {
  return (
    <HomeContainer>
      <FileUpload>
        <FileUploadBtn htmlFor="file">Add Image</FileUploadBtn>
        <DragAndDropFile>
          <FileUploadInput
            name="file"
            id="file"
            type="file"
            onChange={onInput}
            accept="image/*"
          />
          <DragTextContainer>
            <DragText>Drag and drop a file or select add Image</DragText>
          </DragTextContainer>
        </DragAndDropFile>
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

const DragAndDropFile = styled.div`
  margin-top: 20px;
  border: 4px dashed #1fb264;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  &:hover {
    background-color: #1fb264;
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

const DragTextContainer = styled.div`
  text-align: center;
`;

const DragText = styled.h3`
  font-weight: 100;
  text-transform: uppercase;
  color: #15824b;
  padding: 60px 0;
`;
