import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Card from "../../components/Card";
import Activity from "../../components/Ui/Activity";
import CategorysList from "../../components/CategorysList";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { navigateToScreen } from "../../Utils/NavigationUtils";
import { fetchGames, loadGames, loadGenres } from "../../Utils/ApiUtils";

export default function Home() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadGenres(setGenres);
    loadGames(setGames, setLoading);
  }, []);

  async function handleSearch() {
    await fetchGames(search, navigation, setSearch, setLoadingSearch);
  }

  const handleFavorite = navigateToScreen("Favorites", {
    headerTitle: "My favorites",
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <Activity />
      ) : (
        <>
          <View style={styles.containerTitle}>
            <Text style={styles.logoDev}>
              Dev<Text style={styles.logoGames}>Games</Text>
            </Text>
            <TouchableOpacity
              style={styles.shadowBook}
              onPress={handleFavorite}
            >
              <Feather name="bookmark" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.containerSearch}>
            <TextInput
              style={styles.input}
              placeholder="Looking for a game?"
              placeholderTextColor="#FFF"
              value={search}
              onChangeText={(item) => setSearch(item)}
            />
            <TouchableOpacity onPress={handleSearch}>
              {loadingSearch ? (
                <Activity />
              ) : (
                <Feather
                  style={styles.search}
                  name="search"
                  size={35}
                  color="#FF455F"
                />
              )}
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              horizontal={true}
              data={genres}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CategorysList data={item} />}
            />
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.popular}>Popular games</Text>
            <FlatList
              data={games}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Card data={item} />}
            />
          </View>
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
    paddingTop: 15,
    justifyContent: "center",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoDev: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "bold",
  },
  logoGames: {
    color: "#FF455F",
  },
  shadowBook: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#1F2430",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    width: "100%",
  },
  input: {
    width: "85%",
    height: 50,
    padding: 15,
    color: "#FFF",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#1F2430",
  },
  popular: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
