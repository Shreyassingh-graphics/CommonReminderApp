import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

const CreateReminder = ({ route, navigation }) => {
  const { addReminder } = route.params;

  const [repeatDays, setRepeatDays] = useState([]);
  const [title, setTitle] = useState('Reminder'); // Default title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Toggle title editing
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('green'); // Default: Low priority
  const [sound, setSound] = useState('sound1'); // Default: sound1
  const [isModalVisible, setModalVisible] = useState(false); // Control the visibility of the modal
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Control date picker visibility

  const formatDateWithOrdinal = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Function to get ordinal suffix
    const getOrdinal = (num) => {
      const mod10 = num % 10;
      const mod100 = num % 100;
      if (mod10 === 1 && mod100 !== 11) return 'st';
      if (mod10 === 2 && mod100 !== 12) return 'nd';
      if (mod10 === 3 && mod100 !== 13) return 'rd';
      return 'th';
    };
  
    const ordinal = getOrdinal(day);
    return `${day}${ordinal} ${month}, ${year}`;
  };
  

  const toggleDaySelection = (day) => {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter((d) => d !== day)); // Remove day if already selected
    } else {
      setRepeatDays([...repeatDays, day]); // Add day if not selected
    }
  };
  // Handle creating a reminder
  const handleCreate = () => {
    addReminder({
      title,
      description,
      dateTime: date.toISOString(),
      priority,
      sound,
      repeatDays, // Include the selected repeat days
    });
    navigation.goBack();
  };
  const backButton = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          {isEditingTitle ? (
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <Text style={styles.titleText}>{title}</Text>
          )}
          <TouchableOpacity onPress={() => setIsEditingTitle(!isEditingTitle)}>
            <Ionicons name="pencil" size={20} color="black" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date & Time Section */}
   {/* Date & Time Section */}
<Text style={styles.label}>DATE & TIME</Text>
<TouchableOpacity
  style={styles.dateButton}
  onPress={() => setDatePickerVisible(true)}
>
  <Text style={styles.dateButtonText}>{formatDateWithOrdinal(date)}</Text>
</TouchableOpacity>

{isDatePickerVisible && (
  <DateTimePicker
    value={date}
    mode="datetime"
    display="default"
    onChange={(event, selectedDate) => {
      setDatePickerVisible(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    }}
  />
)}


      {/* Sound Selector */}
      <Text style={styles.label}>SOUNDS</Text>
      <TouchableOpacity
        style={styles.soundButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.soundButtonText}> {sound}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Sound</Text>
            <TouchableOpacity
              style={styles.soundOption}
              onPress={() => { setSound('sound1'); setModalVisible(false); }}
            >
              <Text style={styles.soundOptionText}>Sound 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.soundOption}
              onPress={() => { setSound('sound2'); setModalVisible(false); }}
            >
              <Text style={styles.soundOptionText}>Sound 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.soundOption}
              onPress={() => { setSound('sound3'); setModalVisible(false); }}
            >
              <Text style={styles.soundOptionText}>Sound 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.soundOption}
              onPress={() => { setSound('sound4'); setModalVisible(false); }}
            >
              <Text style={styles.soundOptionText}>Sound 4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.soundOption}
              onPress={() => { setSound('sound5'); setModalVisible(false); }}
            >
              <Text style={styles.soundOptionText}>Sound 5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>REPEAT ON</Text>
<View style={styles.weekdayContainer}>
  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.weekdayButton,
        repeatDays.includes(day) ? styles.selectedDay : styles.unselectedDay,
      ]}
      onPress={() => toggleDaySelection(day)}
    >
      <Text
        style={[
          styles.weekdayText,
          repeatDays.includes(day) ? styles.selectedDayText : styles.unselectedDayText,
        ]}
      >
        {day}
      </Text>
    </TouchableOpacity>
  ))}
</View>;

      {/* Priority Section */}
{/* Priority Section */}
<Text style={styles.label}>PRIORITY</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: priority === 'green' ? '#28A745' : '#D4EED1' }]}
          onPress={() => setPriority('#28A745')}
        >
          <Text style={[styles.priorityText, { color: priority === 'green' ? '#FFFFFF' : '#28A745' }]}>LOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: priority === 'yellow' ? '#FFC107' : '#FFF9CC' }]}
          onPress={() => setPriority('#FFC107')}
        >
          <Text style={[styles.priorityText, { color: priority === 'yellow' ? '#FFFFFF' : '#FFC107' }]}>MEDIUM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: priority === 'red' ? '#DC3545' : '#FDD5D5' }]}
          onPress={() => setPriority('#DC3545')}
        >
          <Text style={[styles.priorityText, { color: priority === 'red' ? '#FFFFFF' : '#DC3545' }]}>HIGH</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter reminder description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>CREATE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  editIcon: {
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '550',
    marginTop: 10,
    marginBottom: 8,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 0,
    width: 350,
    height: 100,
    marginBottom: 1,
    fontSize: 16,
    paddingLeft: 6,
    marginLeft: 20,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    marginRight: 30,
  },
  priorityButton: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 68,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: 500,
  },
  soundButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1, // Adds the "platform" line
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingLeft: 16,
  },
  soundButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1, // Adds the "platform" line
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingLeft: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  soundOption: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  soundOptionText: {
    fontSize: 16,
    color: '#333',
  },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#3B4130',
    padding: 18,
    marginRight: 11,
    borderRadius: 48,
    width: 350,
    alignSelf: 'center',
    marginTop: 16,
  },
  
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',  // Ensures the text is centered horizontally
    lineHeight: 20,  // Optionally adjust to vertically center the text
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  weekdayButton: {
    padding:0,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 35,
  },
  selectedDay: {
    backgroundColor: '#3B4130',
    color:'white',
    fontWeight:400,
  },
  unselectedDay: {
    backgroundColor: '#f0f0f0',
    color: '#333'
  },
  weekdayText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 400,
    textAlign: 'center',
  },
  selectedDayText: {
    color: '#fff',
  },
  unselectedDayText: {
    color: '#333',
  }
});

export default CreateReminder;
