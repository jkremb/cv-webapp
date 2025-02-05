import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHeaderVisible = true;
  lastScrollPosition = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScroll = window.pageYOffset;
    this.isHeaderVisible = currentScroll < this.lastScrollPosition || currentScroll < 50;
    this.lastScrollPosition = currentScroll;
  }
}
