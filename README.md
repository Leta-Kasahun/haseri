# 🛠️ Haseri - Ethiopian Local Service Marketplace

A centralized web platform connecting Ethiopian customers with skilled, verified technicians for reliable local services. Built to solve the chaos of finding trustworthy service providers through informal channels like Telegram groups and word-of-mouth.

---

## 🔍 The Problem We Solve

In Ethiopia, finding a reliable technician—whether a plumber, electrician, or cleaner—is frustrating. Customers rely on scattered Telegram groups, social media posts, or personal recommendations, with no way to verify skills, see past work, or ensure accountability. Jobs go unfinished, payments are handled informally, and trust is broken on both sides.

On the other hand, skilled technicians struggle to market themselves. They distribute paper flyers, rely on word-of-mouth, or post in chaotic online groups, limiting their visibility and professional growth. There's no centralized way to showcase their certifications, build a reputation, or find consistent work.

**Haseri solves this by creating a single, trusted platform where customers post jobs, browse verified technician profiles, communicate in real-time, pay securely, and leave reviews—all in one place.**

---

## 👥 Features by Actor

### 🔹 For Customers

| Feature | Description |
|---------|-------------|
| Quick Registration | Sign up with email/phone or Google in seconds |
| Post Jobs | Create detailed job posts with category, budget, location, and description |
| Browse & Filter | Search open jobs by category, city, or keyword |
| Verified Technicians | View profiles with ratings, reviews, skills, and verification badges |
| Real-Time Chat | Message technicians directly after job assignment |
| Secure Payments | Pay via Chapa (Telebirr, CBE Birr, Bank) |
| Review System | Leave ratings and feedback after job completion |
| Free Trial | First 3 job posts are completely free |

### 🔹 For Technicians (Providers)

| Feature | Description |
|---------|-------------|
| Professional Profile | Add profile photo, cover image, skills, and work location |
| Document Verification | Upload National ID and professional certificates for admin approval |
| Job Board | Browse available jobs filtered by category and city |
| Apply to Jobs | Submit applications with proposed price and message |
| Real-Time Notifications | Get instant alerts when assigned to jobs |
| Built-in Chat | Communicate with customers without leaving the platform |
| Reputation Building | Earn ratings and reviews from completed jobs |
| Trust Badges | Display verified, top-rated, and experienced badges |

### 🔹 For Admin

| Feature | Description |
|---------|-------------|
| Dashboard Overview | Real-time stats: users, jobs, revenue, pending verifications |
| Technician Approval | Review National ID and certificate documents; approve or reject with reason |
| User Management | View, activate, deactivate, or delete user accounts |
| Category Management | Create, edit, or deactivate job categories |
| Fee Settings | Configure verification and job posting fees |
| Payment Tracking | View all platform revenue and transaction history |
| Notification Center | In-app notifications for important events |

---

## 📸 Screenshots

### Homepage – Public Landing
![image](https://github.com/user-attachments/assets/48046087-ba55-42d4-bb71-51510357b4ce)
*Hero section with top technicians and platform statistics*

---

### Customer Dashboard
![image](https://github.com/user-attachments/assets/7acd1991-91e1-4ca3-bbb9-dd1f54a183a7)
*Personalized dashboard with quick actions and overview*

---

### Customer Job Management
![image](https://github.com/user-attachments/assets/2a62bd61-c1af-4719-8c39-6dc81cb36579)
*View, post, and manage all jobs in one place*

---

### Real-Time Chat
![image](https://github.com/user-attachments/assets/b2ec86c7-9a91-44f0-b44f-fa4feb969885)
*Instant messaging between customers and technicians*

---

### Technician Profile
![image](https://github.com/user-attachments/assets/45de6faf-ed89-403c-8c9d-49f93abc64d5)
*Public profile with skills, rating, reviews, and verification badge*

---

### Admin Dashboard
![image](https://github.com/user-attachments/assets/b616002a-915d-4169-b68d-8c341726266f)
*Complete platform overview with statistics and pending actions*

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, Zustand |
| **Backend** | Pure PHP (Custom MVC), Eloquent ORM |
| **Database** | MySQL |
| **Authentication** | JWT + HTTPOnly Cookies, Google OAuth, Admin OTP |
| **Real-Time** | Pusher |
| **Payments** | Chapa (Telebirr, CBE Birr, Bank Transfer) |
| **Email** | Brevo SMTP |

---

## 🚀 Quick Start

```bash
# Backend
cd server
php -S localhost:8000 -t public

# Frontend
cd frontend
npm install
npm run dev