import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  public cusObj={
    name:"",
    city:"",
    contactNo:""
  }

  constructor(private http:HttpClient){}
  addCustomer(){
    this.http.post("http://localhost:8080/cus-controller/add",this.cusObj).subscribe(
      (data) => {

        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success"
        });
        console.log(data);
        
      }
    )
    
    
  }
}
