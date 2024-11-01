import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import millisToMinutesAndSeconds from "./utils/millisToMinutesAndSeconds"; // Given in assignment rec

const Song = ({ index, imageUrl, title, artist, album, duration }) => {
  return (
    <View style={styles.songContainer}>
      {/* Track number */}
      <Text style={styles.trackNumber}>{index + 1}</Text>
      {/* Iimage of album */}
      <Image source={{ uri: imageUrl }} style={styles.albumImage} />

      {/* Song title and artist name */}
      <View style={styles.songDetails}>
        <Text style={styles.songTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1} ellipsizeMode="tail">
          {artist}
        </Text>
      </View>

      {/* Name of album */}
      <Text style={styles.albumName} numberOfLines={1} ellipsizeMode="tail">
        {album}
      </Text>

      {/* Time length of song*/}
      <Text style={styles.duration}>{millisToMinutesAndSeconds(duration)}</Text>
    </View>
  );
};

export default Song;
const styles = StyleSheet.create({
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  albumName: {
    flex: 1,
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginRight: 15,
  },
  trackNumber: {
    color: "gray",
    fontSize: 16,
    marginRight: 15,
  },
  albumImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  songDetails: {
    flex: 2,
    justifyContent: "center",
    marginRight: 15,
  },
  songTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  songArtist: {
    color: "gray",
    fontSize: 12,
  },
  duration: {
    color: "white",
    fontSize: 14,
    textAlign: "right",
    width: 50,
  },
});
