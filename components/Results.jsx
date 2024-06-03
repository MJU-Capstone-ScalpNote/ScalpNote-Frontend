import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";

const Results = () => {
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);

  const loadNoResults = () => {
    setDiagnosisHistory([]);
  };

  const loadDummyResults = () => {
    setDiagnosisHistory([
      { date: "2024-05-26", diagnosis: "탈모 2단계" },
      { date: "2024-05-27", diagnosis: "탈모 1단계" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="진단 내역 없음" onPress={loadNoResults} />
      <Button title="진단 내역 2개 로드" onPress={loadDummyResults} />
      <View style={styles.resultTitle}>
        <Text style={styles.Title}>나의 진단내역</Text>
      </View>
      {diagnosisHistory.length > 0 ? (
        diagnosisHistory.map((result, index) => (
          <View key={index} style={styles.diagnosisContainer}>
            <TouchableOpacity style={styles.diagnosis}>
              <Text style={styles.diagnosisText}>{result.date}</Text>
              <Text style={styles.diagnosisText}>{result.diagnosis}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>진단 내역이 없습니다</Text>
        </View>
      )}
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 16,
  },
  resultTitle: {
    marginBottom: 15,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  diagnosisContainer: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
  },
  diagnosis: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  diagnosisText: {
    fontSize: 18,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "gray",
  },
});
