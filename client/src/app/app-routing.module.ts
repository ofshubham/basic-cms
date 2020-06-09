import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotfoundComponent } from "./components/notfound/notfound.component";

const routes: Routes = [
  { path: "", loadChildren: "./modules/website/website.module#WebsiteModule" },
  { path: "admin", loadChildren: "./modules/admin/admin.module#AdminModule" },
  { path: "notfound", component: NotfoundComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
