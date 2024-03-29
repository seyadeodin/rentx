import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { getContrast } from 'polished';

interface ButtonProps extends RectButtonProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) => color ? color : theme.COLORS.MAIN };
  margin-bottom: 8px;
`

export const Title = styled.Text<ButtonProps>`
  font-size: ${RFValue(15)}px;
  
  ${({ theme, color }) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${getContrast(color, theme.COLORS.SHAPE) < 2 ? theme.COLORS.HEADER : theme.COLORS.SHAPE}
  `}
`