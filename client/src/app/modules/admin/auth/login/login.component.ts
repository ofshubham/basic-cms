import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { GlobalService } from "src/app/services/global.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error;
  constructor(
    private fbuilder: FormBuilder,
    private service: GlobalService,
    private router: Router
  ) {
    this.buildForm();

    this.service.jwtVerify((a) => {
      if (a) {
        this.router.navigate(["admin/dashboard"]);
      }
    });
  }

  ngOnInit() {}
  buildForm() {
    this.loginForm = this.fbuilder.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.maxLength(12)]],
    });
  }

  login() {
    this.service.login(this.loginForm.value, (msg) => {
      if (msg == "SUCCESS") {
        this.router.navigate(["admin/dashboard"]);
      } else {
        this.error = msg;
        this.loginForm.reset();
      }
    });
  }
}
