import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_SECONDARY};
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

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.TEXT};
  `}
`

export const DateValue = styled.Text<DateValueProps>`
  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.SHAPE};
  `}


  ${({ theme, selected }) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.COLORS.TEXT};
  `}
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showVerticalScrollIndicator: false
})`


`;

export const Footer = styled.View`
  padding: 24px;
`