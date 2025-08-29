# Hotel Booking Application

## Project Overview
The **Hotel Booking Application** is a full-stack web application for hotel management and online bookings. Users can browse hotels, view amenities, make bookings, manage their profile, and administrators can manage rooms, bookings, and analytics.  

Built with **Angular** (frontend) and **Node.js + Express + MongoDB** (backend), this project provides a scalable, maintainable, and user-friendly system for hotel management.

---

## Features

### Frontend (Angular)
- Responsive UI for desktop and mobile.
- Home page with hotel listings and highlights.
### Authentication
- **User Registration:** Users can create accounts with email, password, and personal details.
- **User Login:** Secure login using email and password.
- **JWT Authentication:** Protect routes and maintain user sessions.
- **Admin Authentication:** Admins log in to access admin dashboard and management features.
- Passwords are hashed and stored securely.
- **User Dashboard**
  - View all personal details.
  - View all bookings and their status.
  - **Booking Functionality**
  - Select rooms, dates, and number of guests.
  - Confirm bookings and view booking details.
- **Admin Dashboard**
  - Manage rooms, bookings, and users.
  - View analytics and dashboard statistics.
- Extra Website Pages:
  - **Dining:** Available restaurants and menus.
  - **Spa:** Spa services and booking options.
  - **About Us:** Company info, history, and contact details.
- Contact page for inquiries.
- Single Page Application (SPA) routing.

### Backend (Node.js + Express + MongoDB)
- RESTful API endpoints:
  - `/api/auth` – User authentication (login/register)
  - `/api/user` – User profile and bookings
  - `/api/admin` – Admin management
  - `/api/rooms` – Room management
  - `/api/bookings` – Booking management
  - `/api/dashboard` – user statistics & history
- MongoDB for persistent storage.
- CORS enabled for frontend-backend communication.
- JWT authentication for secure login.
- Environment configuration via `.env`.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular, TypeScript, HTML, CSS |
| Backend | Node.js, Express.js, JavaScript |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend), Vercel / Railway / Render (backend) |
| Authentication | JWT (JSON Web Tokens) |
| Environment Config | dotenv |

---


## API endpoints
| Endpoint             | Method              | Description                       |
| -------------------- | ------------------- | --------------------------------- |
| `/api/auth/register` | POST                | Register a new user               |
| `/api/auth/login`    | POST                | User login                        |
| `/api/user`          | GET                 | Get user details                  |
| `/api/admin`         | GET/POST/PUT/DELETE | Manage users, rooms, and bookings |
| `/api/rooms`         | GET                 | Get all rooms                     |
| `/api/rooms`         | POST                | Admin: add new room               |
| `/api/bookings`      | POST                | Create a booking                  |
| `/api/bookings`      | GET                 | Get user bookings                 |
| `/api/dashboard`     | GET                 | Admin statistics                  |

## Contributors
Nour Atef Elhadidy – Full-stack developer


