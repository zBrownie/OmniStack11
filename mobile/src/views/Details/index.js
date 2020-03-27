import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import logoImg from "../../assets/logo.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const message = `Busco informações para ajuda no caso ${incident.title}, ${incident.description} com valor de R$ ${incident.value}`;
  function handleNavigation() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    )
      .then(data => {
        console.log("Whatsapp open!");
      })
      .catch(() => {
        console.log("ERRO ENVIAR MENSSAGEM");
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={handleNavigation}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>
        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>
        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={sendWhatsapp}
            style={styles.contactButtons}
          >
            <Text style={styles.buttonText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendEmail} style={styles.contactButtons}>
            <Text style={styles.buttonText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
