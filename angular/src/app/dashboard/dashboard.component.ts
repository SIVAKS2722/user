import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  userList;

  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,private formBuilder: FormBuilder,) {
      this.userList = JSON.parse(localStorage.getItem("userList")!);
      for(let data of this.userList){
        this.EmpData.push(data)
      }
      console.log(this.userList);
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

  add_user(template:any) {
    this.dialogRef = this.dialog.open(template, {
      width: '800px',
      height:'600px',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      
      this.userList = JSON.parse(localStorage.getItem("userList")!);
      console.log(this.userList)
      this.EmpData = [];
      for(let data of this.userList){
        this.EmpData.push(data)
      }
      this.dataSource.data = (this.EmpData)
    });
    
  }

  submit(){
    console.log(this.addUpdateUser.valid)
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
    this.dialogRef.close('yes');
  }
}
  
