import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import logoImg from "../../assets/logo.png";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setincidents] = useState([]);
  const [total, settotal] = useState(0);

  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  function handleNavigation(incident) {
    navigation.navigate("Details", { incident });
  }
  async function handleIncidentsData() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length == total) {
      return;
    }

    setloading(true);
    const response = await api.get("/incidents", { params: { page } });
    setincidents([...incidents, ...response.data]);
    setpage(page + 1);
    settotal(response.headers["x-total-count"]);

    setloading(false);
  }

  useEffect(() => {
    handleIncidentsData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.imgHeader} />
        <Text style={styles.textHeader}>
          Total de <Text style={styles.textHeaderBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem Vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>
      {console.log(incidents)}
      <FlatList
        style={styles.incidentList}
        data={incidents}
        onEndReached={handleIncidentsData}
        onEndReachedThreshold={0.4}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleNavigation(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
