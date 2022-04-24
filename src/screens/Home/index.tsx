import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Ionicons} from '@expo/vector-icons';

import  api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import Logo from '../../assets/logo.svg'
import { 
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
 MyCarsButton,
} from './styles';

export function Home(){
  const navigation = useNavigation();

  const [ cars, setCars ] = useState([]);
  const [ loading, setLoading ] = useState(true)

  const { COLORS } = useTheme();

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
            Total {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      
      { loading ? <Load /> :
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
      <MyCarsButton
        onPress={handleOpenMyCars}
      >
        <Ionicons
          name='ios-car-sport'
          size={32}
          color={COLORS.SHAPE}
        />
      </MyCarsButton>
    </Container>
 )
}
