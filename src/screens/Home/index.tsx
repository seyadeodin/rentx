import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
 CarList
} from './styles';

const carData = [
  {
    brand: 'audi',
    name: 'Mazda',
    rent: {
      period: 'Manhã',
      price: 600,
    },
    thumbnail: 'https://pngimg.com/uploads/audi/audi_PNG99491.png'
  },
  {
    brand: 'volkswagen',
    name: 'Kombi',
    rent: {
      period: 'Manhã',
      price: 759,
    },
    thumbnail: 'https://static.vakinha.com.br/uploads/vakinha/image/373408/kombi.png?ims=700x410'
  }
]

export function Home(){
  const navigation = useNavigation();

  const [ cars, setCars ] = useState([]);
  const [ loading, setLoading ] = useState(true)

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('carDetails', { car });
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
            Total 12 carros
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
    </Container>
 )
}