import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {HttpParams} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public elements: Array<any> = [];
  public queryParams = {
    page: 1,
    pageSize: 20
  }

  public bookForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    preview: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  });

  constructor(private dataService: DataService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getElements()
  }

  getElements() {

    let params = new HttpParams()
      .set('page', this.queryParams.page.toString())
      .set('pageSize', this.queryParams.pageSize.toString());

    this.dataService.getBooks(this.queryParams).subscribe(
      res => {
        console.log(res);
        this.elements = res;
      }, err => {
        console.log(err);
      }
    )
  }

  addElement() {
    this.dataService.addNewBook(this.bookForm.getRawValue()).subscribe(
      res => {
        console.log(res);
        this.bookForm.reset();
        this.getElements();
      }, err => {
        console.log(err);
      }
    );
  }

  removeElement(id: string) {
    this.dataService.deleteBook(id).subscribe(
      res => {
        console.log(res);
        this.getElements();
      }, err => {
        console.log(err);
      }
    )
  }

  logout() {
    this.authService.logout();
  }

}
