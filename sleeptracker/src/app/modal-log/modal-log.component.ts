import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonLabel, IonDatetimeButton, IonDatetime, IonIcon, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, partlySunny, moon } from 'ionicons/icons';

@Component({
  selector: 'app-modal-log',
  templateUrl: './modal-log.component.html',
  styleUrls: ['./modal-log.component.scss'],
  standalone: true,
  imports: [FormsModule, IonModal, IonLabel, IonDatetimeButton, IonDatetime, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonTextarea, IonItem]
})
export class ModalLogComponent implements OnInit {
  @Input() logCreation!: Date;
  @Input() logText!: string;
  @Input() timeStart!: Date;
  @Input() timeEnd!: Date;
  @Input() exists!: boolean;
  timeStartISO: string | undefined;//this.convertSingleISOFromDate(this.timeStart);
  timeEndISO: string | undefined;//this.convertSingleISOFromDate(this.timeEnd);
 
  constructor(private modalController: ModalController) {
    addIcons({closeOutline, partlySunny, moon});
    console.log("CONSTRUCTOR SAYS: " + this.timeStart);
  }

  ngOnInit() {
    this.convertISOFromDate();
  }

  async close() {
    //console.log(this.logText);
    await this.modalController.dismiss(null, "cancel");
  }

  async saveHistoryData() {
    const data = this.getHistoryData();
    await this.modalController.dismiss(data, "save");
  }

  getHistoryData() {
    this.convertDateFromISO();
    return {
      logCreation: this.logCreation,
      logText: this.logText,
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
      exists: true
    }
  }

  convertDateFromISO() {
    if (this.timeStartISO) {this.timeStart = new Date(this.timeStartISO);}
    if (this.timeEndISO) {this.timeEnd = new Date(this.timeEndISO);}
  }

  convertISOFromDate() {
    console.log("Start Time: " + this.timeStart);
    if (this.timeStart) {
      //console.log(this.timeStart);
      this.timeStartISO = this.convertLocalFromUTC(this.timeStart);
      console.log("time start: " + this.timeStartISO);
    }
    if (this.timeEnd) {
      this.timeEndISO = this.convertLocalFromUTC(this.timeEnd);
      console.log("time end: " + this.timeEndISO);
    }
  }

  convertLocalFromUTC(date: Date) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, -1);
  }

  convertSingleISOFromDate(date: Date | undefined) {
    if (date) {
      console.log("CONVERSION FROM GIVEN DATE");
      return this.convertLocalFromUTC(date);
    }
    console.log("THE DATE ISENT REAL???");
    return this.convertLocalFromUTC(new Date());
  }

}
