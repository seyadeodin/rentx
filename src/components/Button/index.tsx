import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { 
 Container,
 Title,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: Props){
  const { COLORS } = useTheme();
  console.log({enabled})


  return(
    <Container 
      {...rest} 
      color={color ? color : COLORS.MAIN}
      style={{ opacity: (enabled === false || loading === true ) ? .5 : 1 }}
      enabled={enabled}
    >
      {
        loading ?
        <ActivityIndicator color={COLORS.SHAPE}/> : 
        <Title>{title}</Title>
      }

    </Container>
  )
}