import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Car as CarModel } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps {
  data: CarModel;
}

export function Car({ data, ...rest }: Props){
  const netInfo = useNetInfo();
  const MotorIcon = getAccessoryIcon(data?.fuel_type ? data?.fuel_type : 'electric');

  return(
    <Container {...rest}>
      <Details>
        <Brand>{data?.brand}</Brand>
        <Name>{data?.name}</Name>

        <About>
          <Rent>
            <Period>{data?.period}</Period>
            <Price>
              R$ { netInfo.isConnected ? data?.price : '...' }
            </Price>
          </Rent>

          <Type>
            <MotorIcon/>
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{ uri: data?.thumbnail }} 
        resizeMode='contain'
      />
    </Container>
  )
}
