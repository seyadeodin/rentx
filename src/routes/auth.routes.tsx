import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep/index;';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep/index;';


export function AuthRoutes(){

  return(
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash"
    >
      <Screen
        name= "splash"
        component= {Splash}
      />
      <Screen
        name= "signIn"
        component= {SignIn}
      />
      <Screen
        name= "signUpFirstStep"
        component= {SignUpFirstStep}
      />
      <Screen
        name= "signUpSecondStep"
        component= {SignUpSecondStep}
      />
      <Screen
        name="confirmation" 
        component={Confirmation}
      />
    </Navigator>

  )
}
