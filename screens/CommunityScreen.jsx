import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import CommunityHeader from "../components/CommunityHeader";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://43.201.108.238:8080/boards", {
        params: { page: 0, size: 10, sort: "createdAt,desc" },
      });
      setPosts(response.data.data.content);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const fetchPostDetails = async (postId) => {
    try {
      const response = await axios.get(
        `http://43.201.108.238:8080/boards/${postId}/simple-boards`
      );
      console.log(response.data.data);
      setSelectedPost(response.data.data);
      setComments(response.data.data.commentResList);
    } catch (error) {
      console.error("Error fetching post details", error);
    }
  };

  const postComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://43.201.108.238:8080/boards/comment/${selectedPost.postId}`,
        {
          userId: 1,
          content: newComment,
          parentId: replyTo,
        }
      );

      console.log("Comment posted:", response.data);

      fetchPostDetails(selectedPost.postId);
      setNewComment("");
      setReplyTo(null);
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.writer.name}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      <TouchableOpacity onPress={() => setReplyTo(item.id)}>
        <Text style={styles.replyButton}>답글</Text>
      </TouchableOpacity>
      {item.children && item.children.length > 0 && (
        <FlatList
          data={item.children}
          renderItem={renderComment}
          keyExtractor={(child) => child.id.toString()}
          style={styles.nestedCommentsList}
        />
      )}
    </View>
  );

  const renderPost = ({ item }) => (
    <TouchableOpacity onPress={() => fetchPostDetails(item.postId)}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
        <View style={styles.postFooter}>
          <Text style={styles.postAuthor}>
            {item.writer} · {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CommunityHeader />
      <View style={styles.content}>
        {selectedPost ? (
          <View style={styles.postDetailContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedPost(null);
                setComments([]);
              }}
              style={styles.backButtonContainer}
            >
              <Text style={styles.backButton}>＜ 돌아가기</Text>
            </TouchableOpacity>
            <Text style={styles.postDetailTitle}>{selectedPost.title}</Text>
            <Text style={styles.postDetailContent}>{selectedPost.content}</Text>
            {selectedPost.imageUrl && (
              <Image
                source={{ uri: encodeURI(selectedPost.imageUrl) }}
                style={styles.postDetailImage}
                onError={(e) =>
                  console.error("Image loading error: ", e.nativeEvent.error)
                }
              />
            )}
            <Text style={styles.postDetailAuthor}>
              {selectedPost.writer} ·{" "}
              {new Date(selectedPost.createdAt).toLocaleString()}
            </Text>
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.id.toString()}
              style={styles.commentsList}
            />
            <View style={styles.commentInputContainer}>
              {replyTo && (
                <Text style={styles.replyingToText}>
                  답글 대상:{" "}
                  {
                    comments.find((comment) => comment.id === replyTo)?.writer
                      ?.name
                  }
                </Text>
              )}
              <TextInput
                style={styles.commentInput}
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity style={styles.postButton} onPress={postComment}>
                <Text style={styles.postButtonText}>작성</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.postId.toString()}
          />
        )}
        {!selectedPost && (
          <TouchableOpacity
            style={styles.writeButton}
            onPress={() => navigation.navigate("WritePost")}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
              }}
              style={styles.writeButtonImage}
            />
          </TouchableOpacity>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingBottom: 10,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postContent: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postAuthor: {
    fontSize: 12,
    color: "#999",
  },
  postDetailContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    borderRadius: 10,
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    paddingBottom: 10,
  },
  backButton: {
    fontSize: 16,
    color: "rgb(83, 122, 247)",
  },
  postDetailTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  postDetailContent: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  postDetailAuthor: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  postDetailImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
    borderRadius: 10,
  },
  writeButton: {
    position: "absolute",
    right: 20,
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgb(127, 170, 255)",
    justifyContent: "center",
    alignItems: "center",
  },
  writeButtonImage: {
    width: 30,
    height: 30,
  },
  commentsList: {
    marginTop: 20,
  },
  nestedCommentsList: {
    marginLeft: 20,
    marginTop: 10,
  },
  commentContainer: {
    padding: 10,
  },
  commentAuthor: {
    borderTopColor: "#555",
    borderTopWidth: 1,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  commentContent: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  replyingToText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5,
  },
  replyButton: {
    color: "#007BFF",
    marginTop: 5,
  },
  postButton: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
