import AsyncStorage from "@react-native-async-storage/async-storage";

export async function toggleFavorite(data) {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    // Converte os favoritos para um array (ou cria um array vazio se não houver favoritos)
    let favoritesArray = favorites ? JSON.parse(favorites) : [];
    // Procura o índice do item nos favoritos usando seu ID
    const index = favoritesArray.findIndex((item) => item.id === data.id);
    // Se o item não estiver nos favoritos
    if (index === -1) {
      favoritesArray.push(data);
    } else {
      // Remove o item do array de favoritos
      favoritesArray = favoritesArray.filter((item) => item.id !== data.id);
    }
    // Atualiza os favoritos
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
    // Retorna true se o item foi adicionado aos favoritos, caso contrário, retorna false
    return index === -1;
  } catch (error) {
    console.error("Error toggling favorites:", error);
  }
}

export async function loadFavorites() {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : null;
  } catch (error) {
    console.error("Error loading favorites:", error);
  }
}
