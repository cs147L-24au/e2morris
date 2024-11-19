import getEnv from "./env";
import { useState, useEffect } from "react";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";

import * as WebBrowser from "expo-web-browser";

const {
  REDIRECT_URI,
  SCOPES,
  CLIENT_ID,
  ALBUM_ID,
  SPOTIFY_API: { DISCOVERY },
} = getEnv();

// Needed so that the browser closes the modal after auth token
WebBrowser.maybeCompleteAuthSession();

const useSpotifyAuth = () => {
  const [token, setToken] = useState(null);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI,
    },
    DISCOVERY
  );

  useEffect(() => {
    console.log("useEffect is running"); // Confirm that useEffect is working
    if (response?.type === "success") {
      //Checks if response exits
      console.log("Response:", JSON.stringify(response, null, 2)); // Pretty print the response
      const { access_token } = response.params;
      setToken(access_token);
      console.log("WORKING");
    } else {
      console.log("No success in response");
    }
  }, [response]);

  return { token, getSpotifyAuth: promptAsync }; // Access token Spotify API 
};

export default useSpotifyAuth;
