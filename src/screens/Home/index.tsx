import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar, Dimensions, Alert, Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import api from '../../services/api';
import { Car as CarModel } from '../../database/models/Car';
import { database } from '../../database';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

//const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export function Home() {
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const synchronizing = useRef(false);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = event.translationX + ctx.positionX;
  //     positionY.value = event.translationY + ctx.positionY;
  //   },
  //   onEnd(event) {
  //     if (event.absoluteX > screenWidth - 70) {
  //       positionX.value = withSpring(positionX.value - 70);
  //     } else if (event.absoluteX < 0 + 70) {
  //       positionX.value = withSpring(positionX.value + 70);
  //     }
  //     if (event.absoluteY > screenHeight - 70) {
  //       positionY.value = withSpring(positionY.value - 70);
  //     } else if (event.absoluteY < 0 + 70) {
  //       positionY.value = withSpring(positionY.value + 100);
  //     }
  //   },
  // });

  function handleCarDetails(car: CarModel) {
    navigation.navigate('carDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        console.log('pull changes')
        try {
          const response = await api.get(
            `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
          );

          const { changes, latestVersion } = response.data;

          return { changes, timestamp: latestVersion };
        } catch (e) {
          console.log('pull changes', e);
        }
      },
      pushChanges: async ({ changes }) => {
        console.log('pushChanges')
        try {
          const user = changes.users;
          console.log('screen:Home\nfunction: offlineSynchronize.pushChanges\nln106', user)
          if(user){
            const response = await api.post('users/sync', user);
            console.log(response)
          }
        } catch (e) {
          console.log('pushChanges', e);
        }
      },
    });


    await fetchCars();
  }

  async function fetchCars() {
    try {
      const carCollection = database.get<CarModel>('cars');
      const cars = await carCollection.query().fetch();

      setCars(cars);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchCars();
    }

    return () => {
      isMounted = false;
    };
  }, []);


  useFocusEffect(useCallback(() => {
    const syncChanges = async () => {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;

        try {
          await offlineSynchronize();
        }
        catch (err) {
          console.log(err);
        }
        finally {
          synchronizing.current = false;
        }
      }
    }

    syncChanges();
  }, [netInfo.isConnected]));

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} />
          <TotalCars>Total de {cars.length || ' '} carros</TotalCars>
        </HeaderContent>
      </Header>

      {/*<Button title="Sincronizar" onPress={offlineSynchronize} /> */}
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarModel) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      {/* <PanGestureHandler
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
      </PanGestureHandler> */}

    </Container>
  );
}
