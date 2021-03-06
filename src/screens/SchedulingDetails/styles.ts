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


export const RentalPeriod = styled.View`
  width: 100%;
  
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 40px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.LINE};
  padding-bottom: 16px;
`

export const CalendarIcon = styled.View`
  width: 48px;
  height: 48px;

  background-color: ${({theme}) => theme.COLORS.MAIN};

  align-items: center;
  justify-content: center;
`

export const DateInfo = styled.View`

`

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}

  text-transform: uppercase;
`

export const DateValue = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${theme.COLORS.TITLE};
  `}
`

export const RentalPrice = styled.View`
  width: 100%;
  margin-top: 16px;
`

export const RentalPriceLabel = styled.Text`
  font-size: ${RFValue(10)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${theme.COLORS.TEXT_DETAIL};
  `}

  text-transform: uppercase;
`

export const RentalPriceDetails = styled.View`
  width: 100%;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

`

export const RentalPriceQuota = styled.Text`
  font-size: ${RFValue(15)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.PRIMARY_500};
    color: ${theme.COLORS.TITLE};
  `}
`

export const RentalPriceTotal = styled.Text`
  font-size: ${RFValue(24)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.SECONDARY_500};
    color: ${theme.COLORS.SUCCESS};
  `}
`

//vermelho: urgencia
//verde: seguran??a

// heristicas de nielsen e de ux
// 1 - visbilidade do status do sistema eg: loading, dar feedback para as a????es
// mensagens de erro/sucessor
// 2 - compatiblidade entre o sistema e o mundo real eg: manater linguagem mais
// pr??xima poss??vel da linguagem do usu??rio 
// 3 - control e liberdade do usu??rio eg: light theme e dark themme
// 4 - consist??ncia e padroniza????o eg: layout da interface uniforme
// 5 - preven????o de erros eg: erros amig??veis
// 6 - reconhecimento em vez de memoriza????o eg: manter ??cones e padr??es
// 7 - efici??ncia e flexbildiade de uso eg: permitir o usu??rio alterar a ordem
// e posi????o das coisas
// 8 - est??tica e design minamlista
// 9 - ajude o usu??rio a saber onde errou eg: mensagens de erro nos campos junto
// de um outline vermelho
// 10 - ajuda e documenta????o eg: ter faqs que auxiliem o usu??rio a usar a aplica????o