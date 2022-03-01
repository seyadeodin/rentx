import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

import { 
 Container,
 Header,
 HeaderContent,
 TotalCars,
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
      
      <Car data={carData[0]}/>
    </Container>
 )
}