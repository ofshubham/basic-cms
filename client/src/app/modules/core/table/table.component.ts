import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from "../../../services/global.service";
import { DatatableService } from "../../../services/datatable.service";

declare var $;

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input("tabledata") tabledata: any;
  @Output() btnaction = new EventEmitter<any>();
  defaultContent = [];

  constructor(
    private service: GlobalService,
    private dt: DatatableService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    var _self = this;
    this.tabledata.buttons.forEach((element) => {
      var h =
        '<button  title="' +
        element.title +
        '" class="' +
        element.class +
        '" data-type="' +
        element.type +
        '"><i class="' +
        element.icon +
        '"></i></button> ';
      this.defaultContent.push(h);
    });
    $(() => {
      var table = $("#mytableid").DataTable({
        fnRowCallback: function (
          nRow,
          aData,
          iDisplayIndex,
          iDisplayIndexFull
        ) {
          var l = aData.length - 2;
          switch (aData[l]) {
            case "<span>Active</span>":
              $(nRow).addClass("active-datatable");
              break;
            case "<span>Deactive</span>":
              $(nRow).addClass("deactive-datatable");
              break;
          }
        },
        searching: false,
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
          url: _self.service.apiUrl + _self.tabledata.modulename + "?dest=cms",
          data: {},
          type: "GET",
          headers: { Authorization: "Bearer " + _self.service.token },
        },
        columnDefs: [
          {
            targets: -1,
            data: null,
            defaultContent: _self.defaultContent.join(" "),
          },
        ],
      });
      $("#mytableid tbody").on("click", "button", function () {
        if ($(this).data("type") == "delete") {
          if (confirm("Are you sure to delete it ?")) {
            var data = {
              type: $(this).data("type"),
              data: table.row($(this).parents("tr")).data(),
              index: table.row($(this).parents("tr")).index(),
            };
            _self.sendMessage(data);
            _self.dt.cdatatable.subscribe((a) => {
              table.ajax.reload();
            });
          }
        } else {
          var data = {
            type: $(this).data("type"),
            data: table.row($(this).parents("tr")).data(),
            index: table.row($(this).parents("tr")).index(),
          };
          _self.sendMessage(data);
          table.ajax.reload();
        }
      });

      $("#fil").on("change", function () {
        table.ajax.reload();
      });
      $("#filter").on("change", function () {
        table.ajax.reload();
      });
      $("#catFilter").on("change", function () {
        table.ajax.reload();
      });
    });
  }

  sendMessage(data) {
    this.btnaction.emit(data);
  }
}
