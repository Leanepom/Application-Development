import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Inscription() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compte, setCompte] = useState(null);

  const handleSubmit = () => {
    const compteData = { Name: name, Gender: gender, Age: age, Height: height, Weight: weight, Email: email, Password: password };
    setCompte(compteData);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>TITLE</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderGroup}>
            {["Male", "Female", "Other"].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  gender === g && styles.genderButtonSelected,
                ]}
                onPress={() => setGender(g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === g && styles.genderTextSelected,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Age</Text>
          <TextInput
            placeholder=""
            keyboardType="numeric"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            placeholder=""
            keyboardType="numeric"
            style={styles.input}
            value={height}
            onChangeText={setHeight}
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            placeholder=""
            keyboardType="numeric"
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder=""
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder=""
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Create a new account</Text>
          </TouchableOpacity>
        </View>

        {compte && (
          <View style={styles.compte}>
            <Text style={styles.compteTitle}>Compte Created:</Text>
            <Text>Name: {compte.Name}</Text>
            <Text>Gender: {compte.Gender}</Text>
            <Text>Age: {compte.Age}</Text>
            <Text>Height: {compte.Height} cm</Text>
            <Text>Weight: {compte.Weight} kg</Text>
            <Text>Email: {compte.Email}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: { 
    fontSize: 28, 
    color: "#3e6b47", 
    letterSpacing: 1, 
    textTransform: "uppercase", 
    marginBottom: 30, 
    fontWeight: "700" },

  form: { 
    width: "100%", 
    maxWidth: 360 },

  label: { 
    fontSize: 13, 
    color: "#7a7a7a", 
    marginTop: 18, 
    marginBottom: 6, 
    textTransform: "uppercase" },

  input: { 
    backgroundColor: "#f0f0f0", 
    borderRadius: 8, 
    paddingHorizontal: 14, 
    paddingVertical: 12, 
    fontSize: 15, 
    color: "#333" },

  genderGroup: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 6 },

  genderButton: { 
    flex: 1, 
    backgroundColor: "#f0f0f0", 
    borderRadius: 8, 
    paddingVertical: 10, 
    marginHorizontal: 4, 
    alignItems: "center" },

  genderButtonSelected: { backgroundColor: "#3e6b47" },

  genderText: { color: "#555" },

  genderTextSelected: { color: "#fff", fontWeight: "600" },

  button: { 
    marginTop: 28, 
    backgroundColor: "#3e6b47", 
    borderRadius: 8, 
    paddingVertical: 14, 
    alignItems: "center" },

  buttonText: { 
    color: "white", 
    fontWeight: "700", 
    fontSize: 16, 
    textTransform: "uppercase" },

  secondaryButton: { 
    marginTop: 16, 
    alignItems: "center" },

  secondaryText: { 
    color: "#3e6b47", 
    fontWeight: "600", 
    textTransform: "uppercase" },

  compte: { 
    backgroundColor: "#f8f8f8", 
    padding: 18, 
    borderRadius: 10, 
    marginTop: 24, 
    width: "100%", 
    maxWidth: 360 },

  compteTitle: { 
    fontWeight: "700", 
    color: "#3e6b47", 
    marginBottom: 6 },
});
