import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Inscription from "./components/Inscription.jsx";
import Connexion from "./components/Connexion.jsx";

export default function App() {
  const [page, setPage] = useState("connexion"); // "connexion" ou "inscription"

  return (
    <View style={styles.container}>
      {page === "connexion" && <Connexion onSignup={() => setPage("inscription")} />}
      {page === "inscription" && <Inscription onBack={() => setPage("connexion")} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
