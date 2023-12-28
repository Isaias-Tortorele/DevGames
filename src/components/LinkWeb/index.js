import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Feather } from "@expo/vector-icons";

export default function WebLink({ handleClose, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={handleClose} style={styles.button}>
          <Feather name="arrow-left" size={40} color={"#0e5c88"} />
        </TouchableOpacity>
      </View>

      <WebView style={styles.contentView} source={{ uri: data.website }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  
  containerButton: {
    zIndex: 99,
    bottom: "5%",
    right: "8%",
    position: "absolute",
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
