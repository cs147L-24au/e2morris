import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

/* Files called index.js are treated specially by Node.js.
 * You can import them by giving the name of the folder the index.js
 * is located in! */
import Icons from "../../assets/Icons";
//import Themes from "../../assets/Themes";

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
        <Image source={Icons.sun} style={styles.headerIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // horizontal layout
    alignItems: "center",
    justifyContent: "space-between", // between name/pronouns and icon
    paddingHorizontal: windowWidth * 0.04,
    paddingTop: windowHeight * 0.05,
    paddingBottom: windowHeight * 0.01,
  },
  namePronouns: {
    flexDirection: "column", // stack name and pronouns vertically like example
    justifyContent: "center",
    flex: 1,
  },
  iconPosition: {
    right: 0,
  },
  headerIcon: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    marginLeft: windowWidth * 0.02,
  },
  name: {
    fontFamily: "Sydney-Bold",
    fontSize: windowWidth * 0.08,
  },
  pronouns: {
    fontFamily: "Sydney", // Match with the non-bold version
    fontSize: windowWidth * 0.04, // Adjust font size for pronouns
    color: "gray", // Set a gray color for pronouns
  },
});

export default Header;
