import { useState } from "react";
import { Button, StyleSheet, SafeAreaView, Text } from "react-native";
import { useSpotifyAuth, useSpotifyTracks } from "./utils";
import { Themes } from "./assets/Themes";

// You'll need these when fetching the tracks!
import getEnv from "./utils/env";
import { getMyTopTracks, getAlbumTracks } from "./utils/apiOptions";

export default function App() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const [tracks, setTracks] = useState(null);
  
  /* TODO: Once you are able to retrieve the token, figure out how
   * to fetch the tracks and store them in the `tracks` state variable */

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: This button is just for testing your auth implementation.
       * Replace this with a TouchableOpacity (or Pressible) when you can. */}
      <Button title="Test auth" onPress={() => getSpotifyAuth()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
