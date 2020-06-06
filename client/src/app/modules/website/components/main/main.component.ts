import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  posts: [];
  fivePosts = [];
  constructor(private service: GlobalService) {
    this.service.getAll("posts", (res) => {
      this.posts = res.data;
    });
  }

  ngOnInit() {}
}
