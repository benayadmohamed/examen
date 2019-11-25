import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {FormControl, FormGroup} from "@angular/forms";
import {AddProductRequest} from "../../store/product.actions";

@Component({
  selector: 'app-form-add-view',
  templateUrl: './form-add-view.component.html',
  styleUrls: ['./form-add-view.component.css']
})
export class FormAddViewComponent implements OnInit {
  formgroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl('')
  });

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  add() {
    this.store.dispatch(new AddProductRequest({product: this.formgroup.value})).subscribe(value => {

    });
  }
}
