import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { loadGenreGames } from "../../utils/ApiUtils";

import Card from "../../components/Card";
import BackOut from "../../components/BackOut";
import Activity from "../../components/Ui/Activity";

export default function Categorys({ route }) {
  const { data } = route.params;

  const [genreGames, setGenreGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenreGames() {
      const games = await loadGenreGames(data.id);

      setGenreGames(games);
      setLoading(false);
    }

    fetchGenreGames();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Activity />
      ) : (
        <>
          <BackOut title={data.name} />
          <FlatList
            data={genreGames}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card data={item} />}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  empty: {
    marginTop: 15,
    alignItems: "center",
  },
  text: {
    color: "#ddd",
    fontSize: 13,
  },
});
