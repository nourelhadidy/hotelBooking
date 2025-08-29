import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  submitForm(name: string, email: string, message: string) {
    // Here you can send the form data to a backend API
    console.log({ name, email, message });
    alert(`Thank you, ${name}! Your message has been received.`);

    // ✅ Clear the console after showing alert
    console.clear();
  }

}
