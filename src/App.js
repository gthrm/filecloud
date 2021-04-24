import React, { useState } from "react";
import styled from "styled-components";
import filesize from "filesize";
import { createFile } from "./api";
import { Result } from "./components/Result";
import { Home } from "./components/Home";
import "./App.css";

export const App = () => {
  const [data, setData] = useState();
  const onInput = (event) => {
    const file = event.target.files[0];
    const newFile = new FormData();
    newFile.append("file", file);
    newFile.append("title", file.name);
    newFile.append("size", filesize(file.size, { round: 0 }));
    createFile(newFile)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        {data ? (
          <Result resultData={data} onClick={() => setData(null)} />
        ) : (
          <Home onInput={onInput} />
        )}
        <BuyMeACoffee>
          <BuyMeACoffeeLink href="https://bmc.xyz/l/Ex2sZtSlY" target="_blank">
            Buy me a coffee, please
          </BuyMeACoffeeLink>
        </BuyMeACoffee>
      </header>
    </div>
  );
};

const BuyMeACoffee = styled.div`
  padding: 56px 20px;
  min-height: 100%;
  width: 100%;
`;

const BuyMeACoffeeLink = styled.a`
  font-size: 12px;
  color: #676767;
`;

export default App;
