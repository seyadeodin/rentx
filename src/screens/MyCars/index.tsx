import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

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

export function MyCars(){
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  const [ cars, setCars ] = useState<CarProps[]>([]);
  const [ loading, setLoading ] = useState(true);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/schedules_byuser?user_id=1');
        console.log('success', response.data);
        setCars(response.data.reverse())
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCars();
  }, [])

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
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={COLORS.TITLE}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
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