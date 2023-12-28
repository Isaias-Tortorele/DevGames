import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import BackOut from "../../components/BackOut";
import Card from "../../components/Card";

import { loadFavorites } from "../../Utils/FavoriteUtils";

export default function Favorites({ route }) {
  const { headerTitle } = route.params;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const favoritesData = await loadFavorites();
      
      if (favoritesData) {
        setFavorites(favoritesData);
      }
    }

    fetchFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      <BackOut title={headerTitle} />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => <Card data={item} isFavorite={true} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingHorizontal: 15,
  },
});
