import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { 
  Container,
  Name,
} from './styles';

interface Props {
  name: string;
  icon: React.FC<SvgProps>
}

export function Accessory({
  name,
  icon: Icon //alias
}: Props){
  const { COLORS } = useTheme();

  return(
    <Container>
      <Icon width={32} height={32} fill={COLORS.HEADER}/>
      <Name>{name}</Name>
    </Container>
  )
}
