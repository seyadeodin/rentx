import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar, StyleSheet, Dimensions, BackHandler} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Ionicons} from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

import  api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg'
import { 
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
 MyCarsButton,
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export function Home(){
  const navigation = useNavigation();
  const { COLORS } = useTheme();

  const [ cars, setCars ] = useState([]);
  const [ loading, setLoading ] = useState(true)

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return{
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx:any){
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;

    },
    onEnd(event){
      if(event.absoluteX > screenWidth - 70){
        positionX.value = withSpring(positionX.value-70);
      } else if(event.absoluteX < 0 + 70){
        positionX.value = withSpring(positionX.value+70);
      }
      if(event.absoluteY > screenHeight - 70){
        positionY.value = withSpring(positionY.value-70);
      }else if(event.absoluteY < 0 + 70 ){
        positionY.value = withSpring(positionY.value + 100);
      }
    }

  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('carDetails', { car });
  }

  function handleOpenMyCars(){
    navigation.navigate('myCars');
  }

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (e){
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, [])

  return(
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
          />
          <TotalCars>
            Total de {cars.length || ' '} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      
      { loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={(item: CarDTO) => item.name}
          renderItem={({item}) =>  
            <Car 
              data={item}
              onPress={() => handleCarDetails(item)}
            /> 
          }
        />

      }

      <PanGestureHandler
        onGestureEvent={onGestureEvent} 
      >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name='ios-car-sport'
              size={32}
              color={COLORS.SHAPE}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>

    </Container>
 )
}