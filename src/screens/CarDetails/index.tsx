import React from 'react';

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
  About,
  Accessories,
  Footer,
} from './styles';
import { Accessory } from '../../components/Accessory';

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

      <About>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Harum eum repellendus voluptatibus labore quos tempore ipsa velit iusto. 
      </About>

      </Content>

      <Footer>
        <Button title="Confirmar"/>
      </Footer>

    </Container>
  )
}