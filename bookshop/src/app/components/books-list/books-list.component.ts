import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books: any=[ ];
  constructor(
    private crudApi: CrudService
  ) { }

  ngOnInit(): void {
    this.crudApi.getBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }

}
