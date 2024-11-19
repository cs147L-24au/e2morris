import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useRouter } from "expo-router"; 
import { Stack } from "expo-router"; 
import db from "@/database/db"; 

import Theme from "@/assets/theme";

export default function NewPost() {
  const [username, setUsername] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitPost = async () => {
    setIsLoading(true);
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await db.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        console.error("No user logged in");
        return;
      }

      // Prepare the post data
      const postData = {
        text: inputText,
        user_id: user.id,
        username: username || "Anonymous", // Use input username or default to Anonymous
      };

      const { error } = await db.from("posts").insert(postData);

      if (error) throw error;

      // Show success message and return to feed
      alert("Post submitted! Pull down to refresh the feed.");
      router.back();
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitDisabled = isLoading || inputText.length === 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "New Post",
          headerLeft: () => (
            <Text onPress={() => router.back()} style={styles.headerButton}>
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Text
              onPress={submitPost}
              style={[
                styles.headerButton,
                styles.headerButtonTextPrimary,
                submitDisabled && styles.headerButtonDisabled,
              ]}
            >
              Submit
            </Text>
          ),
        }}
      />
      <View style={styles.nameInputContainer}>
        <Text style={styles.nameInputPrompt}>Post as:</Text>
        <TextInput
          style={styles.nameInput}
          value={username}
          onChangeText={setUsername}
          placeholder={"Anonymous"}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </View>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={"What do you want to share?"}
        placeholderTextColor={Theme.colors.textSecondary}
        multiline
        textAlignVertical="top"
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  nameInputContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
  },
  nameInputPrompt: {
    color: Theme.colors.textPrimary,
  },
  nameInput: {
    color: Theme.colors.textSecondary,
  },
  headerButton: {
    fontSize: 17,
    color: Theme.colors.tintPrimary,
    padding: 8,
  },
  headerButtonTextPrimary: {
    fontSize: 18,
    color: Theme.colors.textHighlighted,
    fontWeight: "bold",
  },
  headerButtonDisabled: {
    opacity: 0.3,
  },
  input: {
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
    width: "100%",
    padding: 16,
  },
});
