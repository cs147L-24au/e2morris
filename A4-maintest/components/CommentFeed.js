import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import db from "@/database/db"; // Added db import

import Theme from "@/assets/theme";
import Comment from "./Comment";
import Loading from "./Loading";

import timeAgo from "@/utils/timeAgo";

export default function CommentFeed({ postId }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      // Fetch comments for the specific post
      const { data: commentsData, error } = await db
        .from("comments")
        .select("*") // Select all fields from comments table
        .eq("post_id", postId) // Filter by post_id
        .order("timestamp", { ascending: true }); // Order by timestamp, oldest first

      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      setComments(commentsData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch comments when component mounts or postId changes
  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <Comment
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchComments();
          }}
          tintColor={Theme.colors.textPrimary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 24,
  },
  posts: {
    gap: 8,
  },
});
