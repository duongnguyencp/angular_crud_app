import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../models/Account';
import { Employee } from '../models/Employee';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public Name: string = "";
  public id: number = 0;
  public validateText: string = "";
  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private routerService: Router, private accountService: AccountService) {
    this.Name = "";
    this.id = 0;
    this.validateText = "";
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required,  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
    this.loginForm.valueChanges.subscribe(value=>{
      this.validateText = '';
    })
  }
  onLogin(): void {
    console.log(this.loginForm);
    var currentAccount = this.loginForm.value;
    var vmAccount = { Name: currentAccount.name, Password: currentAccount.password};
    var isAccountExist = true;
    this.accountService.loginByAccount(vmAccount).subscribe((data: any) => {
      isAccountExist = data
      console.log(isAccountExist);
      if (isAccountExist) {
        this.validateText = "";
        this.routerService.navigate(['/home']);
        localStorage.setItem('currentUser', JSON.stringify(isAccountExist));
      }
      else {
        this.validateText = "Ten hoac mat khau khong chinh xac!!!";
        return;
      }
    },err=>{
      console.log(err);
      this.validateText = "Ten hoac mat khau khong chinh xac!!!";
    }
    );
    
  }
  onLogout(): void {
    localStorage.removeItem('currentUser');
  }

}
