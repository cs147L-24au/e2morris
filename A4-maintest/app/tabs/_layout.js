import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Theme from "@/assets/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.tintPrimary,
        tabBarStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
          borderTopWidth: 1,
          borderTopColor: Theme.colors.border,
        },
        headerStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 44,
        },
        headerTitleAlign: "center",
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <MaterialCommunityIcons
              name="bee"
              size={20}
              color="#f97316"
              style={styles.icon}
            />
            <Text style={styles.headerText}>Buzz</Text>
          </View>
        ),
        contentStyle: {
          backgroundColor: Theme.colors.backgroundPrimary,
        },
      }}
    >
      {/* Feed Tab */}
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="beehive-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={40} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 4,
  },
  headerText: {
    color: Theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
