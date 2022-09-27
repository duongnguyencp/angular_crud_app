import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { CustomValidator } from '../custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public Name: string = "";
  public id: number = 0;
  public validateText: string = "";
  public registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private routerService: Router, private accountService: AccountService) {
    this.Name = "";
    this.id = 0;
    this.validateText = "";
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required
        , CustomValidator.patternValidator(/\d/, { hasNumber: true }),
      CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
      Validators.minLength(8)

      ]],
      confirmPassword: ['', [CustomValidator.passwordMatchValidator]]
    });
    this.registerForm.valueChanges.subscribe(value => {
      this.validateText = '';
    })
  }
  onRegister(): void {
    
    console.log(this.registerForm);
    if(this.registerForm.value.username == '' || this.registerForm.value.password == '' || this.registerForm.value.confirmPassword == ''){
      this.routerService.navigate(['/register']);
    }
    else if(this.registerForm.hasError('NoPasswordMatch')){
      this.routerService.navigate(['/register']);
    }
    else{
      var currentAccount = this.registerForm.value;
      var vmAccount ={Name:currentAccount.username, Password: currentAccount.password, ConfirmPassword: currentAccount.confirmPassword };
      this.routerService.navigate(['/login']);
      this.accountService.registerAccount(vmAccount).subscribe((data: any) => {
      }, err => {
        console.log(err);
      });
    }
   
   
    

  }

}
