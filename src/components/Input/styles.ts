import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  margin-bottom: 8px;
  border-bottom-width: 2px;
  border-bottom-color: transparent;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-color: ${theme.COLORS.MAIN};
  `}
`

export const IconContainer = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.BACKGROUND_SECONDARY};
  `}
`

export const InputText = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(15)}px;
  ${({ theme }) => css`
    background-color: ${theme.COLORS.BACKGROUND_SECONDARY};
    color: ${theme.COLORS.TEXT};
    font-family: ${theme.FONTS.PRIMARY_400}
  `}

  padding: 0 23px;
`;