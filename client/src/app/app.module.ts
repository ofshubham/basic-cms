import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { PipesModule } from "./pipes/pipes.module";
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PipesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
