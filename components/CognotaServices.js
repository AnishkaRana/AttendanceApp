import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CognotaServices = () => {
  return (
    <View style={styles.container}>
      <Image source={} style={styles.logo} />
      <Text style={styles.mainText}>COGNOTA</Text>
      <Text style={styles.subText}>SERVICES</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066b2',
  },
  subText: {
    fontSize: 20,
    color: '#0066b2',
  },
});

export default CognotaServices;
