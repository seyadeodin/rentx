import React, { ComponentProps, useRef, useState } from 'react';
import { TextInputProps, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { 
  Container,
  IconContainer,
  InputText,
  PasswordVisibilityButton
} from './styles';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: InputProps){
  const { COLORS } = useTheme();
  const inputRef = useRef<TextInput>(null)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handlePasswordVisibility() {
    Keyboard.removeAllListeners('keyboardWillHide')
    //Keyboard.addListener('keyboardWillHide', () => {
      //inputRef.current.focus();
      //console.log('hide')
    //})
    setIsPasswordVisible(state => !state);
  }

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
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />

      <PasswordVisibilityButton
        onPress={handlePasswordVisibility}
      >
        <Feather
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color={COLORS.TEXT_DETAIL}
        />
      </PasswordVisibilityButton>
    </Container>
  )
}