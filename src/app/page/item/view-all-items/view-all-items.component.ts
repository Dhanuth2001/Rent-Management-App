import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-items',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './view-all-items.component.html',
  styleUrl: './view-all-items.component.css'
})
export class ViewAllItemsComponent {
  public itemList: any;

  public selectedItem = {
    itemID: "",
    description: "",
    rentalPerDay: "",
    availability: "",
    finePerDay: "",
    qty:""
  }

  constructor(private http: HttpClient) {
    this.loadItemTable();
  }

  loadItemTable() {
    this.http.get("http://localhost:8080/item-controller/get-all").subscribe(res => {
      this.itemList = res;
      console.log(res);
    });
  }

  deleteItem(item: any) {
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
        this.http.delete(`http://localhost:8080/item-controller/delete-by-id/${item.itemID}`, { responseType: 'text' }).subscribe(res => {
          this.loadItemTable();
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success"
          });
          console.log(res);
        });
        console.log(item);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe :)",
          icon: "error"
        });
      }
    });
  }

  editItem(item: any) {
    this.selectedItem = item;
  }

  updateItem() {
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
        this.http.put(`http://localhost:8080/item-controller/update`, this.selectedItem).subscribe(res => {
          this.loadItemTable();
          console.log(res);
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your item data has been updated.",
            icon: "success"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item data is safe :)",
          icon: "error"
        });
      }
    });
  }
}
