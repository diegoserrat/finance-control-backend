import { Component, OnInit, TemplateRef } from '@angular/core';
// import { Router } from '@angular/router';
import { take, first } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CreditCardService } from './credit-card.service';
import { AuthService } from '../../services/auth/auth.service';
import { DateService } from '../../services/date-service/date-service.service';

import { GenerateMonthsService } from './generate-months.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.styl']
})
export class CreditCardComponent implements OnInit {

  modalDeleteCC: BsModalRef;
  
  date: any;

  creditCards = [];
  clientId = localStorage.getItem('currentUserId');

  monthsTab = [];
  yearChange: Number;
  total;

  inputDisabled: boolean;

  allPayments = [];

  @BlockUI('ngBlockCreditCard') ngBlockCreditCard: NgBlockUI;

  constructor( private service: CreditCardService,
               private authService: AuthService,
               private dataService: DateService,
               private modalService: BsModalService,
               private generateMonthsService: GenerateMonthsService){}
        
  ngOnInit(){
    this.generateMonth();
    this.getCreditCard(new Date());
    this.date = new Date();
    this.yearChange = this.date.getMonth()+1;
    //is generating substracting a month was added 
    this.date = this.dataService.subtractMonth(this.date);
  } 

  getCreditCard(date){
      this.creditCards = [];
      this.ngBlockCreditCard.start('Carregando...');

      this.service.getCreditCard(this.clientId)
          .pipe(take(1))
          .subscribe( ( data: any ) => { 
            for ( let c in data.creditCard){
              const payments = data.creditCard[c].payments.filter( payments =>{
                const datePayment = moment(payments.financialDate).format('YYYY/MM');
                const dateToday = moment(date).format('YYYY/MM');
                
                this.allPayments.push(payments);
                
                return  datePayment == dateToday ;
              });

              data.creditCard[c].payments = payments;
               
              this.total = 0;

              for ( let p in data.creditCard[c].payments){
                this.total += data.creditCard[c].payments[p].value; 
                
                data.creditCard[c].payments[p].value = data.creditCard[c].payments[p].value / 100;
                data.creditCard[c].payments[p].value  = data.creditCard[c].payments[p].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                data.creditCard[c].total = this.total;
                
                this.inputDisabled = true;
              }
             
              if( this.total > 0){
                data.creditCard[c].total = data.creditCard[c].total /100;
                data.creditCard[c].total = data.creditCard[c].total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
              }else{
                data.creditCard[c].total = 0;
                data.creditCard[c].total = data.creditCard[c].total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
              }
            }

            this.creditCards = data.creditCard;
            this.ngBlockCreditCard.stop();

          }, error =>{ if( error.status == 401) this.authService.logout() });
  }

  generateMonth(){
    const dateToday = new Date().getMonth() +1;
    const firstDate = this.dataService.getMonth(dateToday -1);
    const middleDate = this.dataService.getMonth(dateToday);
    const lastDate = this.dataService.getMonth(dateToday +1);
  
    this.monthsTab = [{ month: firstDate }, { month: middleDate }, { month: lastDate}];
  }

  onSelectedMonth(month){
    this.date = this.generateMonthsService.generateMonths(month, moment(this.date).format()).date;
    this.getCreditCard( this.generateMonthsService.generateMonths(month, moment(this.date).format()).date );
    this.monthsTab = this.dataService.arrMonths(this.generateMonthsService.generateMonths(month, moment(this.date).format()) .yearChange);
  }

  deletePayment(item){
    if( item.isFinancial){
        const fullPayments = this.allPayments.filter( payments =>{
           return payments.description == item.description;
        });
  
        for ( let f in fullPayments){
          this.service.deletePayment(fullPayments[f]._id).pipe(take(1)).subscribe( () => this.getCreditCard( new Date() ));
        }
    }else{
      this.service.deletePayment(item._id).pipe(take(1)).subscribe( () => this.getCreditCard( new Date() ));
    } 
  }

  deleteCreditCard(id){
    this.service.deleteCreditCard(id).pipe(take(1)).subscribe(() =>{
      this.closeModalDeleteCC();
      this.getCreditCard(new Date());
    }); 
  }

  eventNewPayment(){
    this.getCreditCard(new Date());
  }

  eventNewCreditCard(){
    this.getCreditCard(new Date());
  }

  openModalDeleteCC( template: TemplateRef<any> ){
    this.modalDeleteCC = this.modalService.show(template);
  }

  closeModalDeleteCC(){
    this.modalDeleteCC.hide();
  }
}
