import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import Profiles from "../../assets/Profiles";
import Icons from "../../assets/Icons";

/* This handy trick grabs the width and height of the device's window,
 * which lets you set the sizes of your UI elements relative to the
 * dimensions of the device. */
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Body = () => {
  const [liked, setLiked] = useState(false);

  // function to handle pressing the like button
  const toggleLike = () => {
    setLiked(!liked); // switches between true and false
  };

  let likeIcon;
  if (liked) {
    likeIcon = Icons.likeOn.light;
  } else {
    likeIcon = Icons.likeOff.light;
  }

  return (
    <View style={styles.container}>
      {/* profile pic and text label above*/}
      <View style={styles.profileCard}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Me and my best friend</Text>
        </View>

        <Image source={Profiles.landay.image} style={styles.image} />

        {/* heart button make it pressable */}
        <Pressable style={styles.likeButton} onPress={toggleLike}>
          <Image source={likeIcon} style={styles.icon} />
        </Pressable>
      </View>

      {/* audio hottest take section */}
      <View style={styles.hottestTakeContainer}>
        <Text style={styles.hottestTakeLabel}>My hottest take</Text>
        <View style={styles.audioContainer}>
          <Image source={Icons.player.light} style={styles.playButton} />
          <Image source={Icons.audioWave.light} style={styles.waveform} />
        </View>
      </View>
    </View>
  );
};

const isLargeScreen = windowWidth > 768; // Determine if it's an iPad or large device

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: windowHeight * 0.03,
    flex: 1,
  },
  profileCard: {
    flex: isLargeScreen ? 0.45 : 0.5, // Adjust flex based on device size, see extension note at bottom
    width: windowWidth * 0.85,
    borderRadius: windowWidth * 0.08,
    backgroundColor: "white",
    borderColor: "#white",
    position: "relative",
    paddingTop: windowHeight * 0.06,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    top: "0.5%",
    left: "5%",
    paddingVertical: windowHeight * 0.02, // Vertical padding based on screen height
    paddingHorizontal: windowWidth * 0.01, // Horizontal padding based on screen width
    borderRadius: windowWidth * 0.05, // Border radius based on screen width
    position: "absolute",
    alignItems: "flex-start",
  },
  image: {
    width: "100%", // Full width of the profile card
    height: "100%",
    borderBottomLeftRadius: windowWidth * 0.05,
    borderBottomRightRadius: windowWidth * 0.04,
    resizeMode: "cover", // Ensure image covers the available space without stretching
  },
  likeButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  label: {
    font: "Sydney",
    fontWeight: "bold",
    fontSize: windowWidth * 0.045,
    color: "black",
    textAlign: "center",
  },

  // Styles for Hottest Take Section
  hottestTakeContainer: {
    flex: isLargeScreen ? 0.35 : 0.3, // part of extension feature cited at bottom
    width: windowWidth * 0.85,
    backgroundColor: "white",
    borderRadius: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    borderColor: "white",
    alignItems: "flex-start",
    marginTop: windowHeight * 0.02,
    justifyContent: "center",
  },
  hottestTakeLabel: {
    fontWeight: "bold",
    fontSize: windowWidth * 0.05,
    color: "black",
    marginBottom: windowHeight * 0.01,
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    marginRight: windowWidth * 0.04,
  },
  waveform: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.05,
  },
});

export default Body;

/*
  For my extension, I chose to implement responsiveness across different tablet and phone sizes. I used various 
  responsive design techniques to ensure that the layout works seamlessly on both small and large screens. 
  This includes leveraging flexbox (`flex: 1`, `flex: 0.5`, etc.) to adjust the layout dynamically, and using 
  the Dimensions API (`Dimensions.get("window").width`) to get the device's width and height.
  I incorporated conditional logic (`isLargeScreen`) to differentiate between larger screens (such as tablets) and smaller 
  ones, allowing for different layout and font size adjustments. Additionally, I used percentages for width, height, and 
  positioning (e.g., `width: "100%"`, `left: "5%"`) to ensure that the components scale fluidly across devices. 
  This approach allows the app to adjust its design based on the screen size, ensuring a user-friendly interface on both 
  tablets and phones. Much of this code was adapted from online resources and best practices in responsive design.
  Sources: React Native Flexbox, React Native Dimensions, and Responsive Design Techniques.
*/
