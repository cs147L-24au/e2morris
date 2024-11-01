import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import { getMyTopTracks } from "./utils/apiOptions"; // Function to fetch data
import Song from "./Song.js";

export default function App() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const [tracks, setTracks] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false); // Loading state for initial data
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for infinite scroll
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [hasMore, setHasMore] = useState(true); // Whether there are more tracks to load

  const limit = 20; // Number of tracks to fetch per request

  // Fetch initial set of tracks when the token is available
  useEffect(() => {
    const fetchTracks = async () => {
      if (token) {
        setLoading(true);
        try {
          const trackData = await getMyTopTracks(
            token,
            0,
            limit,
            "medium_term"
          ); // Fetch the first set of tracks
          setTracks(trackData);
          setOffset(trackData.length); // Set the offset based on the length of tracks
        } catch (error) {
          console.error("Error fetching tracks:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTracks();
  }, [token]);

  // Function to load more tracks when reaching the end of the list
  const loadMoreTracks = async () => {
    if (!loadingMore && hasMore && token) {
      setLoadingMore(true); // Set loading more state
      try {
        // Fetch the next set of tracks using the current offset
        const trackData = await getMyTopTracks(
          token,
          offset,
          limit,
          "medium_term"
        );

        if (trackData.length > 0) {
          setTracks((prevTracks) => [...prevTracks, ...trackData]); // Append new tracks to the list
          setOffset((prevOffset) => prevOffset + trackData.length); // Update the offset for the next fetch
        } else {
          setHasMore(false); // No more tracks to load
        }
      } catch (error) {
        console.error("Error fetching more tracks:", error);
      } finally {
        setLoadingMore(false); // Reset loading state
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {token ? (
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require("./assets/spotify-logo.png")}
              style={styles.headerlogo}
            />
            <Text style={styles.headerText}>My Top Tracks</Text>
          </View>

          {/* FlatList for displaying tracks */}
          <FlatList
            data={tracks}
            renderItem={({ index, item }) => {
              let artistNames = "";

              if (item && item.songArtists && item.songArtists.length > 0) {
                for (let i = 0; i < item.songArtists.length; i++) {
                  artistNames += item.songArtists[i].name;
                  if (i < item.songArtists.length - 1) {
                    artistNames += ", "; // Add a comma for all but the last artist
                  }
                }
              }

              return (
                <Song
                  index={index}
                  imageUrl={item.imageUrl}
                  title={item.songTitle}
                  artist={artistNames}
                  album={item.albumName}
                  duration={item.duration}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            onEndReached={loadMoreTracks} // Trigger when near the bottom
            onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
            ListFooterComponent={() =>
              loadingMore ? (
                <ActivityIndicator size="large" color="#00ff00" />
              ) : null
            } // Load/ show the loading spinner when fetching more data
          />
        </View>
      ) : (
        <Pressable onPress={() => getSpotifyAuth()} style={styles.button}>
          <Image
            source={require("./assets/spotify-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.buttonText}>CONNECT WITH SPOTIFY</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Themes.colors.background,
  },

  button: {
    backgroundColor: Themes.colors.spotify, // Use themes assest for color !
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 12,
  },
  headerlogo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  tracksText: {
    color: "white",
    fontSize: 16,
  },
  loadingText: {
    color: "gray",
    fontSize: 16,
  },
  header: {
    backgroundColor: Themes.colors.background,
    paddingVertical: 20,
    paddingHorizontal: 120,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
};

// In implementing the infinite scroll feature for my project, I a few online resources to deepen my understanding of how to structure and code it effectively.
// I researched various tutorials and documentation on general strategies for pagination and offset handling.
// By referencing these sources, I learned best practices for managing the loading state and setting up a reliable way to fetch additional data only when needed, optimizing performance.
// This knowledge allowed me to design the function, `loadMoreTracks`, that checks if more data is available and appends it to the existing list.
// I implemented the infinite scroll by setting `onEndReached` to trigger `loadMoreTracks` when the user reaches the bottom, enabling a seamless extension of content.
// This combination of online resources and hands-on coding allowed me to build a responsive and efficient infinite scroll experience.
