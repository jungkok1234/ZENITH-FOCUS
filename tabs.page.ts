import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  sunny, 
  timer, 
  checkbox, 
  person,
  play,
  pause,
  refresh,
  water,
  book,
  leaf,
  barbell,
  create,
  moon,
  star,
  flame,
  checkmarkCircle,
  logOut,
  notifications,
  volumeHigh,
  arrowForward,
  lockClosed
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class TabsPage {
  constructor() {
    addIcons({
      'sunny': sunny,
      'timer': timer,
      'checkbox': checkbox,
      'person': person,
      'play': play,
      'pause': pause,
      'refresh': refresh,
      'water': water,
      'book': book,
      'leaf': leaf,
      'barbell': barbell,
      'create': create,
      'moon': moon,
      'star': star,
      'flame': flame,
      'checkmark-circle': checkmarkCircle,
      'log-out': logOut,
      'notifications': notifications,
      'volume-high': volumeHigh,
      'arrow-forward': arrowForward,
      'lock-closed': lockClosed
    });
  }
}