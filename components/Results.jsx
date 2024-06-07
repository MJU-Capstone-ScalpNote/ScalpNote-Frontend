import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import axios from "axios";

const Results = () => {
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDiagnosisHistory();
  }, []);

  const loadDiagnosisHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://43.201.108.238:8080/users/model6/history"
      );
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        setDiagnosisHistory(response.data.data);
      } else {
        Alert.alert("Error", "Failed to fetch diagnosis history");
      }
    } catch (error) {
      console.error(
        "Error fetching diagnosis history:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Failed to fetch diagnosis history");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDiagnosisHistory();
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultTitle}>
        <Text style={styles.title}>나의 진단내역</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : diagnosisHistory.length > 0 ? (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {diagnosisHistory.map((result) => (
            <View key={result.id} style={styles.diagnosisContainer}>
              <View style={styles.diagnosis}>
                <View style={styles.diagnosisDate}>
                  <Image
                    source={require("../assets/images/calendar.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.diagnosisText}>
                    {new Date(result.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.diagnosisStage}>
                  <Image
                    source={require("../assets/images/character.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.diagnosisText}>
                    탈모 {result.scalpCondition}단계
                  </Text>
                </View>
              </View>
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
    backgroundColor: "#f4f6f8",
    padding: 16,
    borderRadius: 10,
  },
  scrollView: {
    width: "100%",
  },
  resultTitle: {
    marginTop: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#343a40",
  },
  diagnosisContainer: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 15,
  },
  diagnosis: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  diagnosisDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  diagnosisStage: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  diagnosisText: {
    fontSize: 18,
    color: "#495057",
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
