import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';

export default function SplashScreen(props) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);

  return (
    <SafeAreaView style={styles.container}>
      {/* Notifications Section */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardTitle}>
                Google Meet with UI Designer on the appwiz - Redcrix
              </Text>
              <Text style={styles.cardSubtitle}>Wanna miss these?</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.timeText}>09:05AM</Text>
              <Switch
                trackColor={{ false: '#d9d9d9', true: '#86E3CE' }}
                thumbColor={isEnabled ? '#4CAF50' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                accessibilityLabel="Toggle Notifications"
              />
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardTitle}>
                Google Meet with UI Designer on the appwiz - Redcrix
              </Text>
              <Text style={styles.cardSubtitle}>Wanna miss these?</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.timeText}>09:05AM</Text>
              <Switch
                trackColor={{ false: '#d9d9d9', true: '#86E3CE' }}
                thumbColor={isEnabled ? '#4CAF50' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                accessibilityLabel="Toggle Notifications"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.header}>Create Plans</Text>
        <Text style={styles.subtext}>
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('NextScreen')} // Replace 'NextScreen' with your desired screen
          accessible={true}
          accessibilityLabel="Navigate to Next Screen"
          accessibilityHint="Tap to proceed to the next screen"
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  card: {
  
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    paddingRight:50,
    marginBottom: 10,
    shadowColor: 'lightgreen',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 0,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bottomSection: {
    alignItems: 'center',
    padding: 60,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 30,
    fontWeight: 800,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#3B4130',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 270, // Improved touch area for the button
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
