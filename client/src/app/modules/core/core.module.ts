import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table/table.component";
import { FormsComponent } from "./forms/forms.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "ngx-ckeditor";
import { NgxFileDropModule } from "ngx-file-drop";
import { NgSelect2Module } from "ng-select2";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [TableComponent, FormsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxFileDropModule,
    NgSelect2Module,
    NgMultiSelectDropDownModule,
    DataTablesModule
  ],
  exports: [TableComponent, FormsComponent],
})
export class CoreModule {}
