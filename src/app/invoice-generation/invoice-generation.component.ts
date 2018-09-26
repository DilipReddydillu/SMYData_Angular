import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-invoice-generation',
  templateUrl: './invoice-generation.component.html',
  styleUrls: ['./invoice-generation.component.css']
})
export class InvoiceGenerationComponent implements OnInit {
  invData:any;
  constructor(private _dataService: DataService, private toastr:ToastsManager) { }

  ngOnInit() {
    this._dataService.invData.subscribe(data =>
      this.invData = data[0]);
      console.log(JSON.stringify(this.invData))
    }
  emailInv(){
    this._dataService.emailInvoice(this.invData.invId).subscribe(
        data => {
            this.toastr.success("Email sent", '',{toastLife: '3000'});
        },
        error => {
            this.toastr.error('Sending failed.', 'Error',{toastLife: '3000'});
        }
    );
  }
  printData()
  {
    let divToPrint = document.getElementById("inv");
    let  newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }
 download(){
     let pdf = new jsPDF('p', 'pt', 'letter');
     pdf.setFontSize(30);
     pdf.text(180, 35, 'INVOICE');
      let source = window.document.getElementById("inv");
      let specialElementHandlers = {
          '#bypassme': function (element, renderer) {
              return true
          }
      };
      let margins = {
          top: 80,
          bottom: 60,
          left: 10,
          width: 700
      };
      pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, { // y coord
          'width': margins.width, // max width of content on PDF
          'elementHandlers': specialElementHandlers
      },

      function (dispose) {
          pdf.save('Test.pdf');
      }, margins);
      }

}
