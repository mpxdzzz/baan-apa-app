import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Baan APA</Text>
      <Text style={styles.subtitle}>Nature Reset Experience</Text>

      <TouchableOpacity style={styles.button} onPress={() => alert('Booking coming soon')}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f2e2e',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e8b57',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});