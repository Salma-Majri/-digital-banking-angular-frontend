import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('digital-banking-web');
}
