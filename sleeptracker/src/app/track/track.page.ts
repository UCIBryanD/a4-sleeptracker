import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { ModalLogComponent } from '../modal-log/modal-log.component';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TrackPage implements OnInit {
  time:string = "placeholderTime";
  day:string = "placeholderDate";
  constructor(private modalController: ModalController) {
    this.refreshTime();
    setInterval(() => {
      this.refreshTime();
    }, 1000);
  }

  ngOnInit() {
  }

  refreshTime() {
    const curr_date = new Date()
    this.time = curr_date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    this.day = curr_date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
    console.log(this.time);
  }

  async openModalLog() {
    const modal = await this.modalController.create({
      component: ModalLogComponent,
      componentProps: {
        logText: "fdas"
      }
    });

    modal.present();
  }



}
