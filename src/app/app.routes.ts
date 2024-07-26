import { Routes } from '@angular/router';
import { AddCustomerComponent } from './page/customer/add-customer/add-customer.component';
import { ViewAllCustomersComponent } from './page/customer/view-all-customers/view-all-customers.component';
import { AddItemComponent } from './page/item/add-item/add-item.component';
import { ViewAllItemsComponent } from './page/item/view-all-items/view-all-items.component';
import { RentItemComponent } from './page/rental/rent-item/rent-item.component';
import { ViewAllRentalsComponent } from './page/rental/view-all-rentals/view-all-rentals.component';

export const routes: Routes = [
    {
        path:"add-cus",
        component:AddCustomerComponent
    },

    {
        path:"view-all-cus",
        component:ViewAllCustomersComponent
    },

    {
        path:"add-item",
        component:AddItemComponent
    },

    {
        path:"view-all-items",
        component:ViewAllItemsComponent
    },

    {
        path:"add-rental",
        component:RentItemComponent
    },

    {
        path:"view-all-rentals",
        component:ViewAllRentalsComponent
    }

    
];
