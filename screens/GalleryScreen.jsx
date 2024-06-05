import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

const GalleryScreen = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (photoUri) {
      uploadImage(photoUri);
    }
  }, [photoUri]);

  const uploadImage = async (uri) => {
    setLoading(true);
    const formData = new FormData();
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("file", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await axios.post(
        "http://52.78.154.226:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const predictionResult = response.data.prediction[0];
      setPrediction(predictionResult);
      determineDiagnosis(predictionResult);
    } catch (error) {
      Alert.alert("Error", "Failed to upload image and get prediction.");
      console.error("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  const determineDiagnosis = (prediction) => {
    const maxIndex = prediction.indexOf(Math.max(...prediction));
    const stages = ["0단계", "1단계", "2단계", "3단계"];
    setDiagnosis(stages[maxIndex]);
  };

  const saveDiagnosis = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const maxIndex = prediction.indexOf(Math.max(...prediction));
      const response = await axios.post(
        "http://43.201.108.238:8080/users/model6",
        { hairCondition: maxIndex.toString() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Alert.alert("Success", response.data.data.message);
    } catch (error) {
      Alert.alert("Error", "Failed to save diagnosis.");
      console.error("Error saving diagnosis", error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.resultContainer}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>
                사진 선택 후 진단 시작하기
              </Text>
            </TouchableOpacity>
            {photoUri && (
              <>
                <Image source={{ uri: photoUri }} style={styles.image} />
                <Text style={styles.diagnosisText}>진단 결과: {diagnosis}</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveDiagnosis}
                >
                  <Text style={styles.saveButtonText}>진단 결과 저장</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  resultContainer: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
  },
  diagnosisText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  homeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
