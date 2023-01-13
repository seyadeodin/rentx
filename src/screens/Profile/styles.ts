import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PRIMARY};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;

  background-color: ${({ theme }) => theme.COLORS.HEADER};

  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.SECONDARY_600};
    color: ${theme.COLORS.BACKGROUND_SECONDARY};
  `}
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 999px;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-top: 48px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 999px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.MAIN};
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

interface OptionProps {
  active: boolean;
}

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.LINE};

  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${theme.COLORS.MAIN_LIGHT};
    `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  ${({ theme, active }) => css`
    font-family: ${active ? theme.FONTS.SECONDARY_600 : theme.FONTS.SECONDARY_500};
    color: ${active ? theme.COLORS.HEADER : theme.COLORS.TEXT_DETAIL};
  `}
`;

export const Section = styled.View`

`
