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
    fetchUserProfile(accessToken);
  }, [profile, provider, accessToken]);

  return (
    <div className="card">
      {/* <div className="avt">
        <img alt="Profile Avatar" src={avatar} />
      </div> */}

      <h3 className="provider">{provider.toUpperCase()}</h3>

      <div className="content">
        <div className="data">
          {Object.entries(profile).map(([key, value]) => (
            <div className="field" key={key}>
              <div className="label">{key}: </div>
              <div className="value">{JSON.stringify(value)}</div>
            </div>
          ))}
        </div>
        <div><p>Name: {userData.name}</p></div>
        <div><p>Given Name: {userData.given_name}</p></div>
        <div><img src={userData.picture} style={{width: "40px", height: "40px"}}></img></div>
        <button className="btnLogout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
});

export default User;
