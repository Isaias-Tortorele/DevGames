import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { navigateGoBack } from "../../utils/NavigationUtils";

export default function BackOut({ title }) {
  const handleGoBack = navigateGoBack();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Feather name="arrow-left" size={50} color={"#FFF"} />
      </TouchableOpacity>
      <Text style={[styles.title, { marginLeft: 30 }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
  },
});
