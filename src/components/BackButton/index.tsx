import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components'

import { 
 Container
} from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props){
  const  { COLORS }= useTheme();

  return(
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : COLORS.TEXT}
      />

    </Container>

  )
}