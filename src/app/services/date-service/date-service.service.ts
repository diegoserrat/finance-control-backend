import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';

import { MonthNumber } from '../../models/enum/enumMonthNumber';

@Injectable({
  providedIn: 'root'
})

export class DateService {

  enumMonth = MonthNumber;
  yearChange: Number;

  constructor() {}

  public dateFormatted( date ){
      return moment(date).format();
  }

  public addMonthDate( date ){
    const finalDate = moment(date).add('month', 1);
    return  moment(finalDate).format();
  }

  public subtractMonth( date ){
    const finalDate = moment(date).subtract('month', 1);
    return moment(finalDate).format();
  }

  public getMonth( month: Number ){
      if( this.enumMonth.jan == month || month == 13 ){
        return 'jan'
      }else if( this.enumMonth.fev == month ){
          return 'fev'
      }else if( this.enumMonth.mar == month ){
        return 'mar'
      }else if( this.enumMonth.abr == month ){
        return 'abr'
      }else if( this.enumMonth.mai == month ){
        return 'mai'
      }else if( this.enumMonth.jun == month ){
        return 'jun'
      }else if( this.enumMonth.jul == month ){
        return 'jul'
      }else if( this.enumMonth.ago == month ){
        return 'ago'
      }else if( this.enumMonth.set == month ){
        return 'set'
      }else if( this.enumMonth.out == month ){
        return 'out'
      }else if( this.enumMonth.nov == month ){
        return 'nov'
      }else if( this.enumMonth.dez == month || month == 0){
        return 'dez'
      }
  }

  public arrMonths( month ){
    const firstDate = this.getMonth(month -1);
    const middleDate = this.getMonth(month);
    const lastDate = this.getMonth(month +1);
    
    return [ { month: firstDate}, { month: middleDate } , { month: lastDate }]; 
  }
}