import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Footer from "../components/Footer";

const MyPage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing token", error);
    }
  };

  const fetchMyPageData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        "http://43.201.108.238:8080/users/mypage",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData(response.data.data);
      } else {
        console.error("Failed to fetch my page data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching my page data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPageData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Error loading user data.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Page</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.name}</Text>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{userData.role}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            color="rgb(83, 122, 247)"
          />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    width: "90%",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 15,
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default MyPage;
