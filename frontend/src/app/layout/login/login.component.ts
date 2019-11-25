import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../modules/user/user.service";
import {LoadPrivilagesRequest} from "../../modules/user/store/user.actions";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fromgroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private store: Store, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.userService.signUp(this.fromgroup.value).subscribe(value => {
      this.store.dispatch(new LoadPrivilagesRequest()).subscribe(value1 => {
        this.router.navigate(['/']);
      });
    });
  }
}
