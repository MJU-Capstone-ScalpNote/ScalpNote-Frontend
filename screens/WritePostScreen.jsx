import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WritePostScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    // 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("카메라 접근 권한이 필요합니다.");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!title.trim() || !content.trim()) {
        Alert.alert("오류", "제목과 내용을 입력하세요.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      // FormData 로그 출력
      console.log("FormData before sending:");
      formData._parts.forEach(part => console.log(part));

      const response = await axios.post("http://43.201.108.238:8080/boards/new", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("성공", "게시물이 작성되었습니다.");
        navigation.goBack();
      } else {
        Alert.alert("오류", "게시물 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving post", error);
      Alert.alert("오류", "게시물 작성 중 오류가 발생했습니다.");
    }
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
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>이미지 선택</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
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
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  imagePickerText: {
    color: "#007BFF",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
});
