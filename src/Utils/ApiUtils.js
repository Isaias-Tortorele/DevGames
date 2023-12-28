import api from "../services/api";

export async function fetchGameDetails(name) {
  try {
    const response = await api.get(`/games/${name}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching game details: ", error);
    return true;
  }
}

export async function fetchGames(
  search,
  navigation,
  setSearch,
  setLoadingSearch
) {
  try {
    if (search !== "") {
      setLoadingSearch(true);
      
      const response = await api.get(`/games?search=${search}`);
      const searchResults = response.data.results;

      navigation.navigate("Search", {
        headerTitle: "Search",
        searchResults,
      });

      setSearch("");
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  } finally {
    setLoadingSearch(false);
  }
}

export async function loadGenreGames(genreId) {
  try {
    const response = await api.get(`/games?genres=${genreId}`);
    return response.data.results;
  } catch (error) {
    console.log("Error fetching genre games: ", error);
    return [];
  }
}

export async function loadGames(setGames, setLoading) {
  try {
    const response = await api.get("/games?page_size=5");
    setGames(response.data.results);
    setLoading(false);
  } catch (error) {
    console.log("Error loading games: ", error);
  }
}

export async function loadGenres(setGenres) {
  try {
    const response = await api.get("/genres");
    setGenres(response.data.results);
  } catch (error) {
    console.log("Error loading genres: ", error);
  }
}
