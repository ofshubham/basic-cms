import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  post: {};
  constructor(private route: ActivatedRoute, private service: GlobalService) {
    this.route.params.subscribe((a) => {
      if (a.slug) {
        this.service.getById("posts", a.slug + "?slug=1", (res) => {
          this.post = res.data;
        });
      }
    });
  }

  ngOnInit() {}
}
