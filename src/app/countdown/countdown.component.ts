import { Component,Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-countdown',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnChanges, OnDestroy {
// Entrada para el tiempo inicial del contador
  @Input() startTime: number = 10;
  // Salida para emitir actualizaciones de progreso
  @Output() progressUpdate = new EventEmitter<number>();
  // Salida para emitir la finalización del contador
  @Output() countdownFinished = new EventEmitter<void>();

  counter: number = 0; // Valor actual del contador
  initialTime: number = 0; // Almacena el tiempo inicial para cálculos
  private timeoutRef: any; // Referencia al temporizador para limpieza

  ngOnInit() {
    this.inicializarContador();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Actualizar automáticamente el contador cuando cambie startTime
    if (changes['startTime'] && !changes['startTime'].isFirstChange()) {
      this.reiniciarContador();
    }
  }

  ngOnDestroy() {
    // Limpiar el temporizador para evitar fugas de memoria
    this.limpiarTimeout();
  }

  // Inicializar el contador
  inicializarContador() {
    this.counter = this.startTime;
    this.initialTime = this.startTime;
    this.iniciarContador();
  }

  // Iniciar el contador usando setTimeout
  iniciarContador() {
    this.limpiarTimeout();
    if (this.counter > 0) {
      this.timeoutRef = setTimeout(() => {
        this.counter--;
        // Calcular el progreso como porcentaje
        const progress = ((this.initialTime - this.counter) / this.initialTime) * 100;
        this.progressUpdate.emit(progress);
        if (this.counter === 0) {
          this.countdownFinished.emit();
        } else {
          this.iniciarContador();
        }
      }, 1000);
    }
  }

  // Reiniciar el contador
  reiniciarContador() {
    this.limpiarTimeout();
    this.inicializarContador();
  }

  // Limpiar el temporizador
  private limpiarTimeout() {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
    }
  }
}
