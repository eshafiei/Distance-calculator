import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import { ExcelRecord } from '../models/excel-record';
import { environment } from '../environments/environment';

@Injectable()
export class GeoMatrixService {

  constructor(private http: HttpClient) {
  }

  getSourceInfo(element) {
    let address = "";

    if (element.SourceAddress != undefined) {
      address += element.SourceAddress;
    }

    if (element.SourceZip != undefined) {
      address == "" ? address += element.SourceZip : address += "+" + element.SourceZip;
    }

    if (address != "") {
      address += "+united+states";
      address = address.replace(" ", "+");

      return this.http.get('https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=' + environment.hereGeoApi.appId + '&app_code=' +
        environment.hereGeoApi.appCode + '&searchtext=' + address);
    }
  }

  getDestInfo(element) {
    let address = "";

    if (element.DestAddress != undefined) {
      address += element.DestAddress;
    }

    if (element.DestZip != undefined) {
      address == "" ? address += element.DestZip : address += "+" + element.DestZip;
    }

    if (address != "") {
      address += "+united+states";
      address = address.replace(" ", "+");

      return this.http.get('https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=' + environment.hereGeoApi.appId + '&app_code=' +
        environment.hereGeoApi.appCode + '&searchtext=' + address);
    }
  }
}
