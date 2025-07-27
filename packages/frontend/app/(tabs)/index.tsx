import React, { useState, useEffect } from 'react';
const axios = require('axios');
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LICENSE_PLATE_KEY = 'licensePlate';

export default function App() {
  const [licensePlate, setLicensePlate] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  
  // On mount, check if license plate exists
  useEffect(() => {
    const loadPlate = async () => {
      const stored = await AsyncStorage.getItem(LICENSE_PLATE_KEY);
      if (stored) setLicensePlate(stored);
      setLoading(false);
    };
    loadPlate();
  }, []);

  const handleSave = async () => {
    if (!input.trim()) return;
    await AsyncStorage.setItem(LICENSE_PLATE_KEY, input.trim());
    setLicensePlate(input.trim());
  };
const handleOpen = async()=>{
const token = await axios.get("https://68905003945b.ngrok-free.app/getToken")
console.log("TOKENI ="+ token.data)
console.log("REKISTERINUMERO = "+licensePlate)
fetch("https://dc.autoparkki.fi/access/c8ac638d-5ed6-4b15-8618-aad16529cfeb/open", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "fi-FI,fi;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "XSRF-TOKEN=eyJpdiI6InY1dWNkKzhOVGR1NDhlRkQreFA0OGc9PSIsInZhbHVlIjoiVmFObTdBTitwQjBuYUg0dlZhVS9PR0kwTUhBWVZWRTExN3VQNFVGL0JsQnZiNHpjQ2tKU2YvYUszVVk0OGJsK0pFd3E5cVN4OUlyYVlac2t1R0MvamNOeHVuVjFLR3B5SU5veWw1Q2JkbEpGSzBlaU5JSVJ2eldOODdiaFU1Rk0iLCJtYWMiOiJmZGNkMjRhNjBjNGRmMzllODA5MmVjZWVhMDI0YzkzZTU4ODJkNDVlMjhkNDRlZTg3YmRiZDFkNzcwZmU1Zjk5IiwidGFnIjoiIn0%3D; europark_finland_adc_session=eyJpdiI6IkVDTCtCMlhVSy9aNHRRSXkyVWRqM2c9PSIsInZhbHVlIjoibnBjWk55di8wN0lKcXhnSDdDb0tqODhsTGV5ODRCVTdEWjN2Ulk4RmZQUlJ0M05QU2lTL1NGRHl0Q0l0ejh3Vk1iVC9TdzNNY0RXWTdKSjZlVUZpbDAxZ1Q0a3d4SkZXZ0NBcGtja2pVSmc5TGh1NFloc3dIY1RKNXVNRXpRRXoiLCJtYWMiOiI5ZTE5NGJmODZiNDYwZWNhMTBjZDViYjY0MzE2YzBlNTE5OWRjMDI3NTZlM2FhMGIxYjc0ZGUyYWEwZGM4ZTRiIiwidGFnIjoiIn0%3D",
    "Referer": "https://dc.autoparkki.fi/access/c8ac638d-5ed6-4b15-8618-aad16529cfeb"
  },
  "body": `_token=${token.data}&vehicleReg=${licensePlate}&door=c8ac638d-5ed6-4b15-8618-aad16529cfeb`,
  "method": "POST"
});
}
  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // License plate input page
  if (!licensePlate) {
    return (
      <KeyboardAvoidingView
        style={styles.centered}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Syötä rekisterinumero</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., ABC-123"
          value={input}
          onChangeText={setInput}
          autoCapitalize="characters"
          autoFocus
        />
        <Button title="Save" onPress={handleSave} disabled={!input.trim()} />
      </KeyboardAvoidingView>
    );
  }

  // Main page with big round button
  return (
    <View style={styles.centered}>
      <TouchableOpacity style={styles.bigButton} onPress={handleOpen}>
        <Text style={styles.buttonText}>Avaa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    width: 220,
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  bigButton: {
    width: 200,
    height: 200,
    backgroundColor: '#3679fe',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  buttonText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
});
