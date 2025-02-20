import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const EditReminder = ({ route, navigation }) => {
  const { updateReminder } = route.params;

  const [title, setTitle] = useState('Reminder'); // Default title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Toggle title editing
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('green'); // Default: Low priority
  const [sound, setSound] = useState('sound1'); // Default: sound1
  const [isModalVisible, setModalVisible] = useState(false); // Control the visibility of the modal
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Control date picker visibility

  // Handle creating a reminder
  const handleCreate = () => {
    updateReminder({
      title,
      description,
      dateTime: date.toISOString(),
      priority,
      sound,
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
      <Text style={styles.label}>Date & Time:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.dateButtonText}>{date.toLocaleString()}</Text>
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
      <Text style={styles.label}>Select Sound:</Text>
      <TouchableOpacity
        style={styles.soundButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.soundButtonText}>Sounds: {sound}</Text>
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
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
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
          </View>
        </View>
      </Modal>

      {/* Priority Section */}
{/* Priority Section */}
<Text style={styles.label}>Priority:</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: priority === 'green' ? '#28A745' : '#D4EED1' }]}
          onPress={() => setPriority('green')}
        >
          <Text style={[styles.priorityText, { color: priority === 'green' ? '#FFFFFF' : '#28A745' }]}>LOW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: priority === 'yellow' ? '#FFC107' : '#FFF9CC' }]}
          onPress={() => setPriority('yellow')}
        >
          <Text style={[styles.priorityText, { color: priority === 'yellow' ? '#FFFFFF' : '#FFC107' }]}>MEDIUM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, { backgroundColor: priority === 'red' ? '#DC3545' : '#FDD5D5' }]}
          onPress={() => setPriority('red')}
        >
          <Text style={[styles.priorityText, { color: priority === 'red' ? '#FFFFFF' : '#DC3545' }]}>HIGH</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter reminder description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>UPDATE</Text>
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
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 16,  // Add padding for better alignment
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    paddingLeft: 16,  // Add padding for better spacing
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  priorityButton: {
    width: 80,
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
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 16,
    paddingLeft: 16,  // Add padding for better spacing
  },
  soundButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 16,
    paddingLeft: 16,  // Add padding for better spacing
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
    marginRight:11,
    borderRadius: 48,
    width: 350,  // Fixed width of 400
    alignSelf: 'center',  // Centers the button horizontally
    marginTop: 16,  // Optional: Add some space from the bottom or other elements
  },
  
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',  // Ensures the text is centered horizontally
    lineHeight: 20,  // Optionally adjust to vertically center the text
  }
});

export default EditReminder;
