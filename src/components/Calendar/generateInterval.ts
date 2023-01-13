import { DateData } from 'react-native-calendars'
import { eachDayOfInterval, format, parseISO } from 'date-fns'

import { getPlatformDate } from '../../utils/getPlatformDate'
import { MarkedDateProps } from '.'
import  theme from '../../styles/theme'

export function generateInterval(start: DateData, end: DateData){
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start:  parseISO(start.dateString), 
    end: parseISO(end.dateString)
  })
  .forEach(item => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd')

    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date
        ? theme.COLORS.MAIN : theme.COLORS.MAIN_LIGHT,
        textColor: start.dateString === date || end.dateString === date
        ? theme.COLORS.MAIN_LIGHT : theme.COLORS.MAIN,
      }
    }
  });

  return interval;
};