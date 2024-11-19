import { Stack } from "expo-router/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Theme from "@/assets/theme";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary, // Dark mode for header
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderBottomWidth: 0,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Theme.colors.textPrimary,
          fontSize: 20,
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: Theme.colors.backgroundPrimary, // Match content background to dark mode
        },
      }}
    >
      {/* Home Screen */}
      <Stack.Screen
        name="home"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <MaterialCommunityIcons
                name="bee" // Icon for Buzz lol
                size={40}
                color="orange"
              />
              <Text style={styles.headerTitle}>Buzz</Text>
            </View>
          ),
          headerShown: true,
        }}
      />

      {/* Details Screen */}
      <Stack.Screen
        name="details"
        options={{
          title: "Comments",
        }}
      />

      {/* New Post Screen */}
      <Stack.Screen
        name="newpost"
        options={{
          title: "New Post",
          presentation: "modal", // Modal style for new posts
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
  },
});
