import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { Product } from '../model/product'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productList: Product[] = [];
  public filterCategory: any
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService) { }
  ngOnInit(): void {
    this.api.getProduct()
      .subscribe(res => {
        this.productList.push(res);
        this.filterCategory = this.productList;
        this.productList.forEach((a: any) => {
          if (a.category === "women's clothing" || a.category === "men's clothing") {
            a.category = "fashion"
          }
          Object.assign(a, { quantity: 1, total: a.price });
        });
      });
    
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }
}