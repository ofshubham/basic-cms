import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { GlobalService } from "src/app/services/global.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DatashareService } from "src/app/services/datashare.service";

@Component({
  selector: "app-posts-create",
  templateUrl: "./posts-create.component.html",
  styleUrls: ["./posts-create.component.css"],
})
export class PostsCreateComponent implements OnInit {
  postform;
  config;
  tree;
  postid;
  constructor(
    private service: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private ds: DatashareService
  ) {
    this.route.params.subscribe((a) => {
      if (a.id) {
        this.service.getById("posts", a.id, (res) => {
          this.postid = res.data._id;
          this.ds.changedata(res.data);
        });
      }
    });
    this.postform = [
      {
        name: "title",
        type: "text",
        label: { name: "Title", class: "control-lable required" },
        validation: [Validators.required],
      },
      {
        name: "tagline",
        type: "text",
        label: { name: "Tagline", class: "control-lable required" },
        validation: [Validators.required],
      },
      {
        name: "description",
        type: "textarea",
        label: { name: "Description", class: "control-lable required" },
        validation: [Validators.required],
      },
      {
        name: "content",
        type: "editor",
        label: { name: "Content", class: "control-lable required" },
        validation: [Validators.required],
      },
    ];
    this.postform["fbreak"] = [];
  }

  ngOnInit() {}
  saveNewform(data) {
    if (this.postid) {
      data._id = this.postid;
      this.service.put("posts", data, (res) => {
        if (res["msg"] == "SUCCESS") {
          this.router.navigate(["admin/posts"]);
        }
      });
    } else {
      data["created_by"] = data.userid;
      this.service.post("posts", data, (res) => {
        if (res["msg"] == "SUCCESS") {
          this.router.navigate(["admin/posts"]);
        }
      });
    }
  }
}
