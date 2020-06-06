import { Component, OnInit, Input, Output, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { GlobalService } from "../../../services/global.service";
import { DatashareService } from "../../../services/datashare.service";
declare var $, select2, select1, moment, daterangepicker, datepicker;
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { ActivatedRoute } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.css"],
})
export class FormsComponent implements OnInit, OnDestroy {
  id;
  baseUrl;
  options = {
    multiple: true,
  };

  @Input("form") form: any;
  @Input("config") config: any;
  @Input("tree") tree: any;
  @Input("test") test: any;
  @Output() saveevent = new EventEmitter<any>();
  mform: FormGroup;
  slides = [{ image: "", caption: "", title: "" }];
  cksditorconfig = {
    filebrowserBrowseUrl: "/admin/media/popup",
  };

  receiveimages = {};
  formarray: FormArray;
  filegalleryname = "gallerylist";
  peopleCommittee = "peoplelist";
  sites;
  constructor(
    private formb: FormBuilder,
    private service: GlobalService,
    private ds: DatashareService,
    private route: ActivatedRoute
  ) {
    this.baseUrl = this.service.baseUrl;
    this.route.params.subscribe((a) => {
      if (a) {
        this.id = a.id;
      }
    });
  }

  ngOnInit() {
    var group = [
      this.formb.group({
        image: ["", Validators.required],
        caption: ["", Validators.required],
        title: ["", Validators.required],
      }),
    ];
    var group1 = [
      this.formb.group({
        name: [""],
        designation: [""],
      }),
    ];
    var fc = {};
    this.form.map((f) => {
      fc[f.name] = ["", f.validation];
    });

    if (this.form["fbreak"]) {
      this.form["fbreak"].map((f) => {
        if (f.type == "select") {
          fc[f.name] = [f.defaultvalue, f.validation];
        } else {
          fc[f.name] = ["", f.validation];
        }
      });
    }
    fc["created_at"] = [new Date()];
    fc["updated_at"] = [new Date()];
    fc["user_id"] = [localStorage.getItem("userid")];
    fc["updated_by"] = [localStorage.getItem("userid")];

    this.mform = this.formb.group(fc);

    if (this.id) {
      this.ds.currentdata.subscribe((a) => {
        if (Object.keys(a).length > 0) {
          this.mform.controls["created_at"].disable({ onlySelf: true });
          this.mform.controls["user_id"].disable({ onlySelf: true });
          this.form.map((f) => {
            this.mform.controls[f.name].setValue(a[f.name]);
          });
          if (this.form["fbreak"]) {
            this.form["fbreak"].map((f) => {
              this.mform.controls[f.name].setValue(a[f.name]);
            });
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.mform.reset(this.mform.value);
  }

  sendMessage() {
    var data = this.mform.value;
    if (this.mform.valid) {
      this.saveevent.emit(data);
    }
  }

  save_new() {
    if (this.mform.valid) {
      this.saveevent.emit(this.mform.value);
    }
  }
}
