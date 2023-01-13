import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PRIMARY};
`
export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${({ theme }) => theme.COLORS.HEADER};
  
  justify-content: center;
  padding: 25px;

  padding-top: ${getStatusBarHeight() + 30}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(34)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_600};
    color: ${theme.COLORS.SHAPE};
  `}

  margin-top: 24px;
`

export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_400};
    color: ${theme.COLORS.SHAPE};
  `}

  margin-top: 24px;
`

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`

export const Appointments = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`

export const AppointmentsTitle = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.PRIMARY_400};
    color: ${theme.COLORS.TEXT};
  `}
`

export const AppointmentsQuantity = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TITLE};
  `}
`

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`

export const CarFooter = styled.View`
  width: 100%;
  padding: 12px;

  margin-top: -10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_SECONDARY};
`

export const CarFooterTitle = styled.Text`
  font-size: ${RFValue(10)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}
`

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`

export const CarFooterDate = styled.Text`
  font-size: ${RFValue(13)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_600};
    color: ${theme.COLORS.TITLE};
  `}
`