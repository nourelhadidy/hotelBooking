import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  template: `<div id="paymob-container"></div>`,
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  room: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.room = history.state.room;
    if (!this.room) {
      this.router.navigate(['/booking']);
      return;
    }
    this.payNow();
  }

  async payNow() {
    try {
      const response = await fetch('http://localhost:5000/create-paymob-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: this.room })
      });


      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);  // 👈 Debug log

      const paymentToken = data.paymentToken;
      if (!paymentToken) throw new Error('Payment token not received');

      const iframeDiv = document.getElementById('paymob-container');
      if (iframeDiv) {
        iframeDiv.innerHTML = `
        <iframe
          src="https://accept.paymobsolutions.com/api/acceptance/iframes/954025?payment_token=${paymentToken}"
          width="100%"
          height="600px"
          frameborder="0"
        ></iframe>
      `;
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert('Failed to initiate payment');
    }
  }
}