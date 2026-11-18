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
  @Input() logText: string = "placeholder logText";
  @Input() timeStart: Date | undefined;
  @Input() timeEnd: Date | undefined;
  @Input() exists: boolean = false;
  timeStartISO: string = "placeholder timeStart";
  timeEndISO: string = "placeholder timeEnd";
 
  constructor(private modalController: ModalController) {
    addIcons({closeOutline, partlySunny, moon});
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
    return {
      logText: this.logText,
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
      exists: this.exists
    }
  }

  convertDateFromISO() {
    this.timeStart = new Date(this.timeStartISO);
    this.timeEnd = new Date(this.timeEndISO);
  }

  convertISOFromDate() {
    if (this.timeStart) {
      this.timeStartISO = this.timeStart.toISOString();
      console.log("time start: " + this.timeStartISO);
    }
    if (this.timeEnd) {
      this.timeStartISO = this.timeEnd.toISOString();
      console.log("time start: " + this.timeEndISO);
    }
  }

  ngOnInit() {}

}
