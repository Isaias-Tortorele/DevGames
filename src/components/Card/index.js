import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";

import { navigateToScreen } from "../../Utils/NavigationUtils";
import { toggleFavorite } from "../../Utils/FavoriteUtils";

export default function Card({ data, isFavorite }) {
  const handleDetail = navigateToScreen("Detail", { data });

  async function handleDeleteFavorite() {
    toggleFavorite(data);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetail}>
      <Image
        source={{ uri: data.background_image }}
        style={styles.banner}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <View style={styles.star}>
          <AntDesign name="star" size={20} color="#FF0" />
          <Text style={styles.starText}>{data.metacritic / 10}/10</Text>
        </View>
      </View>

      {isFavorite && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteFavorite}
        >
          <Feather name="trash" size={20} color="#FFF" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 15,
    marginBottom: 6,
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    opacity: 0.4,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  info: {
    bottom: 0,
    padding: 15,
    position: "absolute",
  },
  star: {
    flexDirection: "row",
  },
  starText: {
    color: "#FFF",
    marginLeft: 6,
  },
  deleteButton: {
    width: 50,
    height: 50,
    backgroundColor: "#E72F49",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    top: 10,
  },
});
