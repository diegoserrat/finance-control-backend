import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { payments } from 'src/app/models/payments';
import { CreditCardService } from 'src/app/views/credit-card/credit-card.service';
import { DateService } from 'src/app/services/date-service/date-service.service';

@Component({
  selector: 'painel-menu',
  templateUrl: './painel-menu.component.html',
  styleUrls: ['./painel-menu.component.styl']
})
export class PainelMenuComponent implements OnInit {
  
  modalCreditCard: BsModalRef;
  modalPayment: BsModalRef;

  form: FormGroup;
  formPayment: FormGroup;

  clientId = localStorage.getItem('currentUserId');

  creditCard: any = [];

  isFinancial: boolean = false;
  isCreditCard: boolean = false;

  @Output() sendNewPayment = new EventEmitter();
  @Output() sendNewCreditCard = new EventEmitter();
  
  constructor( private service: CreditCardService,
               private modalService: BsModalService,
               private formbuilder: FormBuilder,
               private dateService: DateService,
               private route: Router){
                 if ( this.route.url == '/creditCard') this.isCreditCard = true;
              }

  ngOnInit() {
    this.form = this.formbuilder.group({ description: [null, Validators.required] });

    this.formPayment = this.formbuilder.group({ creditCard: [null, Validators.required],
                                                description: [null, Validators.required],
                                                value: [ null , Validators.required],
                                                isFinancial: [ false ],
                                                financialDuration: [ null ],
                                                financialDate: [ null ]});
  }

  registerCreditCard(){
    if(this.form.status == 'VALID'){
      const objCC = {description: this.form.value.description,
                     user: this.clientId,
                     payments: []};

      this.sendNewCreditCardEvent();
      
      this.service.addCreditCard(objCC)
        .pipe(take(1))
        .subscribe(( data ) =>{
            if( data ) this.sendNewCreditCardEvent()
        } 
      );
    }
  }

  registerPayment(){
    if(this.formPayment.status){
      if(this.formPayment.value.financialDuration){
        this.createFinancial(this.formPayment.value.financialDuration, this.formPayment);
      }else{
        this.formPayment.value.value = this.formPayment.value.value * 100;

        const date  = this.dateService.dateFormatted(new Date());
        const objPayments = { description: this.formPayment.value.description,
                              value: this.formPayment.value.value,
                              isFinancial: this.formPayment.value.isFinancial,
                              financialDuration: this.formPayment.value.financialDuration,
                              financialDate: date};
        
        this.formPayment.value.creditCard.payments.push(objPayments);
      }

      const id = this.formPayment.value.creditCard._id;
      const creditCard = this.formPayment.value.creditCard;

      this.sendNewPaymentEvent();
      
      this.service.putCreditCard(id, creditCard)
          .pipe(take(1))
          .subscribe( ( data ) => {
              if(data) this.sendNewPaymentEvent()
          }
      );
    }
  }

  createFinancial(duration, formPayment){
    let newObj = {};
    let date = this.dateService.dateFormatted(new Date());

    newObj = {description: formPayment.value.description,
              value: formPayment.value.value,
              isFinancial: formPayment.value.isFinancial,
              financialDuration: formPayment.value.financialDuration,
              financialDate: date};
    
    formPayment.value.creditCard.payments.push(newObj);  

        for ( let f = 0; f < duration -1; f++){
            date = this.dateService.addMonthDate(date);
            newObj = { description: formPayment.value.description,
                          value: formPayment.value.value,
                          isFinancial: formPayment.value.isFinancial,
                          financialDuration: formPayment.value.financialDuration,
                          financialDate: date };
            
            formPayment.value.creditCard.payments.push(newObj);
        }
  }

  sendNewPaymentEvent(){ 
    this.sendNewPayment.emit();
  }

  sendNewCreditCardEvent(){ 
    this.sendNewCreditCard.emit();
  }

  openModalCC( template: TemplateRef<any> ){
    this.modalCreditCard = this.modalService.show(template);
  }

  openModalPayment( template: TemplateRef<any>){
    this.modalPayment = this.modalService.show(template);

    this.formPayment.reset();
    
    this.service.getCreditCard(this.clientId).subscribe( ( data: any) =>{ this.creditCard = data.creditCard; });
  }

  closeModalPayment(){
    this.modalPayment.hide();
  }

  home(){
    this.route.navigate(['/home']);
  }

  creditCardUrl(){
    this.route.navigate(['/creditCard']);
  }
}
