import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
