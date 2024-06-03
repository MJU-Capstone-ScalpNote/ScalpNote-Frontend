import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import CommunityHeader from "../components/CommunityHeader";
import { useNavigation } from "@react-navigation/native";

const CommunityScreen = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigation = useNavigation();

  const dummyPosts = [
    {
      id: "1",
      title: "뚝딱 베이비 하윤이를 소개합니다.",
      content: "뚝딱 앱에 들어오실 때 말똥말똥 매력...",
      date: "2일 전",
      author: "운영자",
      likes: 14,
      comments: 20,
    },
    {
      id: "2",
      title: "오늘 아침 8시 즈음 자동 결제된 거 취소 환불 가능한가요?",
      content: "혹시 이미 결제되어 환불은 불가능한가요? ㅠㅠ",
      date: "방금",
      author: "o1806xua",
      likes: 0,
      comments: 0,
    },
    {
      id: "3",
      title: "자동결제가 되어서 깜짝 놀랐네요",
      content: "뚝딱 사용하지 않았어요 환불해 주세요",
      date: "방금",
      author: "bhb8492w",
      likes: 0,
      comments: 0,
    },
    {
      id: "4",
      title: "자동결제 취소 환불해주세요",
      content: "",
      date: "32분 전",
      author: "l91y67qc",
      likes: 0,
      comments: 0,
    },
  ];

  const renderPost = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedPost(item)}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
        <View style={styles.postFooter}>
          <Text style={styles.postAuthor}>
            {item.author} · {item.date}
          </Text>
          <View style={styles.postStats}>
            <Text style={styles.postStat}>좋아요 {item.likes}</Text>
            <Text style={styles.postStat}>댓글 {item.comments}</Text>
          </View>
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
          <Text style={styles.postDetailAuthor}>
            {selectedPost.author} · {selectedPost.date}
          </Text>
        </View>
      ) : (
        <FlatList
          data={dummyPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => navigation.navigate("WritePost")}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
          }} // 아이콘 URL
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
  postStats: {
    flexDirection: "row",
  },
  postStat: {
    fontSize: 12,
    color: "#888",
    marginLeft: 10,
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
  writeButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  writeButtonImage: {
    width: 30,
    height: 30,
  },
});
