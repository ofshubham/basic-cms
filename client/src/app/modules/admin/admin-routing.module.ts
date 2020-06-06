import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminGuard } from "./admin.guard";
import { PostsListComponent } from "./components/posts/posts-list/posts-list.component";
import { PostsCreateComponent } from "./components/posts/posts-create/posts-create.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "",
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "posts", component: PostsListComponent },
      { path: "posts/create", component: PostsCreateComponent },
      { path: "posts/edit/:id", component: PostsCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
