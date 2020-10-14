import React, { useState } from "react";

import "./App.css";
import FormInput from "./components/FormInput/FormInput";
import Output from "./components/Output/Output";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  const [formData, setFormData] = useState();
  const getFormData = (values) => {
    setFormData(values);
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <FormInput getFormData={getFormData} />
          </Route>
          <Route exact path="/output">
            <Output formData={formData} />
          </Route>
          <Route from="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
