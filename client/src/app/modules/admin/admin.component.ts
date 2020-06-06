import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    document.body.className = "hold-transition skin-blue sidebar-mini";
  }
}
