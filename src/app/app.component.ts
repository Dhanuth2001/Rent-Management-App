import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './common/nav/nav.component';
import { AddCustomerComponent } from './page/customer/add-customer/add-customer.component';
import { ViewAllCustomersComponent } from './page/customer/view-all-customers/view-all-customers.component';
import { AddItemComponent } from './page/item/add-item/add-item.component';
import { ViewAllItemsComponent } from './page/item/view-all-items/view-all-items.component';
import { RentItemComponent } from './page/rental/rent-item/rent-item.component';
import { ViewAllRentalsComponent } from './page/rental/view-all-rentals/view-all-rentals.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,AddCustomerComponent,ViewAllCustomersComponent, AddItemComponent,
     ViewAllItemsComponent, RentItemComponent, ViewAllRentalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rent-management-app';
}
