import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function ModalDescription({ backOut, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={backOut} style={styles.button}>
          <Feather name="arrow-left" size={40} color={"#FFF"} />
        </TouchableOpacity>
        <Text style={[styles.title, { marginLeft: 30 }]}>Description</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={styles.text}>{data?.description_raw}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: "#0F172A",
  },
  containerButton: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#050B18",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#FFf",
    paddingBottom: "50%",
  },
  scrollView: {
    marginTop: 20,
  },
});
