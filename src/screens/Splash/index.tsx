import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { 
 Container
} from './styles';

export function Splash(){
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        //animation inteval in this case 0 to  50
        [0, 50],
        [1, 0],
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        //animation inteval in this case 0 to  50
        [0, 25, 50],
        [0, .3, 1],
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],  
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  })

  async function startApp(){
    navigation.navigate('signIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, {
      duration: 1000
    },
    () => {
      'worklet'
      runOnJS(startApp)();
    }
    )
  }, [])

  return(
    <Container>
      <Animated.View style={brandStyle}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute'}]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>

    </Container>
  )
}