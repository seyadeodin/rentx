import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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

export function Scheduling(){
  const [ lastSelectedDate, setLastSelectedDate ] = useState<DateData>({} as DateData)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('schedulingDetails');
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
            <DateValue selected={false}></DateValue>
          </DateInfo>

        <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected>18/06/2021</DateValue>
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
        />
      </Footer>

    </Container>
  )
}