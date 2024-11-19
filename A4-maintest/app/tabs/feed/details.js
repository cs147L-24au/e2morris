import { useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import db from "@/database/db";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import CommentFeed from "@/components/CommentFeed";

export default function Details() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id, username, timestamp, text, score, vote, commentCount } =
    useLocalSearchParams();

  const submitComment = async () => {
    setIsLoading(true);
    try {
      // Get the current user that way the same user cant vote twice on same thing
      const {
        data: { user },
        error: userError,
      } = await db.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        console.error("No user logged in");
        return;
      }

      const { data, error } = await db.from("comments").insert({
        post_id: id,
        user_id: user.id,
        username: user.email.split("@")[0],
        text: inputText,
        timestamp: new Date().toISOString(),
      });

      if (error) {
        console.error("ERROR submitting comment:", error);
        alert("Failed to submit comment:( Please try again.");
      } else {
        console.log("Comment submitted successfully:", data);
        setInputText("");
        alert("Comment submitted!!! Pull down to refresh and see the update.");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert("Error submitting comment. Please try again.");
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const submitDisabled = isLoading || inputText.length === 0;

  return (
    <View style={styles.container}>
      <Post
        id={id}
        username={username}
        timestamp={timestamp}
        text={text}
        score={Number(score)}
        vote={Number(vote)} // Converting string to number here
        commentCount={Number(commentCount)}
        shouldNavigateOnPress={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
        style={styles.keyboardContainer}
      >
        <CommentFeed postId={id} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={"Write a comment..."}
            placeholderTextColor={Theme.colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={submitComment}
            disabled={submitDisabled}
          >
            <FontAwesome
              size={24}
              name="send"
              color={
                submitDisabled
                  ? Theme.colors.iconSecondary
                  : Theme.colors.iconHighlighted
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  keyboardContainer: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 8,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  input: {
    paddingLeft: 12,
    marginRight: 8,
    height: 48,
    borderRadius: 24,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
  },
  sendButton: {
    padding: 4,
  },
});
