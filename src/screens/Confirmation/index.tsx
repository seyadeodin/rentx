import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
// Dimensions: outside react components
// useWindowDimensions: inside react functions, where hooks can be used

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { 
 Container,
 Content,
 Title,
 Message,
 Footer,
} from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation(){
  const { width  } = useWindowDimensions();
  const { params } = useRoute()
  const navigation = useNavigation();

  const { title, message,  nextScreenRoute} = params as Params;

  function handleConfirmRental() {
    navigation.navigate(nextScreenRoute);
  }

  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width}/>

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton 
          onPress={handleConfirmRental}   
          title="OK"
        />
      </Footer>

    </Container>
  )
}