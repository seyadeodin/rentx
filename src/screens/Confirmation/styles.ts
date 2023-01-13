import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme}) => theme.COLORS.HEADER};

  padding-top: 96px;
`
export const  Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

`

export const  Title = styled.Text`
  font-size: ${RFValue(30)}px;

  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.SECONDARY_600};
  `}

  padding-top: 40px;
`

export const  Message = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    color: ${theme.COLORS.TEXT_DETAIL};
    font-family: ${theme.FONTS.PRIMARY_400};
  `}

  text-align: center;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`

export const Footer = styled.View`
  width: 100%;
  padding-top: 80px;
  align-items: center;
  margin: 40px 0;
`