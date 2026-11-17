import { Component, Input, OnInit } from '@angular/core';
import { IonDatetimeButton, IonDatetime, IonIcon, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-log',
  templateUrl: './modal-log.component.html',
  styleUrls: ['./modal-log.component.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonDatetime, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonTextarea, IonItem]
})
export class ModalLogComponent  implements OnInit {
  @Input() logText: string = "";
  @Input() timeStart: Date | undefined;
  @Input() timeEnd: Date | undefined;

  constructor(private modalController: ModalController) {
    addIcons({closeOutline});
  }
  async close() {
    await this.modalController.dismiss();
  }
  ngOnInit() {}

}
