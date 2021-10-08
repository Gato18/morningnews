import React, { useState } from "react";
import "./App.css";
import { Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ScreenHome(props) {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);

  const [listErrorsSignin, setErrorsSignin] = useState([]);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  async function getWishList(token) {
    var result = await fetch("/loadWishlist", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "token=" + token,
    });
    const body = await result.json();

    if (body) {
      console.log(body.result);
      body.result.map((article) => props.loadWishlist(article));

      // props.loadWishlist({ article: body.result });
    }
  }

  var handleSubmitSignup = async () => {
    const data = await fetch("/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.token);
      setUserExists(true);
      getWishList(body.token);
    } else {
      setErrorsSignup(body.error);
    }
  };

  var handleSubmitSignin = async () => {
    const data = await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.token);
      setUserExists(true);
      getWishList(body.token);
    } else {
      setErrorsSignin(body.error);
    }
  };

  if (userExists) {
    return <Redirect to="/screensource" />;
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return <p>{error}</p>;
  });

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <p>{error}</p>;
  });

  return (
    <div className="Login-page">
      {/* SIGN-IN */}

      <div className="Sign">
        <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />

        <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="password" />

        {tabErrorsSignin}

        <Button onClick={() => handleSubmitSignin()} style={{ width: "80px" }} type="primary">
          Sign-in
        </Button>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
        <Input onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="username" />

        <Input onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="email" />

        <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="password" />

        {tabErrorsSignup}

        <Button onClick={() => handleSubmitSignup()} style={{ width: "80px" }} type="primary">
          Sign-up
        </Button>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    loadWishlist: function (article) {
      dispatch({ type: "addArticle", articleLiked: article });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenHome);
