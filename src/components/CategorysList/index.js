import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { navigateToScreen } from "../../Utils/NavigationUtils";

export default function CategorysList({ data }) {
  const handleCategorys = navigateToScreen("Categorys", { data });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCategorys}>
        <Text style={styles.textButton}>{data.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: "#64748B",
    marginEnd: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
  },
});
