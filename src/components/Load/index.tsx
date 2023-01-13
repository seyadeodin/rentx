import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';


export function Load(){
  const { COLORS } = useTheme();

  return(
    <ActivityIndicator
      color={COLORS.MAIN}
      size="large"
      style={{ flex: 1}}
    />
  )
}