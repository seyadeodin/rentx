import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { 
  Container,
  Header,
  CarImages,
} from './styles';

const images = ['https://pngimg.com/uploads/audi/audi_PNG99491.png']

export function CarDetails(){
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
    </Container>
  )
}