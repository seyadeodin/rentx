import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import api from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as CarModel } from '../../database/models/Car'
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';

import { 
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo
} from './styles';

interface Params {
  car: CarModel;
}

export function CarDetails(){
  const navigation = useNavigation();
  const route = useRoute();
  const { COLORS } = useTheme();
  const netInfo = useNetInfo();

  const { car } = route.params as Params;

  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event =>{
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return{
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0]
      )
    }
  })

  function handleConfirmRental() {
    navigation.navigate('scheduling', {car: car});
  }

  function handleGoBack(){
    navigation.goBack();
  }

  async function fetchUpdatedCar() {
    try{
      const response = await api.get(`/cars/${car.id}`)
      setUpdatedCar(response.data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log('connexão', netInfo.isConnected)
    if(netInfo.isConnected){
      fetchUpdatedCar();
    }

  }, [netInfo.isConnected])

  return(
    <Container>
      <StatusBar
        style='dark'
        backgroundColor='transparent'
        translucent
      />
      <Animated.View
        style={[headerStyleAnimation, styles.header, { backgroundColor: COLORS.BACKGROUND_SECONDARY}]}
      >
        <Header>
          <BackButton onPress={handleGoBack}/>
        </Header>

        <Animated.View
          style={sliderCarsStyleAnimation} 
        >
          <CarImages>
            <ImageSlider
              imagesUrl={updatedCar?.photos || [{id: car.thumbnail, photo:car.thumbnail}]} 
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle = {{
          padding: 24,
          alignItems: 'center',
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        //1000/60
        // number of frames on the scroll setting it at 60fps
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              R$
              {
                netInfo.isConnected ? car.price : '...'
              }
            </Price>
          </Rent>
        </Details>

        {
          updatedCar?.accessories && (
            <Accessories>
              {
                updatedCar?.accessories?.map(accessory =>
                  <Accessory
                    key={accessory.type}
                    name={accessory.name}
                    icon={getAccessoryIcon(accessory.type)}
                  />
                )
              }
            </Accessories>

          )
        }

      <About>
        {car.about}
      </About>

      </Animated.ScrollView>

      <Footer>
        <Button 
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {
          !netInfo.isConnected &&
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu aluguel.
          </OfflineInfo>

        }
      </Footer>

    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})
