import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})



export class DashboardComponent {
  addUpdateUser: FormGroup;
  updateUser: FormGroup;
  submitted: boolean = false;
  displayedColumns: string[] = [
    'name',
    'phone',
    'address',
    'state',
    'city',
    'action'
  ];

  EmpData: any[] = [];

  dataSource = new MatTableDataSource(this.EmpData);
  userList: any[] = [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,private formBuilder: FormBuilder,) {
      if(localStorage.getItem("userList")){
      this.userList = JSON.parse(localStorage.getItem("userList")!);
      console.log(this.dataSource)
      if(this.userList && this.userList.length != 0){
        for(let data of this.userList){
          this.EmpData.push(data)
        }
      }
      }
      this.addUpdateUser = this.formBuilder.group({
        name: ["", Validators.required],
        city: ["",Validators.required],
        state: ["",Validators.required],
        phone: ["",Validators.required],
        address: ["",Validators.required]
      })

      this.updateUser = this.formBuilder.group({
        name: ["", Validators.required],
        city: ["",Validators.required],
        state: ["",Validators.required],
        phone: ["",Validators.required],
        address: ["",Validators.required]
      })
    }

  get f() {
    return this.addUpdateUser.controls;
  }

  get editUser() {
    return this.updateUser.controls;
  }

  add_user(template:any) {
    this.dialogRef = this.dialog.open(template, {
      width: '800px',
      height:'600px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      this.submitted = false;
      this.addUpdateUser.reset();
      if(result == 'yes'){
      this.userList = JSON.parse(localStorage.getItem("userList")!);
      console.log(this.userList)
      this.EmpData = [];
      for(let data of this.userList){
        this.EmpData.push(data)
      }
      this.dataSource.data = (this.EmpData)
      }
    });
    
    
  }

  submit(){
    console.log(this.addUpdateUser.value,this.userList)
    this.submitted = true;
    if(this.addUpdateUser.valid){
      this.userList.push(this.addUpdateUser.value);
      localStorage.setItem("userList",JSON.stringify(this.userList));
      this.dialogRef.close('yes');
      
    }
  }

  delete(val:any){
    console.log(val)
    console.log(this.userList);
    let index =  this.userList.findIndex((e:any) => e.name == val.name);
    console.log(index)
    this.userList.splice(index,1);
    localStorage.setItem("userList",JSON.stringify(this.userList));
    this.EmpData = [];
    for(let data of this.userList){
      this.EmpData.push(data)
    }
    this.dataSource.data = (this.EmpData)
  }

  edit(val:any,template:any,i:any){
    console.log(i)
    this.dialogRef = this.dialog.open(template, {
      width: '800px',
      height:'600px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      this.submitted = false;
      if(result == 'yes'){
        console.log(this.userList)
        this.userList[i] = this.updateUser.value;
        localStorage.setItem("userList",JSON.stringify(this.userList));
        this.EmpData = [];
        for(let data of this.userList){
          this.EmpData.push(data)
        }
        this.dataSource.data = (this.EmpData)
        
      }
    })

    this.updateUser.setValue(val)
  }

  submitEdit(){
    console.log(this.updateUser.value)
    this.submitted = true;
    if(this.updateUser.valid){
      this.dialogRef.close('yes');
    }
    
  }

  logout(){
    localStorage.removeItem('userLoggedIn');
    this.router.navigateByUrl(`/login`);
  }
}
  
