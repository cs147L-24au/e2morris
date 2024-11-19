// Main layout for each tab in the tab bar... used tab link in assignent spec resources as guidance
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

// Home is linked to feed tab with the home icon
// Profile is linked to the profile tab with the user icon

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "grey" }}>
      {/* Feed Tab */}
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
