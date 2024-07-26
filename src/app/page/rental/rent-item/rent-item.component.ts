import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent-item',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './rent-item.component.html',
  styleUrl: './rent-item.component.css'
})
export class RentItemComponent {
  public rentalObj = {
    rentID: "",
    customerID: "",
    rentalDate: "",
    expectedReturnDate: "",
    returnedDate: "",
    lateDays: 0,
    fine: 0.0,
    totalCost: 0.0
  }
   
  public rentalDetailObj = {
    rentDetailID:"",
    rentID:"",
    itemID:"",
    totalItemCost:"",
    qty:""
  }
  

  constructor(private http: HttpClient) { }

  addRental() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to add this rental?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post('http://localhost:8080/rental-controller/add', this.rentalObj).subscribe(res => {
          swalWithBootstrapButtons.fire({
            title: "Added!",
            text: "Your rental has been added.",
            icon: "success"
          });
          console.log(res);
        }, err => {
          swalWithBootstrapButtons.fire({
            title: "Error!",
            text: "There was an error adding the rental.",
            icon: "error"
          });
          console.error(err);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your rental was not added.",
          icon: "error"
        });
      }
    });
  }
}
