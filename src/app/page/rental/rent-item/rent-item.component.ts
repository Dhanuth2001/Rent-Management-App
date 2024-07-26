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
  

  constructor(private http: HttpClient) { this.loadRentalTable();}

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
        this.http.post('http://localhost:8080/rentalDetail-controller/add', this.rentalDetailObj).subscribe(res => {
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
  addItems() {
  }
  public rentalDetailList: any;

  public selectedRentalDetail = {
    rentDetailID:"",
    rentID:"",
    itemID:"",
    totalItemCost:"",
    qty:""
  }


  loadRentalTable() {
    this.http.get("http://localhost:8080/rentalDetail-controller/get-all").subscribe(res => {
      this.rentalDetailList = res;
      console.log(res);
    });
  }

  deleteRentalDetail(rental: any) {
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
        this.http.delete(`http://localhost:8080/rentalDetail-controller/delete-by-id/${rental.rentID}`, { responseType: 'text' }).subscribe(res => {
          this.loadRentalTable();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The rental has been deleted.",
            icon: "success"
          });
          console.log(res);
        });
        console.log(rental);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your rental record is safe.",
          icon: "error"
        });
      }
    });
  }

  edit(rental: any) {
    this.selectedRentalDetail = rental;
  }

  updateRentalDetails() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to update this rental?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(`http://localhost:8080/rentalDetail-controller/update`, this.selectedRentalDetail).subscribe(res => {
          this.loadRentalTable();
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your rental record has been updated.",
            icon: "success"
          });
          console.log(res);
        }, err => {
          swalWithBootstrapButtons.fire({
            title: "Error!",
            text: "There was an error updating the rental.",
            icon: "error"
          });
          console.error(err);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your rental record was not updated.",
          icon: "error"
        });
      }
    });
  }
}
