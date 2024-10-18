import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Icons from "../../assets/Icons";

// get dimensions!
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Footer = () => {
  return (
    <View style={styles.navigationContainer}>
      {/* discover icon */}
      <View style={styles.iconContainer}>
        <Image source={Icons.discover.light} style={styles.icon} />
        <Text style={styles.iconText}>Discover</Text>
      </View>

      {/* matche icon */}
      <View style={styles.iconContainer}>
        <Image source={Icons.heart.light} style={styles.icon} />
        <Text style={styles.iconText}>Matches</Text>
      </View>

      {/* DMs icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconPosition}>
          <Image source={Icons.messages.light} style={styles.icon} />
        </View>
        <Text style={styles.iconText}>DMs</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // evenly space icons across the screen
    alignItems: "center", // vertically center the icons
    backgroundColor: "black",
    paddingVertical: windowHeight * 0.02, // vertical padding based on screen height
    position: "absolute", // stick it to the bottom lol
    bottom: 0,
    left: 0,
    right: 0,
    height: windowHeight * 0.12,
    width: windowWidth, // full width of the screen
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  iconPosition: {
    right: 0,
    alignItems: "center", // makes icon centered
  },
  icon: {
    width: windowWidth * 0.08, // icon WIDTH is 8% of the screen width
    height: windowWidth * 0.08, // icon HEIGHT is 8% of the screen width
    marginBottom: windowWidth * 0.01,
  },
  iconText: {
    fontSize: windowWidth * 0.03, // Font size adjusted to screen width (!!helpful when scaling differnt sized tablets)
    color: "white",
  },
});

export default Footer;
