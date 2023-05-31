import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  submitted: boolean = false;
  login: FormGroup = new FormGroup({
    password: new FormControl(''),
    username: new FormControl('')
  })
  userCredential:any;
  invalidCredential: boolean = false;
  
  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userCredential = {
      "username":"admin",
      "password":"admin@123"
    }
    this.login = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  loginClick(){
    console.log("login",this.login.controls);
    this.submitted = true;
    if(this.login.valid){
      if(JSON.stringify(this.login.value) == JSON.stringify(this.userCredential)){
        localStorage.setItem("userLoggedIn","true")
        this.router.navigateByUrl(`/dashboard`);
      } else{
        this.invalidCredential = true;
      }
    }
  	
  }
}
