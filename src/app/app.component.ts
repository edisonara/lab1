import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CountdownComponent } from './countdown/countdown.component';

import { CommonModule } from '@angular/common'; // Importar CommonModule para ngIf

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProgressBarComponent, CountdownComponent,  FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  progress: number = 0; // Progreso para la barra
  countdownFinished: boolean = false; // Indicador de finalización

  // Actualizar el progreso basado en el contador
  actualizarProgreso(progress: number) {
    this.progress = progress;
  }

  // Manejar la finalización del contador
  enContadorFinalizado() {
    this.countdownFinished = true;
    console.log('¡Contador finalizado!');
  }
}
