import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewSplash from '../screens/NewUsers/NewSplash';
import NewSplash2 from '../screens/NewUsers/NewSplash2';
import NewSplash3 from '../screens/NewUsers/NewSplash3';
import NewHome from '../screens/NewUsers/NewHome';
import CreateReminder from '../screens/CreateReminder';
import EditReminder from '../screens/NewUsers/EditReminder';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="NewSplash"
        screenOptions={{
          headerStyle: { backgroundColor: '#3B4130' }, // Example header styling
          headerTintColor: '#fff',                    // White header text/icons
        }}
      >
        {/* Initial Splash Screens */}
        <Stack.Screen 
          name="NewSplash" 
          component={NewSplash} 
          options={{ headerShown: false }} // Fullscreen splash
        />
        <Stack.Screen 
          name="NewSplash2" 
          component={NewSplash2} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="NewSplash3" 
          component={NewSplash3} 
          options={{ headerShown: false }} 
        />

        {/* Main Application Screens */}
        <Stack.Screen 
          name="NewHome" 
          component={NewHome} 
          options={{ headerShown: false }} // Set title for Home
        />
        <Stack.Screen 
          name="CreateReminder" 
          component={CreateReminder} 
          options={{ headerShown: false }} // Set title for Create Reminder
        />
        <Stack.Screen 
          name="EditReminder" 
          component={EditReminder} 
          options={{ headerShown: false }} // Set title for Create Reminder
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
