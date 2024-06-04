import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";
import CommunityHeader from "../components/CommunityHeader";
import { useNavigation } from "@react-navigation/native";

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
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

  const renderPost = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedPost(item)}>
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
      {selectedPost ? (
        <View style={styles.postDetailContainer}>
          <TouchableOpacity onPress={() => setSelectedPost(null)}>
            <Text style={styles.backButton}>＜ 뒤로가기</Text>
          </TouchableOpacity>
          <Text style={styles.postDetailTitle}>{selectedPost.title}</Text>
          <Text style={styles.postDetailContent}>{selectedPost.content}</Text>
          {selectedPost.imageUrl && (
            <>
              <Text>{selectedPost.imageUrl}</Text> {/* 이미지 URL 로그 출력 */}
              <Image
                source={{ uri: encodeURI(selectedPost.imageUrl) }} // URL 인코딩
                style={styles.postDetailImage}
                onError={(e) => console.error(e.nativeEvent.error)} // 이미지 로딩 에러 로그 출력
              />
            </>
          )}
          <Text style={styles.postDetailAuthor}>
            {selectedPost.writer} · {new Date(selectedPost.createdAt).toLocaleString()}
          </Text>
        </View>
      ) : (
        <FlatList data={posts} renderItem={renderPost} keyExtractor={(item) => item.postId.toString()} />
      )}
      <TouchableOpacity style={styles.writeButton} onPress={() => navigation.navigate("WritePost")}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
          }}
          style={styles.writeButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postContent: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postAuthor: {
    fontSize: 12,
    color: "#888",
  },
  postDetailContainer: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 15,
  },
  postDetailTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postDetailContent: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  postDetailAuthor: {
    fontSize: 14,
    color: "#888",
  },
  postDetailImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  writeButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
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
});
