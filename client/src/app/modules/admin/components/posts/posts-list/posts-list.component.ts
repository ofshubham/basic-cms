import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { Router } from "@angular/router";
import { DatatableService } from "src/app/services/datatable.service";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.css"],
})
export class PostsListComponent implements OnInit {
  postdata = {
    modulename: "posts",
    tabletitle: "Post List",
    createbtnurl: "create",
    createbtntitle: "Add New Post",
    buttons: [
      {
        title: "Edit",
        icon: "fas fa-edit",
        class: "btn btn-primary",
        type: "edit",
        permission: "post.edit",
      },
      {
        title: "Delete",
        icon: "fas fa-trash",
        class: "btn btn-danger",
        type: "delete",
        permission: "post.delete",
      },
    ],
    columns: [
      { name: "title", lable: "Title" },
      { name: "created_at", lable: "Create Date" },
      { name: "action", lable: "Actions" },
    ],
  };
  constructor(
    private service: GlobalService,
    private router: Router,
    private dt: DatatableService
  ) {}

  ngOnInit() {}
  actionTable(data) {
    var l = data.data.length - 1;
    if (data.type == "delete") {
      this.service.deleteById("posts", data.data[l], (res) => {
        this.dt.changedatatable(1);
      });
    } else if (data.type == "edit") {
      this.router.navigate(["admin/posts/edit/" + data.data[l]]);
    }
  }
}
