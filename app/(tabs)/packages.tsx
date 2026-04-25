import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PackagesScreen() {
  const router = useRouter();

  const packages = [
    {
      name: 'Elephant Reset 2D1N',
      icon: '🐘',
      desc: 'Reconnect with nature & gentle giants',
    },
    {
      name: 'Family Nature Weekend',
      icon: '🌿',
      desc: 'Perfect escape for family bonding',
    },
    {
      name: 'Executive Reset Retreat',
      icon: '🧘',
      desc: 'Recharge your mind & performance',
    },
  ];

  const handleSelect = (pkg: string) => {
    router.push({
      pathname: '/booking',
      params: { package: pkg },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📦 Packages</Text>
      <Text style={styles.subtitle}>Choose your experience</Text>

      {packages.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handleSelect(item.name)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#173f3f',
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2e8b57',
  },

  icon: {
    fontSize: 30,
    marginRight: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  cardDesc: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },

  arrow: {
    fontSize: 20,
    color: '#2e8b57',
  },
});