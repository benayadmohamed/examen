import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {FormControl, FormGroup} from "@angular/forms";
import {AddCategoryRequest} from "../../store/category.actions";

@Component({
  selector: 'app-form-add-view',
  templateUrl: './form-add-view.component.html',
  styleUrls: ['./form-add-view.component.css']
})
export class FormAddViewComponent implements OnInit {
  formgroup: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  add() {
    this.store.dispatch(new AddCategoryRequest({category: this.formgroup.value})).subscribe(value => {

    });
  }
}
