import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";

import WebLink from "../../components/LinkWeb";

import { fetchGameDetails } from "../../Utils/ApiUtils";

import { AntDesign } from "@expo/vector-icons";
import ButtonBack from "../../components/Ui/ButtonBack";
import Activity from "../../components/Ui/Activity";
import ModalDescription from "../../components/ModalDescription";

export default function Detail({ route }) {
  const { data } = route.params;
  const [gameDetails, setGameDetails] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [showWeb, setShowWeb] = useState(false);

  useEffect(() => {
    async function loadGameDetails() {
      const response = await fetchGameDetails(data.id);

      setGameDetails(response);
    }

    loadGameDetails();
  }, []);

  function handleLink() {
    setShowWeb(true);
  }

  return (
    <View style={styles.container}>
      {gameDetails ? (
        <>
          <ButtonBack data={data} />
          <Image
            source={{ uri: data?.background_image }}
            style={styles.banner}
            resizeMode="cover"
          />

          {gameDetails.website ? (
            <TouchableOpacity style={styles.link} onPress={handleLink}>
              <AntDesign name="link" size={35} color="#FFF" />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <Modal
            visible={showWeb}
            animationType="fade"
            onRequestClose={handleLink}
          >
            <WebLink handleClose={() => setShowWeb(false)} data={gameDetails} />
          </Modal>

          <ScrollView style={{ paddingBottom: 50 }}>
            <View style={styles.containerInfo}>
              <View style={styles.containerContent}>
                <View style={styles.star}>
                  <AntDesign name="star" size={20} color="#FF0" />
                  <Text style={styles.starText}>
                    {data?.metacritic / 10}/10
                  </Text>
                </View>
                <Text style={styles.title}>{data?.name}</Text>
              </View>

              <View style={styles.containerContent}>
                <Text style={styles.title}>Genres</Text>
                <View style={styles.containerGenres}>
                  <FlatList
                    horizontal={true}
                    data={data?.genres}
                    keyExtractor={(index, id) => id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.genres}>
                        <Text style={styles.textGenres}>{item?.name}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View style={styles.containerContent}>
                <Text style={styles.title}>Description</Text>
                <View>
                  <Text numberOfLines={7} style={styles.text}>
                    {gameDetails?.description_raw}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonReadDescription}
                  onPress={() => setVisibleModal(true)}
                >
                  <Text style={styles.textReadDescription}>
                    Read full description
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.containerContent}>
                <Text style={styles.title}>Platforms</Text>
                <View style={styles.containerGenres}>
                  <FlatList
                    horizontal={true}
                    data={data?.parent_platforms}
                    keyExtractor={(index, id) => id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.platform}>
                        <Text style={styles.textPlatform}>
                          {item?.platform.name}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View style={styles.containerContent}>
                <Text style={styles.title}>Stores</Text>
                <View style={styles.containerGenres}>
                  <FlatList
                    horizontal={true}
                    data={data?.platforms}
                    keyExtractor={(index, id) => id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.platform}>
                        <Text style={styles.textPlatform}>
                          {item?.platform.name}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <Activity />
      )}

      <Modal transparent={false} animationType="slide" visible={visibleModal}>
        <ModalDescription
          backOut={() => setVisibleModal(false)}
          data={gameDetails}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingTop: 15,
    justifyContent: "center",
    // alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 250,
    marginTop: "-3%",
  },
  link: {
    width: 60,
    height: 60,
    backgroundColor: "#FF455F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "5%",
    top: 225,
    zIndex: 99,
  },
  containerInfo: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  containerContent: {
    marginVertical: 14,
  },
  star: {
    flexDirection: "row",
  },
  starText: {
    color: "#FFF",
    marginLeft: 8,
  },
  containerGenres: {
    flexDirection: "row",
  },
  genres: {
    height: 50,
    backgroundColor: "#64748B",
    marginEnd: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  textGenres: {
    color: "#FFF",
    fontSize: 16,
  },
  title: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    color: "#DDD",
  },
  buttonReadDescription: {
    width: "100%",
    height: 40,
    marginTop: 12,
    backgroundColor: "#0E5C88",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textReadDescription: {
    color: "#FFF",
  },
  platform: {
    height: 40,
    backgroundColor: "#0F172A",
    marginEnd: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  textPlatform: {
    color: "#FFF",
  },
});
