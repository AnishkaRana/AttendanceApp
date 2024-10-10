import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';

const CognotaServices = () => {
  const [location, setLocation] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const OFFICE_LATITUDE = 34.328590; // Replace with your office latitude
  const OFFICE_LONGITUDE = -119.291191; // Replace with your office longitude
  const OFFICE_RADIUS = 0.05; // Radius in KM

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const response = await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
    if (response === 'granted') {
      getLocation();
    } else {
      Alert.alert('Location permission denied');
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error);
        Alert.alert('Unable to fetch location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in KM
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const markAttendance = () => {
    if (location) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        OFFICE_LATITUDE,
        OFFICE_LONGITUDE
      );
      if (distance <= OFFICE_RADIUS) {
        setAttendanceMarked(true);
        Alert.alert('Attendance marked successfully!');
      } else {
        Alert.alert('You are not at the office location.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance System</Text>
      <Button title="Mark Attendance" onPress={markAttendance} disabled={attendanceMarked} />
      {attendanceMarked && <Text style={styles.success}>Attendance marked!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  success: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
  },
});

export default CognotaServices;
