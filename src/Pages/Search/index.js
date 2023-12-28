import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import BackOut from "../../components/BackOut";
import Card from "../../components/Card";

export default function Search({ route }) {
  const { headerTitle, searchResults } = route.params;

  return (
    <View style={styles.container}>
      <BackOut title={headerTitle} />
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card data={item} />}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.text}>
            Não encontramos um jogo com esse nome...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingHorizontal: 15,
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
