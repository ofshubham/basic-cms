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
  olderPostButton = true;
  constructor(private service: GlobalService) {
    this.getFiveOlderPosts(new Date().toISOString());
  }

  ngOnInit() {}
  getFiveOlderPosts(date) {
    this.fivePosts = [];
    this.service.getAll("posts?date=" + date, (res) => {
      this.fivePosts = res.data;
      if (this.fivePosts.length < 5) {
        this.olderPostButton = false;
      }
    });
  }
  viewOlderPosts() {
    this.getFiveOlderPosts(
      this.fivePosts[this.fivePosts.length - 1].created_at
    );
  }
}
