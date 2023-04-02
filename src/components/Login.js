import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  const [state, dispatch] = useStateValue();

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({ type: actionTypes.SET_USER, user: result.user });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
          alt=""
        />
        <h1>Signin to Paras's Slack</h1>
        <h6>paras.slack.com</h6>
        <Button onClick={signin}>Signin with Google</Button>
      </div>
    </div>
  );
};

export default Login;
