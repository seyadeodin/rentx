import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { 
  Calendar as CustomCalendar,
  LocaleConfig
 } from 'react-native-calendars';

import { 
 Container
} from './styles';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta,', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map(item => item.toUpperCase()),
  today: 'Hoje',
}

LocaleConfig.defaultLocale = 'pt-br'

export function Calendar(){
  const { COLORS, FONTS }= useTheme();

  return(
    <CustomCalendar
      renderArrow={ direction => 
        <Feather
          size={24}
          color={COLORS.TEXT}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: COLORS.BACKGROUND_SECONDARY,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.TEXT_DETAIL,
        paddingBottom: 10,
        marginBottom: 10,
      }}

      theme={{
        textDayFontFamily: FONTS.PRIMARY_400,
        textDayHeaderFontFamily: FONTS.PRIMARY_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        monthTextColor: COLORS.TITLE,
        textMonthFontFamily: FONTS.SECONDARY_600,
        arrowStyle: {
          marginHorizontal: 15
        }
      }}
      firstDay={1}
      minDate={new Date().toDateString()}
    />
  )
}