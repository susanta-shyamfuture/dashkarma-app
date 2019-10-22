import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signup = { username: 'Susanta', password: '123456' };
  submitted = false;

  constructor(
    public router: Router
  ) {}
  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.router.navigateByUrl('/user/home');
    }
  }

}
