import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-callback',
  template: `
    <div *ngIf="success">
      <h1>Payment Successful!</h1>
      <p>Your booking is confirmed.</p>
    </div>
    <div *ngIf="!success">
      <h1>Payment Failed!</h1>
      <p>Please try again.</p>
    </div>
  `
})
export class PaymentCallbackComponent implements OnInit {
  success = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
    });
  }
}
