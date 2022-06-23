import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="pVfhpYv7R0v8ik8Guu89FuQdrtkcvp9CvgpA5Xqj" serverUrl="https://4rim0eq63dao.usemoralis.com:2053/server">
      <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </NotificationProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);