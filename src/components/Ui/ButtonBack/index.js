import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import { navigateGoBack } from "../../../utils/NavigationUtils";
import { toggleFavorite, loadFavorites } from "../../../utils/FavoriteUtils";

export default function ButtonBack({ data }) {
  const handleGoBack = navigateGoBack();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      const favorites = await loadFavorites();

      if (favorites) {
        const index = favorites.findIndex((item) => item.id === data.id);
        setIsFavorite(index !== -1);
      }
    }

    fetchFavorites();
  }, []);

  async function handleToggleFavorite() {
    const boolean = await toggleFavorite(data);
    setIsFavorite(boolean);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Feather name="arrow-left" size={35} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleToggleFavorite}>
        {isFavorite ? (
          <Ionicons name="bookmark" size={25} color="#FFF" />
        ) : (
          <Ionicons name="bookmark-outline" size={25} color="#FFF" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    top: 15,
    left: 0,
    right: 0,
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#050B18",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
