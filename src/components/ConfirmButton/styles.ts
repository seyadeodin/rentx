import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 80px;
  height: 56px;

  background-color: ${({theme}) => theme.COLORS.SHAPE_DARK};

  align-items: center;
  justify-content: center;
`
export const Title = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${theme.COLORS.SHAPE};
  `}

`