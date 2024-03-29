import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/core';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

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
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { MarkedDateProps } from '../../components/Calendar';
import api from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  
  const { car, dates } = route.params as Params;
  
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);
  const [ loading, setLoading ] = useState(false);

  const rentTotal = Number(dates.length * car.price)
  
  async function handleConfirmRental() {
    try{
      setLoading(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length-1])), 'dd/MM/yyyy')
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      navigation.navigate('confirmation', {
        nextScreenRouter: 'home',
        title: 'Carro Alugado',
        message: 'Agora você só precisa ir\naté a concessionária da RENTX',
      });

    } catch(e){
      console.log(e)
    } finally {
      setLoading(false);
    }

  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length-1])), 'dd/MM/yyyy')
    })

  }, [])

  return(
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}/>

      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={car.photos} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory =>
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            )
          }
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={COLORS.SHAPE}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora"
          color={COLORS.SUCCESS}
          onPress={handleConfirmRental}   
          enabled={!loading}
          loading={loading}
        />
      </Footer>

    </Container>
  )
}