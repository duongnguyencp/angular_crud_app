import { Component, OnInit } from '@angular/core';
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
  public accounts: Account[] = [];
  public currentAccount: Account;
  constructor(private routerService: Router,private accountService: AccountService) {
    this.Name = "";
    this.id = 0;
    this.validateText = "";
    this.currentAccount = new Account();
    this.accountService.getAllAccount().subscribe((data:Account[]) => {
      this.accounts=data;
    });
  }
  ngOnInit(): void {
    
  }
  onSubmit(): void {
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.Name === this.accounts[i].Name && this.id === this.accounts[i].id) {
        this.validateText = "";
        this.routerService.navigate(['/app-root'])
      }
      else {
        this.validateText = "Name or password is incorrect!!!";
      }
    }
  }

}
