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
export class ModalLogComponent  implements OnInit {
  @Input() logCreation: Date = new Date();
  @Input() logText: string = "placeholder logText";
  @Input() timeStart: Date | undefined;
  @Input() timeEnd: Date | undefined;
  @Input() exists: boolean = false;
  timeStartISO: string = this.convertLocalFromUTC(new Date());
  timeEndISO: string = this.convertLocalFromUTC(new Date());
 
  constructor(private modalController: ModalController) {
    addIcons({closeOutline, partlySunny, moon});
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
    this.timeStart = new Date(this.timeStartISO);
    this.timeEnd = new Date(this.timeEndISO);
  }

  convertISOFromDate() {
    if (this.timeStart) {
      this.timeStartISO = this.convertLocalFromUTC(this.timeStart);
      console.log("time start: " + this.timeStartISO);
    }
    if (this.timeEnd) {
      this.timeStartISO = this.convertLocalFromUTC(this.timeEnd);
      console.log("time end: " + this.timeEndISO);
    }
  }

  convertLocalFromUTC(date: Date) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, -1);
  }

}
