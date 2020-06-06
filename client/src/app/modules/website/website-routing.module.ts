import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebsiteComponent } from "./website.component";
import { PostComponent } from "./components/post/post.component";
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
  {
    path: "",
    component: WebsiteComponent,
    children: [
      { path: "", component: MainComponent },
      { path: "posts/:slug", component: PostComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
