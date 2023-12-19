import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';

// Import your components
import Acceuil from '../screens/Acceuil';
import Chat from '../screens/Chat';
import Create from '../screens/Create';
import Search from '../screens/Search';
import Profile from '../screens/profile1';
import Conversations from '../screens/conversations';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#A47E53',
  brown: '#A47E53',
  white: '#ffffff'
};

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  keyboardHidesTabBar: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
};

const Tabs = () => {

  const route = useRoute();
  const { user } = route.params;
  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Acceuil"
        initialParams={{ user: user }}
        component={Acceuil}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ focused }) => (
            <Feather name='home' size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        initialParams={{ user: user }}
        component={Conversations}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons name='chatbox-outline' size={24} color={focused ? COLORS.primary : COLORS.white} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        initialParams={{ user: user }}
        component={Create}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ focused }) => (
            <LinearGradient colors={['black', 'white', '#7492e2']}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                top: -10,
                borderRadius: 15,
                borderColor: "#7492e2",
                borderWidth: 4
              }}
            >
              <Feather name="plus" size={45} color={['white', 'white']}/>
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        initialParams={{ user: user }}
        component={Search}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name='search' size={24} color={focused ? COLORS.white : COLORS.white} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{ user: user }}
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: user.profilepic }}
              style={{ width: 40, height: 27, borderRadius: 50 , borderColor : 'white' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default Tabs;
