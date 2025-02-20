import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function NewSplash3({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Main Image */}
      <Image
        fadeDuration={1000}
        source={require('../assets/image3.png')} // Update the path if needed
        style={styles.mainImage}
        accessibilityLabel="Main splash image"
      />

      {/* Decorative Frame */}
      <Image
        fadeDuration={1000}
        source={require('../assets/Frame97-3.png')} // Update the path if needed
        style={styles.frameImage}
        accessibilityLabel="Decorative frame"
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.header}>Don't miss the special days</Text>
        <Text style={styles.subtext}>
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewHome')} // Replace 'NextScreen' with your desired screen
          accessible={true}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainImage: {
    width: 403,
    height: 403,
    marginTop: 45,
  },
  frameImage: {
    width: 112,
    height: 8,
    marginTop: 20,
    marginLeft: 38,
  },
  bottomSection: {
    marginTop: 'auto', // Pushes the section to the bottom
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal:40,
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
    minWidth: 270,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
