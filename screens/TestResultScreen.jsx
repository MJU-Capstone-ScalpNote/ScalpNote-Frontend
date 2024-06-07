import React from "react";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Results from "../components/Results";
import StartTest from "../components/StartTest";
import Footer from "../components/Footer";

const TestResultScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Results />
      </View>

      <Footer />
    </View>
  );
};

export default TestResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  resultContainer: {
    flex: 1,
    padding: 20,
  },
});
