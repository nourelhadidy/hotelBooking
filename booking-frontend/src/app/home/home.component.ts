import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rooms = [
    { id: 1, name: 'single room', price: 700, image: 'https://i.pinimg.com/736x/e6/30/db/e630db9e931df9ea09a6090cf5dbfa89.jpg' },
    { id: 2, name: 'double room', price: 1000, image: 'https://i.pinimg.com/1200x/e5/0e/e3/e50ee32f66632f70d3658f421f41b052.jpg' },
    { id: 3, name: 'vip room', price: 1500, image: 'https://i.pinimg.com/1200x/60/56/be/6056be407732f723aef475ad5310d149.jpg' }
  ];

  constructor(private router: Router) { }


  // Navigate to booking page
  goToBooking(roomId?: number) {
    if (roomId) {
      this.router.navigate(['/login', roomId]);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
