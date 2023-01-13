import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';
import { useRoute } from '@react-navigation/core';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { DateData } from 'react-native-calendars';

import ArrowSvg from '../../assets/arrow.svg'

import { 
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue,
 Content,
 Footer,
} from './styles';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling(){
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const [ lastSelectedDate, setLastSelectedDate ] = useState<DateData>({} as DateData)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod)

  console.log({car})

  function handleConfirmRental() {
    if(!rentalPeriod.start || !rentalPeriod.end){
      return Alert.alert('Período inválido', 'Selecione um intervalo para alugar')
    }
    navigation.navigate('schedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date: lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    
    const interval = generateInterval(start, end);
    console.log(interval)
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
  }

  return(
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          onPress={handleGoBack}
          color={COLORS.SHAPE}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

        <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>

      <Calendar
        markedDates={markedDates}
        onDayPress={handleChangeDate}
      />

      </Content>

      <Footer>
        <Button 
          title="Confirmar"
          onPress={handleConfirmRental}   
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>

    </Container>
  )
}