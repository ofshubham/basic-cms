import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [TopBarComponent, SideBarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopBarComponent, SideBarComponent, FooterComponent],
})
export class LayoutModule {}
