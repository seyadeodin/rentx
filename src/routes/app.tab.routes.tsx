import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';

import HomeIcon from '../assets/home.svg'
import CarIcon from '../assets/car.svg'
import PersonIcon from '../assets/person.svg'

import { useTheme } from 'styled-components';
import { Platform } from 'react-native';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
  const { COLORS } = useTheme();

  return(
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.MAIN,
        tabBarInactiveTintColor: COLORS.TEXT_DETAIL,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20: 0,
          height: 78,
          backgroundColor: COLORS.BACKGROUND_PRIMARY,
        },
        headerShown: false,
      }}
    >
      <Screen
        name="homeStack" 
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color}/>
          )
        }}
      />
      <Screen
        name="myCars" 
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarIcon width={24} height={24} fill={color}/>
          )
        }}
      />
      <Screen
        name="profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PersonIcon width={24} height={24} fill={color}/>
          )
        }}
      />
    </Navigator>

  )
}
