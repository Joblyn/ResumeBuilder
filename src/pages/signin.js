import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import ProgressiveImage from "react-progressive-image";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FirebaseContext } from "../context/firebase";
import { HomeHeader } from '../containers';
import { Form, Aside } from "../components";
import { BrandIcon } from "../components/icons";
import * as ROUTES from "../constants/routes";
import { Spinner } from "../components/loading";
// import { provider } from '../lib/firebase.prod';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.PERS_INFO);
      })
      .catch((error) => {
        console.log(error.message);
        setEmail("");
        setPassword("");
        setError(error.message);
        setIsLoading(false);
      });
  };

  const googleSignUp = () => {
    var provider = new firebase.auth.GoogleAuthProvider(); 
    provider.addScope('profile');
    provider.addScope('email');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log('token', token);
        console.log('user', user);
      }) 
      .catch(error => {
        console.log(error);
      })
  };


  return (
    <>
      <HomeHeader />
      <div className="sign-up">
        <ProgressiveImage
          src="./images/sign-up-bg.svg"
          placeholder="./images/sign-up-bg.svg"
        >
          {(src, loading) => (
            <img
              src={src}
              style={{ opacity: loading ? 0.5 : 1 }}
              className="bg-img"
              alt=""
            />
          )}
        </ProgressiveImage>
        <Form id="sign-in" onSubmit={handleSignIn} marginLeft="5%">
          <Form.Title>Welcome back!</Form.Title>
          <Form.Text>Login to continue!</Form.Text>
          {error && <Form.Error fontSize="1.05rem">{error}</Form.Error>}
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input
              type="email"
              value={email}
              id="email"
              onChange={({ target }) => setEmail(target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Input
              type="password"
              value={password}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </Form.Group>
          <Form.Button form="sign-in" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Log In"}
          </Form.Button>
        </Form>

        {/* <div className="alt">
          <p>Log In with:</p>
          <div>
            <BrandIcon src="./icons/brands/google.svg" 
              onClick={googleSignIn}
            />
            <BrandIcon src="./icons/brands/linkedIn.svg" />
            <BrandIcon src="./icons/brands/facebook.svg" />
          </div>
        </div> */}
        <Form.Text showOnlyOnSmallView>
          Don't have an account?
          <Form.Link to={ROUTES.SIGN_UP}>Sign up</Form.Link>
        </Form.Text>
      </div>

      <Aside>
        <Aside.Group>
          <Aside.Text>Don't have an account?</Aside.Text>
          <Aside.Button href={ROUTES.SIGN_UP}>Sign Up</Aside.Button>
        </Aside.Group>
        <ProgressiveImage
          src="./images/sign-in-aside.svg"
          placeholder="./images/sign-in-aside.svg"
        >
          {(src, loading) => (
            <Aside.Image src={src} style={{ opacity: loading ? 0.5 : 1 }} />
          )}
        </ProgressiveImage>
      </Aside>
    </>
  );
};