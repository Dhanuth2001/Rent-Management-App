import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-rentals',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view-all-rentals.component.html',
  styleUrl: './view-all-rentals.component.css'
})
export class ViewAllRentalsComponent {
  public rentalList: any;

  public selectedRental = {
    rentID: "",
    customerID: "",
    rentalDate: "",
    expectedReturnDate: "",
    returnedDate: "",
    lateDays: 0,
    fine: 0.0,
    totalCost: 0.0
  }

  constructor(private http: HttpClient) {
    this.loadRentalTable();
  }

  loadRentalTable() {
    this.http.get("http://localhost:8080/rental-controller/get-all").subscribe(res => {
      this.rentalList = res;
      console.log(res);
    });
  }

  deleteRental(rental: any) {
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
        this.http.delete(`http://localhost:8080/rental-controller/delete-by-id/${rental.rentID}`, { responseType: 'text' }).subscribe(res => {
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
    this.selectedRental = { ...rental };
  }

  updateRental() {
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
        this.http.put(`http://localhost:8080/rental-controller/update`, this.selectedRental).subscribe(res => {
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
