import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import SelfDiagnosisModal from "../components/SelfDiagnosisModal";

const TestHomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);

  const handleCamera = () => {
    navigation.navigate("CameraTestScreen");
  };

  const handleGallery = () => {
    navigation.navigate("Gallery");
  };

  const handleCameraGuide = () => {
    navigation.navigate("CameraGuide");
  };

  const handleSelfDiagnosis = () => {
    navigation.navigate("SelfDiagnosis");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNavigateToSelfDiagnosis = () => {
    setModalVisible(false);
    navigation.navigate("SelfDiagnosis");
  };

  return (
    <View style={styles.container}>
      <SelfDiagnosisModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onNavigate={handleNavigateToSelfDiagnosis}
      />
      <View style={styles.header}>
        <Text style={styles.instructions}>
          두피가 자세히 보이도록 {"\n"}사진을 찍어주세요!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.guideContainer}
        onPress={handleCameraGuide}
      >
        <Image
          source={require("../assets/images/camera.png")}
          style={styles.guideImage}
        />
        <View style={styles.guideContent}>
          <Text style={styles.guideTitle}>두피 촬영 가이드</Text>
          <Text style={styles.guideButtonText}>
            정확한 진단을 위해{"\n"}가이드를 먼저 읽어주세요!
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.guideContainer}
        onPress={handleSelfDiagnosis}
      >
        <Image
          source={require("../assets/images/checkScalp.png")}
          style={styles.guideImage}
        />
        <View style={styles.guideContent}>
          <Text style={styles.guideTitle}>두피 자가진단 해보기</Text>
          <Text style={styles.guideButtonText}>
            자가진단 테스트를 통해{"\n"}두피 상태를 확인해보세요!
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCamera}>
          <Text style={styles.buttonText}>두피 사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGallery}>
          <Text style={styles.buttonText}>두피 사진 업로드</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  instructions: {
    fontSize: 24,
    fontWeight: "bold",
  },
  guideContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  guideImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  guideButtonText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30,
  },
  button: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TestHomeScreen;
