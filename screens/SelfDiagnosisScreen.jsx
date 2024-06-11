import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modal";

const SelfDiagnosisScreen = () => {
  const navigation = useNavigation();
  const [checks, setChecks] = useState(Array(14).fill(false));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState("");

  const handleCheck = (index) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleComplete = () => {
    const results = sections.map((section, sectionIndex) => {
      const countYes = section.questions.reduce(
        (count, _, questionIndex) =>
          checks[sectionIndex * 4 + questionIndex] ? count + 1 : count,
        0
      );

      if (countYes === 4) return `${section.title}: 중증`;
      if (countYes === 3) return `${section.title}: 중증도`;
      if (countYes === 2) return `${section.title}: 경증`;
      if (countYes === 1) return `${section.title}: 양호`;
      return `${section.title}: 이상 없음`;
    });

    setResult(results.join("\n"));
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate("TestHomeScreen");
  };

  const renderCheckBox = (label, index) => (
    <View key={index} style={styles.checkBoxContainer}>
      <CheckBox
        checked={checks[index]}
        onPress={() => handleCheck(index)}
        containerStyle={styles.checkBox}
        checkedColor="rgb(83, 122, 247)"
      />
      <Text style={styles.checkBoxLabel}>{label}</Text>
    </View>
  );

  const sections = [
    {
      title: "피지과다",
      questions: [
        "최근 두피가 기름지고 끈적이는 느낌이 자주 듭니까?",
        "하루가 지나면 두피가 기름져 보입니까?",
        "두피에 기름이 많아 머리카락이 쉽게 뭉치거나 눌리는 느낌이 듭니까?",
        "머리를 감은 후에도 두피가 쉽게 기름져 보입니까?",
      ],
    },
    {
      title: "모낭 사이 홍반",
      questions: [
        "두피에 붉은 반점이나 염증이 보입니까?",
        "두피에 따끔거리는 느낌이나 가려움증이 있습니까?",
        "머리를 감을 때 두피에 자주 통증이 느껴집니까?",
        "두피의 염증 부위가 점점 넓어지는 것 같습니까?",
      ],
    },
    {
      title: "탈모",
      questions: [
        "최근 머리카락이 평소보다 많이 빠지는 것 같습니까?",
        "머리를 감거나 빗을 때 머리카락이 많이 빠집니까?",
        "두피가 이전보다 눈에 띄게 보이는 부분이 있습니까?",
        "가족 중 탈모로 걱정하는 사람이 있습니까?",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>두피 자가진단 체크리스트</Text>
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.questions.map((question, questionIndex) =>
              renderCheckBox(question, sectionIndex * 4 + questionIndex)
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.resultTitle}>진단 결과</Text>
          <Text style={styles.resultText}>{result}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(0, 0, 0)",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgb(83, 122, 247)",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 5,
  },
  checkBox: {
    margin: 0,
    padding: 0,
  },
  checkBoxLabel: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  completeButton: {
    backgroundColor: "rgb(83, 122, 247)",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "rgb(83, 122, 247)",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "rgb(83, 122, 247)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SelfDiagnosisScreen;
