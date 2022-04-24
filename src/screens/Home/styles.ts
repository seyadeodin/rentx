import { FlatListProps } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
  flex: 1;

  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PRIMARY};
`


export const Header = styled.View`
  width: 100%;
  height: 113px;



  background-color: ${({theme}) => theme.COLORS.HEADER};
  justify-content: flex-end;
`

export const HeaderContent = styled.View`
  justify-content: space-between;
  align-items: center;

  flex-direction: row;
  padding: 0 24px 32px;
`

export const TotalCars = styled.Text`

  font-size: ${RFValue(15)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.PRIMARY_400};
    color: ${theme.COLORS.TEXT};
  `}

`

export const CarList = styled(FlatList)
.attrs({
  contentContainerStyle: {
    padding: 24
  },
  sholVerticalSrollIndicator: false,
})`

`  as React.ComponentType as new <DataListProps>() => FlatList<DataListProps>

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;

  border-radius: 30px;

  justify-content:center;
  align-items: center;

  background-color: ${({theme}) => theme.COLORS.MAIN};

  position: absolute;
  bottom: 14px;
  right: 22px;

`