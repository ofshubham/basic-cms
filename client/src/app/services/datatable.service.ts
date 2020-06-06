import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private datatable = new BehaviorSubject('Dashboard');
  cdatatable = this.datatable.asObservable();
  constructor() { }

  changedatatable(data) {
    //console.log(data);
    this.datatable.next(data);
  }
  
}
