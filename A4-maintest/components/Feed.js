import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import db from "@/database/db";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import timeAgo from "@/utils/timeAgo";

export default function Feed({
  shouldNavigateToComments = false,
  fetchUsersPostsOnly = false,
}) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Start with the posts_with_counts view as specified in assignment
      let query = db
        .from("posts_with_counts")
        .select("*")
        .order("timestamp", { ascending: false });

      // If we're on the profile tab, filter for current user's posts
      if (fetchUsersPostsOnly) {
        const {
          data: { user },
        } = await db.auth.getUser();
        if (user) {
          query = query.eq("user_id", user.id);
        }
      }

      // Fetch the posts
      const { data: postsData, error } = await query;

      if (error) throw error;

      // Get current user's votes on these posts
      const {
        data: { user },
      } = await db.auth.getUser();
      if (user) {
        const { data: votesData, error: votesError } = await db
          .from("likes")
          .select("post_id, vote")
          .eq("user_id", user.id);

        if (votesError) throw votesError;

        // Combine posts with user's votes
        const postsWithVotes = postsData.map((post) => ({
          ...post,
          vote: votesData.find((vote) => vote.post_id === post.id)?.vote || 0,
        }));

        setPosts(postsWithVotes);
      } else {
        setPosts(postsData);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchUsersPostsOnly]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Post
          shouldNavigateOnPress={shouldNavigateToComments}
          id={item.id}
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
          score={item.like_count}
          vote={item.vote}
          commentCount={item.comment_count}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
          }}
          tintColor={Theme.colors.textPrimary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: "100%",
  },
  posts: {
    gap: 8,
  },
});
