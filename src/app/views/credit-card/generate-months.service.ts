import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';

import { DateService } from '../../services/date-service/date-service.service';

@Injectable()

export class GenerateMonthsService {

  yearChange: number;

  constructor( private dataService: DateService ){}


  generateMonths(month, date){
      
    if( month == 'jan'){
        if( this.yearChange == 12) {
          date =  this.dataService.addMonthDate(date);
        } else if( this.yearChange == 2) {
          date = this.dataService.subtractMonth(date);
        }
        
        this.yearChange = 1;
  
      }else if( month == 'fev'){
        if( this.yearChange == 1){
          date =  this.dataService.addMonthDate(date);
        } else if( this.yearChange == 3){
          date = this.dataService.subtractMonth(date);
        }
        
        this.yearChange = 2;
        
      }else if( month == 'mar'){
        if( this.yearChange == 2){
          date =  this.dataService.addMonthDate(date);
        } else if( this.yearChange == 4){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 3;
        
      }else if( month == 'abr'){
        if( this.yearChange == 3){
          date =  this.dataService.addMonthDate(date);
        }else if( this.yearChange == 5){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 4;
        
      }else if( month == 'mai'){
        if( this.yearChange == 4){
          date =  this.dataService.addMonthDate(date);
        }else  if( this.yearChange == 6) {
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 5;
        
      }else if( month == 'jun'){
        if( this.yearChange == 5){
          date =  this.dataService.addMonthDate(date);
        }else if( this.yearChange == 7){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 6;
        
      }else if( month == 'jul'){
        if( this.yearChange == 6){
          date =  this.dataService.addMonthDate(date);
        }else if( this.yearChange == 8){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 7;
        
      }else if( month == 'ago'){
        if( this.yearChange == 7){
          date =  this.dataService.addMonthDate(date);
        }else if( this.yearChange == 9){ 
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 8;
        
      }else if( month == 'set'){
        if( this.yearChange == 8) {
          date =  this.dataService.addMonthDate(date);
        }else  if( this.yearChange == 10){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 9;
        
      }else if(month == 'out'){
        if( this.yearChange == 9){
          date =  this.dataService.addMonthDate(date);
        }else  if( this.yearChange == 11){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 10;
        
      }else if(month == 'nov'){
        if( this.yearChange == 10){
          date =  this.dataService.addMonthDate(date);
        }else  if( this.yearChange == 12){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 11;
        
      }else if(month == 'dez'){
        if( this.yearChange == 11){
          date =  this.dataService.addMonthDate(date);
        }
        if( this.yearChange == 1){
          date = this.dataService.subtractMonth(date);
        }
  
        this.yearChange = 12;
      }

      return { date, yearChange: this.yearChange };
  }
}
