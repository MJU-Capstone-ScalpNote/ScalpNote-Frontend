import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const GalleryScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets || []);
      setModalVisible(true); // 선택 완료 후 모달을 표시
    }
  };

  useEffect(() => {
    pickImages();
  }, []);

  const startDiagnosis = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {selectedImages.length > 0 ? (
        <View style={styles.imageContainer}>
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.image}
            />
          ))}
        </View>
      ) : (
        <Text>이미지를 선택해주세요.</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>두피 진단을 시작하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={startDiagnosis}
              >
                <Text style={styles.modalButtonText}>진단 시작</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>돌아가기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "30%",
    height: 100,
    margin: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  modalButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "rgb(83, 122, 247)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GalleryScreen;
