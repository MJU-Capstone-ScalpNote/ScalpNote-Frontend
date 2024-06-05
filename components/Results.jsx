import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, ScrollView } from "react-native";
import axios from "axios";

const Results = () => {
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDiagnosisHistory();
  }, []);

  const loadDiagnosisHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://43.201.108.238:8080/users/model6/history");
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        setDiagnosisHistory(response.data.data);
      } else {
        Alert.alert("Error", "Failed to fetch diagnosis history");
      }
    } catch (error) {
      console.error("Error fetching diagnosis history:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to fetch diagnosis history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="진단 내역 갱신" onPress={loadDiagnosisHistory} />
      <View style={styles.resultTitle}>
        <Text style={styles.Title}>나의 진단내역</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : diagnosisHistory.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {diagnosisHistory.map((result) => (
            <View key={result.id} style={styles.diagnosisContainer}>
              <TouchableOpacity style={styles.diagnosis}>
                <Text style={styles.diagnosisText}>{new Date(result.createdAt).toLocaleDateString()}</Text>
                <Text style={styles.diagnosisText}>탈모 {result.scalpCondition}단계</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  scrollView: {
    width: '100%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
  },
});
