import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonRadio, IonRadioGroup, IonModal, IonLabel, IonDatetimeButton, IonDatetime, IonIcon, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bed } from 'ionicons/icons';
import { SleepData } from '../data/sleep-data';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-modal-sleepiness',
  templateUrl: './modal-sleepiness.component.html',
  styleUrls: ['./modal-sleepiness.component.scss'],
  standalone: true,
  imports: [FormsModule, IonList, IonRadio, IonRadioGroup, IonModal, IonLabel, IonDatetimeButton, IonDatetime, IonIcon, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea]
})
export class ModalSleepinessComponent  implements OnInit {
  @Input() logCreation!: Date;
  @Input() logText!: string;
  @Input() rating!: number;
  @Input() exists!: boolean;
  
  StanfordSleepinessData = StanfordSleepinessData;
  constructor(private modalController: ModalController) {
    addIcons({bed});
  }

  ngOnInit() {
    console.log("Rating: " + this.rating);
  }

  async close() {
    //console.log(this.logText);
    await this.modalController.dismiss(null, "cancel");
  }

  async save() {
    const data = this.getData();
    await this.modalController.dismiss(data, "save");
  }

  getData() {
    return {
      logCreation: this.logCreation,
      logText: this.logText,
      rating: this.rating,
      exists: true
    }
  }

  
}
