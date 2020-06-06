import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router, private service: GlobalService) {}

  ngOnInit() {}
  logout() {
    this.service.logout();
    this.router.navigate(["admin/login"]);
  }
}
