import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: ${RFValue(100)}px;
  height: 92px;

  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_PRIMARY};

  padding: 16px;
  margin-bottom: 8px;
`
export const Name = styled.Text`
  font-size: ${RFValue(13)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${theme.COLORS.TEXT}
  `}
`
