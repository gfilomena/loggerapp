import { Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../log.service';
import { MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css']
})
export class ParserComponent implements OnInit {

  private currentschema = new Array();
  private list = new Array();
  private data;
  private file: any;
  
  displayedColumns: string[] = ['c_ip', 'fqdn', 'counter'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private logservice: LogService) { }

  ngOnInit() {

  }

  loadlocalfile() {
    this.logservice.getLog()
      .subscribe(res => {
        this.data = res;
        const lines = this.data.split("\n");
        this.load(lines);
      }, err => {
        console.log(err);
      });
  }

  load(lines) {
    this.list = [];
    let index_fields;
    //console.log('lines:', lines);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].substring(0, 8) == '#Fields:') {
        //define current schema
        this.currentschema = lines[i].split(' ');
        this.currentschema.shift();
        // find the line with fields to retrieve
        index_fields = this.currentschema.findIndex(item => item === 'c-ip');
      } else if (lines[i][0] == '#') {
        //skip useless line
      } else {
        //retrieve valid values
        let arrval = lines[i].split(' ');
        if (arrval[index_fields] != undefined && ValidateIPaddress(arrval[index_fields])) {
          let index = this.list.findIndex(x => x.c_ip === arrval[index_fields]);
          if (index > -1) {
            this.list[index].counter++;
          } else {
            let fqdn = arrval[index_fields];
            this.list.push({ c_ip: arrval[index_fields], fqdn: fqdn, counter: 1 })
          }
        }
      }
    }
    //console.log('this.list :', this.list);
    this.reverseIP(this.list);

  }

  reverseIP(list) {
    this.logservice.getFqdn(list)
      .subscribe((res: Object[]) => {
        //update with the relative FQDN
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });
  }


  fileUpload(e) {
    this.file = e.target.files[0];
    //console.log('this.file', this.file);
    this.uploadDocument(this.file);
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      const lines = fileReader.result.toString().split("\n");
      this.load(lines);
    }
  }

}


function ValidateIPaddress(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return true;
  }
  return false;
}


