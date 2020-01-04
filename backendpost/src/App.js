import React from "react";
import { useState } from "react";
import "./App.css";
import axios from "axios";

import { Formik, Field, Form } from "formik";

function App() {
  const [message, setMessage] = useState("");
  const handleSubmit = (values, tools) => {
    axios
      .post("http://localhost:4000/login", values)
      .then(res => {
        setMessage(res.data.message);
        tools.resetForm();
      })
      .catch()
      .finally(() => {
        tools.setSubmitting(false);
      });
  };

  return (
    <div className="App">
      <div>{message}</div>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        render={props => (
          <Form>
            <Field placeholder="username" name="username" type="text" />
            <Field placeholder="password" name="password" type="password" />
            <button type="submit" disabled={props.isSubmitting}>
              {props.isSubmitting ? "Submitting" : "submit"}
            </button>
          </Form>
        )}
      />
    </div>
  );
}

export default App;
