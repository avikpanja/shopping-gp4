import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  public products: any = [];
  public grandTotal !: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.products = localStorage.getItem('OrderHistory')
    this.products = JSON.parse(this.products);
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

}
