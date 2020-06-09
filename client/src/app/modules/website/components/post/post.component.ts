import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  post: {};
  constructor(
    private route: ActivatedRoute,
    private service: GlobalService,
    private router: Router
  ) {
    this.route.params.subscribe((a) => {
      if (a.slug) {
        this.service.getById("posts", a.slug + "?slug=1", (res) => {
          if (res.data) {
            this.post = res.data;
          } else {
            this.router.navigate(["notfound"]);
          }
        });
      }
    });
  }

  ngOnInit() {}
}
