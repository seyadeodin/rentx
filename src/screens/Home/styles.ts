import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PRIMARY};
`


export const Header = styled.View`
  width: 100%;
  height: 113px;



  background-color: ${({theme}) => theme.COLORS.HEADER};
  justify-content: flex-end;
`

export const HeaderContent = styled.View`
  justify-content: space-between;
  align-items: center;

  flex-direction: row;
  padding: 0 24px 32px;
`

export const TotalCars = styled.Text`

  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.PRIMARY_400};
    color: ${theme.COLORS.TEXT};
  `}

`