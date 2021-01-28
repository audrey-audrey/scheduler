import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import "index.scss";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

import Application from "components/Application";

ReactDOM.render(<Application />, document.getElementById("root"));
