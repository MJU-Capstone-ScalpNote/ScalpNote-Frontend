import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const WritePostScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>글쓰기</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerButton}>저장</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        placeholderTextColor="#888"
        multiline
      />
    </View>
  );
};

export default WritePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButton: {
    fontSize: 16,
    color: "#007BFF",
  },
  titleInput: {
    height: 50,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  contentInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
});
