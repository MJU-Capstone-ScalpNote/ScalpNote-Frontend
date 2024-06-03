import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const GalleryScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets || []);
    }
  };

  useEffect(() => {
    pickImages();
  }, []);

  return (
    <View>
      {selectedImages.length > 0 &&
        selectedImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={{ width: 100, height: 100 }}
          />
        ))}
    </View>
  );
};

export default GalleryScreen;
