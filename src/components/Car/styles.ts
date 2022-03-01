import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 126px;

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_SECONDARY};
  
  flex-direction: row;
  justify-content: space-between;

  padding: 24px;
  margin-bottom: 16px;
`

export const Details = styled.View`

`

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}

  text-transform: uppercase;
`

export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TITLE};
  `}

`
export const About = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 16px;
`
export const Rent = styled.View`
  margin-right: 24px;
`
export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}

  text-transform: uppercase;
`

export const Price = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.MAIN};
  `}
`

export const Type = styled.View``

export const CarImage = styled.Image`
  width: 167px;
  height: 85px;
`