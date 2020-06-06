import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebsiteComponent } from "./website.component";
import { WebsiteRoutingModule } from "./website-routing.module";
import { LayoutModule } from "../website/layout/layout.module";
import { BannerComponent } from "./components/banner/banner.component";
import { PostComponent } from "./components/post/post.component";
import { MainComponent } from "./components/main/main.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    WebsiteComponent,
    BannerComponent,
    PostComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    LayoutModule,
    PipesModule,
    RouterModule,
  ],
})
export class WebsiteModule {}
