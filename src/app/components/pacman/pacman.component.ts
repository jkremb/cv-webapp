import { Component, OnInit } from '@angular/core';

interface Pacman {
  x: number;
  y: number;
  angle: number;
  dx: number;
  dy: number;
}

@Component({
  selector: 'app-pacman',
  template: `
    <div *ngFor="let pacman of pacmen" 
         class="pacman" 
         [style.transform]="'translate(' + pacman.x + 'px, ' + pacman.y + 'px) rotate(' + pacman.angle + 'deg)'">
    </div>
  `,
  styles: [`
    .pacman {
      position: fixed;
      width: 30px;
      height: 30px;
      background-image: url('/assets/pacman.gif');
      background-size: contain;
      background-repeat: no-repeat;
      z-index: -1;
      transition: transform 0.05s linear;
      opacity: 0.5;
    }
  `]
})
export class PacmanComponent implements OnInit {
  pacmen: Pacman[] = [];
  private readonly numPacmen = 10;
  private animationFrame: number = 0;

  ngOnInit() {
    this.initializePacmen();
    this.animate();
  }

  private initializePacmen() {
    for (let i = 0; i < this.numPacmen; i++) {
      this.pacmen.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * 360,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4
      });
    }
  }

  private animate() {
    this.pacmen.forEach(pacman => {
      pacman.x += pacman.dx;
      pacman.y += pacman.dy;
      pacman.angle = Math.atan2(pacman.dy, pacman.dx) * 180 / Math.PI;

      // Bounce off walls
      if (pacman.x < 0 || pacman.x > window.innerWidth) pacman.dx *= -1;
      if (pacman.y < 0 || pacman.y > window.innerHeight) pacman.dy *= -1;
    });

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
