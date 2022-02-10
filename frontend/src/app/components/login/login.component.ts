import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      res => {
        console.log(res);
        this.router.navigate((['/dashboard']));
      },err => {
        console.log(err);
      }
    );
  }

}
