import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { CartService } from '../service/cart.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalItem: number = 0;
  public searchTerm !: string;
  searchForm :FormGroup |any;
  constructor(private cartService: CartService,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
      this.searchForm=new FormGroup({
        items:new FormControl("")
      })
      this.searchForm.get('items').valueChanges.pipe(
        debounceTime(2000)
      ).subscribe((data : any) =>{
        this.cartService.search.next(data);
      })
  }

}


