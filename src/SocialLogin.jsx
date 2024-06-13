import React, { useCallback, useState } from 'react'
import User from './User';
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  LoginSocialTiktok,
} from 'reactjs-social-login'

import { InstagramLogin } from '@amraneze/react-instagram-login';

import { config } from 'dotenv';


// CUSTOMIZE ANY UI BUTTON
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from 'react-social-login-buttons'

const REDIRECT_URI = window.location.href;

const App = () => {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)
  const [accessToken, setAccessToken] = useState('')

  const onLoginStart = useCallback(() => {
    // alert('login start')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])

  //

  const onLoginInstagramStart = () => {

  }

  const onLogoutInstagramSuccess = () => {

  }

  const handleInstagramLogin = () => {
    console.log('instagram login successful')
  }

  const INSTAGRAM_CLIENT_ID = '1382374749124081';
const REDIRECT_URI = 'https://react-social-login-nu.vercel.app';

  const handleLoginInstagramNew = () => {
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?response_type=code&client_id=${INSTAGRAM_CLIENT_ID}&scope=user_profile,user_media&redirect_uri=${REDIRECT_URI}`;
  
  // Open a new popup window for Instagram login
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      instagramAuthUrl,
      'Instagram Login',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }
  

  return (
    <>
      {provider && profile ? (
        <User provider={provider} profile={profile} accessToken={accessToken} onLogout={onLogoutSuccess} />
      ) : (
        <div className={`App ${provider && profile ? 'hide' : ''}`}>
          <h1 className='title'>ReactJS Social Login</h1>
          <LoginSocialFacebook
            isOnlyGetToken
            appId="1525658845022353"
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
              setAccessToken(data?.accessToken)
            }}
            onReject={(err) => {
              console.log("facebook login error: ", err)
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>

          <InstagramLogin
            clientId="1382374749124081"
             client_secret="de219cc3ade4a73ec82dead7fb7f100f"
            buttonText="Login"
            onSuccess={handleInstagramLogin}
          />

          <button onClick={handleLoginInstagramNew}>Instagram Login</button>


          <LoginSocialInstagram
            client_id="1382374749124081"
            client_secret="de219cc3ade4a73ec82dead7fb7f100f"
            redirect_uri="https://react-social-login-nu.vercel.app"
            onLoginStart={onLoginInstagramStart}
            onLogoutSuccess={onLogoutInstagramSuccess}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              setAccessToken(data?.accessToken)
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
          <InstagramLoginButton />
        </LoginSocialInstagram>

          <LoginSocialGoogle
            isOnlyGetToken
            client_id="4203717423-44fae31luanb6okq30affi42nt5evr0l.apps.googleusercontent.com"
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
              setAccessToken(data?.access_token)
            }}
            onReject={(err) => {
              console.log('google login error: ', err)
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>

        </div>
      )}
    </>
  )
}

export default App
