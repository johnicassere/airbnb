import { Day } from 'src/reservation/enum/day.enum';

export function getWeakDay(day: number) {
  if (day == 1) {
    return Day.SEGUNDA;
  } else if (day == 2) {
    return Day.TERÇA;
  } else if (day == 3) {
    return Day.QUARTA;
  } else if (day == 4) {
    return Day.QUINTA;
  } else if (day == 5) {
    return Day.SEXTA;
  } else if (day == 6) {
    return Day.SABADO;
  } else if (day == 0) {
    return Day.DOMINGO;
  }
}
