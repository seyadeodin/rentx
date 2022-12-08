import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_PRIMARY};
`

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 116}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  ${
    ({ theme} ) => css`
      font-family: ${theme.FONTS.SECONDARY_600};
      color: ${theme.COLORS.TITLE};
    `
  }
`

export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
  ${
    ({ theme} ) => css`
      font-family: ${theme.FONTS.PRIMARY_400};
      color: ${theme.COLORS.TEXT};
    `
  }
`

export const Form = styled.View`
  margin: 64px 0;

`

export const Footer = styled.View``