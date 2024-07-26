import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  public itemObj = {
    description: "",
    rentalPerDay: "",
    availability: "Available",
    qty:"",
    finePerDay: ""
  }

  constructor(private http: HttpClient) { }

  addItem() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to add this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post('http://localhost:8080/item-controller/add', this.itemObj).subscribe(res => {
          swalWithBootstrapButtons.fire({
            title: "Added!",
            text: "Your item has been added.",
            icon: "success"
          });
          console.log(res);
        }, err => {
          swalWithBootstrapButtons.fire({
            title: "Error!",
            text: "There was an error adding the item.",
            icon: "error"
          });
          console.error(err);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item was not added.",
          icon: "error"
        });
      }
    });
  }
}
