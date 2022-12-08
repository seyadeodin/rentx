import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({theme}) => theme.COLORS.BACKGROUND_PRIMARY};
`

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
`

export const Steps = styled.View`
  flex-direction: row;
  align-self: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  ${
    ({ theme} ) => css`
      font-family: ${theme.FONTS.SECONDARY_600};
      color: ${theme.COLORS.TITLE};
    `
  }

  margin-top: 60px;
`

export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  ${
    ({ theme} ) => css`
      font-family: ${theme.FONTS.PRIMARY_400};
      color: ${theme.COLORS.TEXT};
      `
  }

  margin-top: 16px;
`

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`

export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  ${
    ({ theme} ) => css`
      font-family: ${theme.FONTS.SECONDARY_600};
      color: ${theme.COLORS.TITLE};
    `
  }

  margin-bottom: 24px;
`