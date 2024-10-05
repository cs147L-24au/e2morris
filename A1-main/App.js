// IMPORTING things we need!
// View, Text, Image, and StyleSheet are core building blocks for React Native apps.
// SafeAreaView is used to ensure the app positions content appropriately around notches and other OS interface elements.
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import { useEffect } from "react";
import runExercises from "./Exercises";

// EXPORTING something we build!
// Remember, UI Components are functions under the hood and they return JSX (UI). This App component returns a "SafeAreaView" with more components nested underneath.
export default function App() {
  // START - don't modify the below code
  useEffect(() => {
    runExercises();
  }, []);
  // END - don't modify the above code

  // Feel free to edit anything starting here! --------------------------------------------

  const welcomeMessage = "What is a dog's favorite meal?";
  const welcomeMessage2 = "JOKE OF THE DAY:";
  const answer = "BARK-B-Q";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title2}>{welcomeMessage2}</Text>
      <Text style={styles.title}>{welcomeMessage}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Click here to reveal the answer" style={styles.button} />
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={require("./assets/dog .png")} />
      </View>
    </SafeAreaView>
  );
}

// STYLING for our app!
// Here, we define all the styling that we use in our app. The format is always "const styles = StyleSheet.create({...})". The "styles" object contains style objects. We can access a style X with "styles.X". We will learn more about styles and the "StyleSheet" component next Tuesday:-)
const styles = StyleSheet.create({
  container: {
    flex: 1, // We'll learn about "flex" and other flexbox properties in class!
    flexDirection: "column", // Try: 'row' or 'column'
    alignItems: "center", // Try: 'flex-start' or 'center' or 'flex-end'
    justifyContent: "center", // Try: 'flex-start' or 'flex-end' or 'space-between' or 'space-around' or 'space evenly'
    backgroundColor: "#abc999", // Try different color hex codes!
    padding: 50, // Try changing this value!
  },
  imageContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20, // Try changing this value!
    fontWeight: "bold", // Try: 'light' or 'normal' or 'bold'
    textAlign: "center",
  },
  title2: {
    fontSize: 40, // Try changing this value!
    fontWeight: "normal", // Try: 'light' or 'normal' or 'bold'
    textAlign: "center",
  },
  paragraph: {
    // Try changing these values!
    margin: 70,
    fontSize: 70,
    textAlign: "center",
  },
  logo: {
    // Try changing these values!
    height: 130,
    width: 100,
    margin: 20,
  },
  buttonContainer: {
    borderWidth: 2, // Width of the border
    borderColor: "#000", // Color of the border (black in this case)
    borderRadius: 10, // Rounds the corners of the border
    padding: 10, // Adds space between the button and the border
    marginTop: 20, // Space above the box
    backgroundColor: "#f0f0f0",
  },
});
