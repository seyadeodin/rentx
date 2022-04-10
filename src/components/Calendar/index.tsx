import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { ptBR } from './localeConfig';

import { 
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps,
 } from 'react-native-calendars';

 import { generateInterval } from './generateInterval';

interface MarkedDateProps{
  [date:string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

function Calendar({ markedDates, onDayPress }: CalendarProps){
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
      markyingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  )
}

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval,
}