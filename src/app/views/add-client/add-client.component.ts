import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';

import { AddClientService } from './add-client.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.styl']
})
export class AddClientComponent implements OnInit {

  form: FormGroup;

  constructor( private addClientService: AddClientService,
               private viacep: NgxViacepService){}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      cpfCnpj: new FormControl(),
      cep: new FormControl(),
      address: new FormControl(),
      complement: new FormControl(),
      city: new FormControl(),
      uf: new FormControl()
    });
  }

  getCEP(){
    const cep = this.form.get('cep').value;

    this.viacep.buscarPorCep(cep).then( ( endereco: Endereco ) => {
        this.formPatchValue(endereco);
     }).catch( (error: ErroCep) => console.log(error.message) );
  }

  formPatchValue(endereco){
    this.form.patchValue({
      address: endereco.logradouro,
      complement: endereco.complemento,
      city: endereco.localidade,
      uf: endereco.uf
    });
  }

  userRegister(){
      this.addClientService.registerUser(this.form.value)
          .pipe(take(1))
          .subscribe(
            success => {
              console.log(JSON.stringify(success));
            },
            error => console.log('err' + JSON.stringify(error)),
            () => console.log('request completo')
          );
  }

}
