import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

import { CreditCardService } from '../credit-card/credit-card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  clientId = localStorage.getItem('currentUserId');

  creditCards = [];
  total: any;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [ ];
  public pieChartData: SingleDataSet = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  @BlockUI('ngBlockHome') ngBlockHome: NgBlockUI;

  constructor( private creditCard: CreditCardService,
               private route: Router){}
        
  ngOnInit(){
    this.getCreditCard();
  } 

  getCreditCard(){
    const fullPayments = [];

    this.creditCard.getCreditCard(this.clientId)
                    .pipe(take(1))
                    .subscribe( ( data: any ) =>{
                      this.total = 0;

                      data.creditCard.map( cc => {
                        this.creditCards.push(cc);
                        
                        cc.payments.map( resPayment => {

                          this.total += resPayment.value;

                          cc.total = this.total / 100;
                          cc.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                          
                          fullPayments.push(resPayment);
                        });
                      });

                      const counts = fullPayments.reduce( (prev, curr) =>{
                        const count = prev.get(curr.description) || 0;
                        prev.set(curr.description, curr.value + count);
                        return prev;
                      }, new Map());

                      const reduceFullDescPayments = [...counts].map( ([description, value]) =>{
                        return description;
                      });

                      const reduceFullValuePayments = [...counts].map( ([description, value]) =>{
                        return value;
                      });

                      this.pieChartLabels = reduceFullDescPayments;
                      this.pieChartData = reduceFullValuePayments;

                    });
  }

  onSelectedCC(): void {
    this.route.navigate(['/creditCard']);
  }
}