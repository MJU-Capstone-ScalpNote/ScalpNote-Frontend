import {
  Image,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyPage from "../screens/MyPage";

const windowWidth = Dimensions.get("window").width;

const Footer = () => {
  const [isLoggined, setIsLoggined] = useState(false);
  const navigation = useNavigation();

  const GoHome = () => {
    navigation.navigate("Home");
  };
  const GoLogin = () => {
    navigation.navigate("Login");
  };
  const GoTestResult = () => {
    navigation.navigate("TestResult");
  };
  const GoCommunity = () => {
    navigation.navigate("Community");
  };
  const GoMyPage = () => {
    navigation.navigate("MyPage");
  };

  //   const handleMyPage = () => {
  //     if (!isLoggined) {
  //       Alert.alert(
  //         "로그인 필요", // 알림 제목
  //         "마이페이지를 이용하려면 로그인이 필요합니다.", // 알림 메시지
  //         [
  //           { text: "로그인하기", onPress: GoLogin },
  //           {
  //             text: "취소",
  //             onPress: () => console.log("로그인 취소"),
  //             style: "cancel",
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     } else {
  //       navigation.navigate("MyPage");
  //     }
  //   };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GoHome}>
        <Image
          source={require("../assets/images/homeIcon.png")}
          style={styles.homeIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={GoTestResult}>
        <Image
          source={require("../assets/images/diagnosisIcon.png")}
          style={styles.diagnosisIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={GoCommunity}>
        <Image
          source={require("../assets/images/communityIcon.png")}
          style={styles.communityIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={GoMyPage}>
        <Image
          source={require("../assets/images/mypageIcon.png")}
          style={styles.mypageIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: windowWidth,
    height: 80,
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 25,
    paddingBottom: 10,
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  footer: {
    backgroundColor: "black",
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  diagnosisIcon: {
    width: 32,
    height: 32,
  },
  communityIcon: {
    width: 35,
    height: 35,
  },
  mypageIcon: {
    width: 45,
    height: 45,
  },
});
