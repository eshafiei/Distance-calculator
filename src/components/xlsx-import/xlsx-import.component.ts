import { GeoMatrixService } from './../../services/geo-matrix.service';
import { Component } from '@angular/core';
import { GeoCoderResult } from '../../models/geocoder-result';
import * as XLSX from 'xlsx';
import * as geolib from 'geolib';

@Component({
  selector: 'xlsx-import',
  templateUrl: 'xlsx-import.component.html',
  styleUrls: ['./xlsx-import.component.scss']
})

export class XlsxImportComponent {

  file;
  data;
  private fileInfo: any[] = [];

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  constructor(public _geoMatrixService: GeoMatrixService) {

  }

  handleFile() {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const batchSize = 500;

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 0 }));

      for (let i = 0; i < this.data.length; i++) {

        let element = this.data[i];
        let remaining = this.data.length - (i + 1);

        if (((element.SourceAddress == undefined || String(element.SourceAddress).trim() == "") &&
          (element.SourceZip == undefined || String(element.SourceZip).trim() == "")) &&
          ((element.DestAddress == undefined || String(element.DestAddress).trim() == "") &&
            (element.DestZip == undefined || String(element.DestZip).trim() == ""))) {
          continue;
        }

        if (((element.SourceAddress == undefined || String(element.SourceAddress).trim() == "") &&
          (element.SourceZip == undefined || String(element.SourceZip).trim() == "")) ||
          ((element.DestAddress == undefined || String(element.DestAddress).trim() == "") &&
            (element.DestZip == undefined || String(element.DestZip).trim() == ""))) {
          this.fileInfo.push(element);
          continue;
        }

        this._geoMatrixService.getSourceInfo(element).subscribe((res: GeoCoderResult) => {
          element.SourceLatitude = res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
          element.SourceLongitude = res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
        });

        this._geoMatrixService.getDestInfo(element).subscribe((res: GeoCoderResult) => {
          element.DestLatitude = res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
          element.DestLongitude = res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;

          if (element.SourceLatitude != undefined && element.SourceLongitude != undefined &&
            element.DestLatitude != undefined && element.DestLongitude != undefined) {
            element.DistanceInMeters = geolib.getDistance({ latitude: element.SourceLatitude, longitude: element.SourceLongitude },
              { latitude: element.DestLatitude, longitude: element.DestLongitude });
            element.DistanceInMiles = element.DistanceInMeters * 0.00062137;
          }

          this.fileInfo.push(element);

          if (this.fileInfo.length == batchSize) {
            this.generateFile(this.fileInfo);
            this.fileInfo = [];
          }

          if(remaining == 0){
            this.generateFile(this.fileInfo);
          }
        });

        if(remaining == 0){
          break;
        }
      }

    };

    reader.readAsBinaryString(this.file);
  }

  generateFile(fileInfo) {
    /* make the worksheet */
    var ws = XLSX.utils.json_to_sheet(fileInfo);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "addresses");

    /* generate an XLSX file */
    XLSX.writeFile(wb, "addresses_with_lat_long.xlsx");
  }
}

