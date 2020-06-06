import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private formdata = new BehaviorSubject({});
  currentdata = this.formdata.asObservable();
  constructor() { }
  changedata(data) {
    this.formdata.next(data);
  }
}
