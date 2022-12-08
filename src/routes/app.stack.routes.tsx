import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep/index;';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep/index;';


export function AppStackRoutes(){

  return(
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="home" 
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="carDetails" 
        component={CarDetails}
      />
      <Screen
        name="scheduling" 
        component={Scheduling}
      />
      <Screen
        name="schedulingDetails" 
        component={SchedulingDetails}
      />
      <Screen
        name="confirmation" 
        component={Confirmation}
      />
      <Screen
        name="myCars" 
        component={MyCars}
      />
    </Navigator>

  )
}