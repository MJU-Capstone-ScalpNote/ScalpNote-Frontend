import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const SelfDiagnosisModal = ({ visible, onClose, onNavigate }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            자가진단 테스트 먼저 진행해보세요 !
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onNavigate}>
            <Text style={styles.modalButtonText}>자가진단 테스트 시작</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "rgb(83, 122, 247)",
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "gray",
    fontSize: 14,
  },
});

export default SelfDiagnosisModal;
