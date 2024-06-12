import React, { memo, useEffect, useState } from "react";

const User = memo(({ provider, profile, accessToken, onLogout }) => {
  console.log(
    "provider ",
    provider,
    "profile ",
    profile,
    "accessToken ",
    accessToken
  );

  const avatar =
    profile?.avatar ||
    profile?.profile_image_url ||
    profile?.avatar_url ||
    profile?.picture ||
    profile?.picture?.data?.url ||
    profile?.profile_image_url_https ||
    "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png";

  const [userData, setUserData] = useState([])

  useEffect(() => {

    console.log('profile ', profile, 'provider ', provider, 'accessToken ', accessToken)

    const fetchUserProfile = async (accessToken) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
            accessToken
        );
        const data = await response.json();
        setUserData(data)
        console.log("User profile data:", data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    const fetchUserProfileFacebook = async (accessToken) => {
      try {
        const profileResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
        const profileData = await profileResponse.json();
        console.log('User profile data:', profileData);
        setUserData(profileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if(provider === "google"){
      fetchUserProfile(accessToken);
    }

    if(provider === "facebook"){
      fetchUserProfileFacebook(accessToken);
    }


  }, [profile, provider, accessToken]);

  return (
    <div className="card">
      {/* <div className="avt">
        <img alt="Profile Avatar" src={avatar} />
      </div> */}

<div><img src={userData.picture} style={{width: "140px", height: "140px", borderRadius:  "50%", objectFit: "cover"}}></img></div>

      <h3 className="provider">{provider.toUpperCase()}</h3>

      <div className="content">
        {/* <div className="data">
          {Object.entries(profile).map(([key, value]) => (
            <div className="field" key={key}>
              <div className="label">{key}: </div>
              <div className="value">{JSON.stringify(value)}</div>
            </div>
          ))}
        </div> */}
        <div><p>Access Token: {accessToken}</p></div>
        <div><p>Name: {userData.name}</p></div>
        <div><p>Email: {userData.email} </p></div>
        {/* <div><p>Given Name: {userData.given_name}</p></div> */}

        <br></br>
        <br></br>
        
        <button className="btnLogout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
});

export default User;
