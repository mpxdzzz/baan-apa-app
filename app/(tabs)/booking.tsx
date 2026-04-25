import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('Elephant Reset 2D1N');

  const submitBooking = async () => {
    if (!name || !phone || !date || !guests) {
      Alert.alert('Missing information', 'Please fill all fields');
      return;
    }

    try {
      const response = await fetch(
        'https://baan-apa-app.vercel.app/api/booking',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            date,
            guests,
            selectedPackage,
          }),
        }
      );

      if (!response.ok) {
        Alert.alert('Error', 'Could not send booking to LINE.');
        return;
      }

      Alert.alert('Success', 'Booking sent to LINE Official Account!');
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📅 Booking</Text>
      <Text style={styles.subtitle}>Reserve your Baan APA experience</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#9fbbab"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor="#9fbbab"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Date e.g. 25/04/2026"
        placeholderTextColor="#9fbbab"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of guests"
        placeholderTextColor="#9fbbab"
        value={guests}
        onChangeText={setGuests}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Select Package</Text>

      {[
        'Elephant Reset 2D1N',
        'Family Nature Weekend',
        'Executive Reset Retreat',
      ].map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.packageButton,
            selectedPackage === item && styles.packageSelected,
          ]}
          onPress={() => setSelectedPackage(item)}
        >
          <Text style={styles.packageText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={submitBooking}>
        <Text style={styles.submitText}>Submit Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f2e2e',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1e4a4a',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  packageButton: {
    borderWidth: 1,
    borderColor: '#2e8b57',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  packageSelected: {
    backgroundColor: '#2e8b57',
  },
  packageText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#d4b06a',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
  },
  submitText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0f2e2e',
  },
});