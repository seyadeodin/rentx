import React, { ComponentProps, useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { 
  Container,
  IconContainer,
  InputText
} from './styles';

interface InputProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name']
  value?: string;
}


export function Input({
  iconName,
  value,
  ...rest
}: InputProps){
  const { COLORS } = useTheme();

  const [isFocused, setIsFocused] = useState(false)

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  return(
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={!!value ? COLORS.MAIN : COLORS.TEXT_DETAIL}
        />
      </IconContainer>
      <InputText 
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />

    </Container>
  )
}