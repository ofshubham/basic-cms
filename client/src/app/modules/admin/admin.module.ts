import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { LayoutModule } from "./layout/layout.module";
import { CoreModule } from "../core/core.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from "./auth/auth.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PostsCreateComponent } from './components/posts/posts-create/posts-create.component';
import { PostsListComponent } from './components/posts/posts-list/posts-list.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, PostsCreateComponent, PostsListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    CoreModule,
    AuthModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
