import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:onbeforeunload', ['$event'])
  title = 'marketplace'
  clearLocalStorage(event) {
    localStorage.clear()
  }

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.authOnRefresh()
    // this.router.navigate(['/products/list'])
  }
}
