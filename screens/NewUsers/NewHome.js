import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Menu } from 'react-native-paper'; // Menu for three-dot button

const NewHome = () => {
  const [reminders, setReminders] = useState([]);
  const [soundObject, setSoundObject] = useState(null); // To manage the alarm sound object
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false); // Track if the alarm is playing
  const [isSelectionMode, setIsSelectionMode] = useState(false); // Track selection mode
  const [selectedReminders, setSelectedReminders] = useState([]); // Track selected reminders
  const [menuVisible, setMenuVisible] = useState(false); // Track menu visibility
  const navigation = useNavigation();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Function to get the sound file based on the selected sound
  const getSoundFile = (sound) => {
    switch (sound) {
      case 'sound1':
        return require('../assets/sound1.mp3');
      case 'sound2':
        return require('../assets/sound2.mp3');
      case 'sound3':
        return require('../assets/sound3.mp3');
      case 'sound4':
        return require('../assets/sound4.mp3');
      case 'sound5':
        return require('../assets/sound5.mp3');
      default:
        return require('../assets/sound1.mp3');
    }
  };

// Function to play alarm sound (with looping)
// Function to play alarm sound (with looping)
const playAlarm = async (reminder) => {
  try {
    const soundFile = getSoundFile(reminder.sound);
    const { sound: newSoundObject } = await Audio.Sound.createAsync(soundFile);
    setSoundObject(newSoundObject); // Save sound object for later control
    setIsAlarmPlaying(true); // Mark alarm as playing
    await newSoundObject.setIsLoopingAsync(true); // Enable looping
    await newSoundObject.playAsync();

    // Show alert with Stop Alarm button
    Alert.alert(
      `${reminder.title}`, // Reminder title
      reminder.description, // Reminder description
      [
        {
          text: "Stop Alarm",
          onPress: () => stopAlarm(newSoundObject), // Pass sound object to stopAlarm
        },
      ],
      { cancelable: false } // Prevent closing without pressing Stop
    );
  } catch (error) {
    console.error("Error playing alarm:", error);
  }
};

// Function to stop alarm sound
const stopAlarm = async (soundToStop) => {
  try {
    if (soundToStop) {
      await soundToStop.stopAsync(); // Stop the alarm
      await soundToStop.unloadAsync(); // Unload the sound from memory
    }
    setSoundObject(null); // Reset state
    setIsAlarmPlaying(false); // Mark alarm as stopped
  } catch (error) {
    console.error("Error stopping alarm:", error);
  }
};


// Check for reminders that need to trigger
const checkReminder = () => {
  const now = new Date();
  reminders.forEach((reminder) => {
    if (!reminder.triggered && now >= new Date(reminder.dateTime)) {
      playAlarm(reminder); // Play the sound associated with this reminder
      reminder.triggered = true; // Mark as triggered
      setReminders([...reminders]); // Update state
    }
  });
};


  useEffect(() => {
    const interval = setInterval(checkReminder, 1000); // Check reminders every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [reminders]);

  // Add a new reminder
  const addReminder = (newReminder) => {
    setReminders([...reminders, { ...newReminder, triggered: false }]);
  };

  // Navigate to CreateReminder screen
  const handleAddReminder = () => {
    navigation.navigate('CreateReminder', { addReminder });
  };

  // Navigate to EditReminder screen
  const handleEditReminder = (reminder) => {
    navigation.navigate('EditReminder', { reminder, updateReminder });
  };

  // Update the reminder
  const updateReminder = (updatedReminder) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    );
    setReminders(updatedReminders);
  };

  // Delete selected reminders
  const deleteSelectedReminders = () => {
    const updatedReminders = reminders.filter(
      (_, index) => !selectedReminders.includes(index)
    );
    setReminders(updatedReminders);
    setSelectedReminders([]);
    setIsSelectionMode(false);
  };

  // Toggle selection mode
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedReminders([]); // Clear selected reminders when toggling
  };

  // Toggle reminder's black & white effect (ON/OFF)
  const toggleReminderEffect = (index) => {
    const updatedReminders = reminders.map((reminder, idx) =>
      idx === index ? { ...reminder, isBlackAndWhite: !reminder.isBlackAndWhite } : reminder
    );
    setReminders(updatedReminders);
  };

  // Render a reminder card with toggle icon functionality
  const renderReminder = ({ item, index }) => (
    <View
      style={[
        styles.reminderCard,
        {
          borderLeftColor: item.priority,
          backgroundColor: item.isBlackAndWhite ? '#f0f0f0' : '#f9f9f9', // Black & White effect
          opacity: item.isBlackAndWhite ? 0.3 : 1, // Fade effect
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => handleEditReminder(item)} // Edit the reminder on click
        style={styles.cardContent}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>Reminder Time: {new Date(item.dateTime).toLocaleString()}</Text>
      </TouchableOpacity>

      {/* Toggle Button */}
      <TouchableOpacity
        onPress={() => toggleReminderEffect(index)}
        style={styles.toggleIcon}
      >
        <Image
          source={
            item.isBlackAndWhite
              ? require('../assets/toggle-off.png') // Change image when ON
              : require('../assets/toggle-on.png') // Change image when OFF
          }
          style={styles.toggleImage}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/menu.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerDate}>{currentDate}</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Image source={require('../assets/search.png')} style={styles.headerIcon} />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={toggleSelectionMode}
            title={isSelectionMode ? 'Cancel Selection' : 'Select Reminders'}
          />
          {isSelectionMode && <Menu.Item onPress={deleteSelectedReminders} title="Delete Selected" />}
        </Menu>
      </View>
  
      {/* Reminder List */}
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderReminder}
        ListEmptyComponent={<Text style={styles.emptyText}>No reminders yet</Text>}
      />
  
      {/* Add Reminder Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f',
    borderBottomWidth: 10,
    borderBottomColor: '#fff',
  },
  headerIcon: {
    width: 26,
    height: 26,
    backgroundColor:"#f5",
    resizeMode: 'contain',
  },
  headerDate: {
    fontSize: 18,
    fontWeight: 500,
    color: '#333',
  },
  reminderCard: {
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: 8,
    borderLeftWidth: 3,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  cardContent: {
    paddingRight: 40, // Make space for the toggle icon
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#3B4130',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#aaa',
    fontSize: 16,
  },
  stopButton: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  toggleImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default NewHome;
