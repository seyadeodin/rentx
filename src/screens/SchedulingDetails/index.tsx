import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg'
import AccelerateSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,

} from './styles';
import { Accessory } from '../../components/Accessory';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/core';

const images = ['https://pngimg.com/uploads/audi/audi_PNG99491.png']

export function SchedulingDetails(){
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('schedulingComplete');
  }


  return(
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>

      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={images} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 500</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg}/>
          <Accessory name="3.2s" icon={AccelerateSvg}/>
          <Accessory name="800 HP" icon={ForceSvg}/>
          <Accessory name="Gasolina" icon={GasolineSvg}/>
          <Accessory name="Auto" icon={ExchangeSvg}/>
          <Accessory name="2 pessoas" icon={PeopleSvg}/>
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={COLORS.SHAPE}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={COLORS.SHAPE}
          />

          <DateInfo>
            <DateTitle>PARA</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora"
          color={COLORS.SUCCESS}
          onPress={handleConfirmRental}   
        />
      </Footer>

    </Container>
  )
}