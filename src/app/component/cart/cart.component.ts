import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService,private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  calculate(){
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  orderBooked(){
    localStorage.setItem("OrderHistory",JSON.stringify(this.products)  );
    this.router.navigateByUrl('/orders')
    this.emptycart();
  }
  addItem(item:any){
     let info:any = this.products.find((info:any)=>info.id==item)
     info.price=info.price/info.quantity;
     info.quantity=info.quantity +1;
     info.price=info.price* info.quantity;
     this.grandTotalsInfo()
  }
  removeItems(item:any){
    let info:any = this.products.find((info:any)=>info.id==item)
    if( info.quantity===1){
     var prodList=this.products.filter((a:any,i:any)=>{
       if(item==a.id){
         this.products.splice(i,1);
          this.cartService.updatetoCart(this.products)
         this.grandTotalsInfo()
       }
     })
     
    }else{
      info.price=info.price/info.quantity;
      info.quantity=info.quantity - 1;
      info.price=info.price* info.quantity;
      this.grandTotalsInfo()
    }
     
  }
  grandTotalsInfo(){
    this.grandTotal = 0;
    this.products.map((a:any)=>{
      this.grandTotal += a.price;
    })
   
  }
  }
   
    
  



