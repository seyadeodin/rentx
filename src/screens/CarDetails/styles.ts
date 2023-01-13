import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_SECONDARY};
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center',
  },
  showsVeticalScrollIndicator: false,
})`
`

export const Details = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Description = styled.View`
`
export const Brand = styled.Text` 
  font-size: ${RFValue(10)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}

  text-transform: uppercase;
`

export const Name = styled.Text`
  font-size: ${RFValue(25)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TITLE};
  `}
`
export const Rent = styled.View`
`

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}

  text-transform: uppercase;
`

export const Price = styled.Text`
  font-size: ${RFValue(25)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.MAIN};
  `}
`

export const About = styled.Text`
  width: 100%;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.PRIMARY_400};
    color: ${theme.COLORS.TEXT}
  `}

  text-align: justify;
  margin-top: 23px;
`

export const Accessories = styled.View`
  width: 100%;

  flex-direction:row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`

export const Footer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_SECONDARY};

  /* em cima, dos lados, embaixo */
  padding: 24px 24px ${getBottomSpace() + 24}px;
`

export const OfflineInfo = styled.Text`
  font-size: ${RFValue(10)}px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.PRIMARY_400};
    color: ${theme.COLORS.MAIN};
  `}

`
