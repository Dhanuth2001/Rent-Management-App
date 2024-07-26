import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-customers',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './view-all-customers.component.html',
  styleUrl: './view-all-customers.component.css'
})
export class ViewAllCustomersComponent {

  public cusList: any;

  public selectedCustomer={
    customerID:"",
    name:"",
    city:"",
    contactNo:""
  }
  
  
  
  constructor(private http: HttpClient) {
    this.loadCustomerTable();
  }
  
  loadCustomerTable() {
    this.http.get("http://localhost:8080/cus-controller/get-all").subscribe(res => {
      this.cusList = res;
      console.log(res);
    })
  }
  
  deleteCustomer(customer: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.http.delete(`http://localhost:8080/cus-controller/delete-by-id/${customer.id}`, { responseType: 'text' }).subscribe(res => {
          this.loadCustomerTable()
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          console.log(res);
  
        })
        console.log(customer);
  
  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }
  
  edit(customer: any) {
    this.selectedCustomer=customer
  
  }
  updateCustomer() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.http.put(`http://localhost:8080/cus-controller/update`,this.selectedCustomer).subscribe(res => {
          this.loadCustomerTable();
          console.log(res);
        
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your customer data has been updated.",
            icon: "success"
          });
         
  
        })
       
  
  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  
  
}}
