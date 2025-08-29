import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService, BookingData } from '../services/booking.service';
import { AuthService } from '../services/auth.service'; // ✅ Import AuthService

// Interface for a Room object
interface Room {
  _id: string;
  type: string;
  description: string;
  pricePerNight: number;
  totalPrice?: number;
  nights?: number;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  // --- Component Properties ---
  searchForm!: FormGroup;
  searchingRooms = false;
  availableRooms: Room[] = [];
  selectedRoom: Room | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService // ✅ Inject AuthService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSearchRooms(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.searchingRooms = true;
    this.availableRooms = [];
    this.selectedRoom = null;

    setTimeout(() => {
      const dummyRooms: Room[] = [
        { _id: '60d21b4667d0d8992e610c85', type: 'Single', description: 'Perfect for solo travelers.', pricePerNight: 80 },
        { _id: '60d21b4667d0d8992e610c86', type: 'Double', description: 'Great for couples.', pricePerNight: 120 },
        { _id: '60d21b4667d0d8992e610c87', type: 'Suite', description: 'Luxury stay with amenities.', pricePerNight: 200 }
      ];

      const { checkIn, checkOut } = this.searchForm.value;
      const nights = this.calculateNights(checkIn, checkOut);

      this.availableRooms = dummyRooms.map(room => ({
        ...room,
        nights,
        totalPrice: nights > 0 ? room.pricePerNight * nights : room.pricePerNight
      }));

      this.searchingRooms = false;
    }, 1000);
  }

  selectRoom(room: Room): void {
    this.selectedRoom = room;
  }

  /**
   * ✅ This is the corrected booking flow.
   * It gets the real ID of the logged-in user before creating the booking.
   */
  confirmBooking(): void {
    if (!this.selectedRoom) {
      alert('Please select a room first');
      return;
    }

    // ✅ Step 1: Get the ID of the currently logged-in user.
    const userId = this.authService.getLoggedInUserId();

    // ✅ Step 2: Check if a user is actually logged in.
    if (!userId) {
      alert('You must be logged in to make a booking.');
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return;
    }

    // Step 3: Construct the booking data with the REAL user ID.
    const bookingData = {
      userId: userId, // Use the real user ID from the token
      roomId: this.selectedRoom._id,
      checkIn: this.searchForm.get('checkIn')?.value,
      checkOut: this.searchForm.get('checkOut')?.value,
      price: this.selectedRoom.totalPrice || 0
    };

    // Step 4: Call the service to create the booking.
    this.bookingService.createBooking(bookingData).subscribe({
      next: (res: any) => {
        alert(`✅ ${res.message || 'Booking confirmed successfully!'}`);
        this.router.navigate(['/dashboard']); // Navigate to the user's dashboard
      },
      error: (err) => {
        console.error("Booking creation error:", err);
        const errorMessage = err.error?.error || 'Failed to confirm booking.';
        alert(`❌ ${errorMessage}`);
      }
    });
  }

  private calculateNights(checkIn: string, checkOut: string): number {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1;
  }
}

