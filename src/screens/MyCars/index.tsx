import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { Car as CarModel } from '../../database/models/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { 
 Container,
 Header,
 Title,
 Subtitle,
 Content,
 Appointments,
 AppointmentsTitle,
 AppointmentsQuantity,
 CarWrapper,
 CarFooter,
 CarFooterTitle,
 CarFooterPeriod,
 CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

interface DataProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

export function MyCars(){
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  //const isfocused = useIsFocused();
  // we can also pass isFocused as a dependency to our useEffect

  const [ cars, setCars ] = useState<DataProps[]>([]);
  const [ loading, setLoading ] = useState(true);

  function handleGoBack() {
    navigation.goBack();
  }

  useFocusEffect(useCallback(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/rentals');

        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          }
        })

        setCars(dataFormatted)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCars();
  }, []))

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

        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        { loading ? <Load/> :
          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => 
              <CarWrapper>
                <Car data={item.car}/>
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={COLORS.TITLE}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            }
          />
        }

      </Content>

    </Container>
  )
}
