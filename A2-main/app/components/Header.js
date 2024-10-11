import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

/* Files called index.js are treated specially by Node.js.
 * You can import them by giving the name of the folder the index.js
 * is located in! */
import Icons from "../../assets/Icons";

/* This handy trick grabs the width and height of the device's window,
 * which lets you set the sizes of your UI elements relative to the
 * dimensions of the device. */
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.namePronouns}>
        <Text style={styles.name}>{Profiles.landay.name}</Text>
        <Text style={styles.pronouns}>{Profiles.landay.pronouns}</Text>
      </View>
      <View style={styles.iconPosition}>
        <Image
          source={Icons.sun /* For dark mode, use Icons.moon */}
          style={styles.headerIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // fill this in!
    flexDirection: "row", // horizontal layout
    alignItems: "center", // Align items vertically centered
    justifyContent: "space-between", // Space between name/pronouns and icon
    paddingHorizontal: 15, // Adjust horizontal padding as needed
    paddingTop: 50, // Padding from top to account for any notch
    paddingBottom: 10, // Adjust bottom padding
  },
  namePronouns: {
    flexDirection: "column", // stack name and pronouns vertically
    alignItems: "flex-start",
  },
  iconPosition: {
    right: 15, // Align icon to the right side
    top: 20, // Adjust this to control vertical placement relative to the notch
  },
  headerIcon: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    alignSelf: "flex-end", // ?
  },
  name: {
    // We've loaded this font for you in App.js
    fontFamily: "Sydney-Bold", // 'Sydney' is the non-bold version
    fontSize: 36,
  },
  pronouns: {
    fontFamily: "Sydney", // Match with the non-bold version
    fontSize: 16, // Adjust font size for pronouns
    color: "gray", // Set a gray color for pronouns
  },
  // add more styles for other components!
});

export default Header;
