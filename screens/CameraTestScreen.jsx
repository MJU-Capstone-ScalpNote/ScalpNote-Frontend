import { Camera, CameraType } from "expo-camera/legacy";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";

const CameraTestScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);
  const [photoUri, setPhotoUri] = useState(null);
  const [isPhotoSaved, setIsPhotoSaved] = useState(false); // 이미지 저장 여부 상태 추가
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          카메라를 사용하기 위해서 권한이 필요합니다.
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!mediaPermission) {
    return <View />;
  }

  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          갤러리에 저장하기 위해서 권한이 필요합니다.
        </Text>
        <Button onPress={requestMediaPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setIsPhotoSaved(false); // 새로운 사진을 찍었을 때 저장 여부 초기화
    }
  };

  const savePicture = async () => {
    if (photoUri) {
      try {
        const asset = await MediaLibrary.createAssetAsync(photoUri);
        await MediaLibrary.createAlbumAsync("ExpoPhotos", asset, false);
        setIsPhotoSaved(true); // 사진이 저장되었음을 표시
        Alert.alert("사진이 갤러리에 저장되었습니다!");
      } catch (error) {
        Alert.alert("사진 저장에 실패했습니다.", error.message);
      }
    }
  };

  const handleNext = () => {
    if (isPhotoSaved) {
      navigation.navigate("Gallery");
    } else {
      Alert.alert(
        "방금 찍은 이미지를 저장하시겠습니까?",
        "",
        [
          {
            text: "저장",
            onPress: async () => {
              await savePicture();
              navigation.navigate("Gallery");
            },
          },
          {
            text: "삭제",
            onPress: () => navigation.navigate("Gallery"),
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <View style={styles.buttonRow}>
            <Button
              style={styles.button}
              title="다시찍기"
              onPress={() => setPhotoUri(null)}
            />
            <Button
              style={styles.button}
              title="이미지 저장"
              onPress={savePicture}
            />
            <Button style={styles.button} title="다음" onPress={handleNext} />
          </View>
        </View>
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          zoom={zoom}
          ref={cameraRef}
          autoFocus={Camera.Constants.AutoFocus.on} // 자동 초점 활성화
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.FlipButtonContainer}
              onPress={toggleCameraType}
            >
              <Image
                source={require("../assets/images/switch.png")}
                style={styles.FlipImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.zoomText}>Zoom: {Math.round(zoom * 100)}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={zoom}
              onValueChange={setZoom}
            />
          </View>
          <TouchableOpacity
            style={styles.shootingButtonContainer}
            onPress={takePicture}
          >
            <Image
              source={require("../assets/images/shooting.png")}
              style={styles.shootingImage}
            />
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
};

export default CameraTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "90%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "yellow",
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
    alignSelf: "flex-end",
  },
  FlipImage: {
    width: 30,
    height: 30,
  },
  FlipButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
  },
  shootingButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
    marginBottom: 20,
  },
  shootingImage: {
    width: 40,
    height: 40,
  },
  sliderContainer: {
    margin: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  zoomText: {
    textAlign: "center",
    fontSize: 18,
  },
});
