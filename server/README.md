```bash
server/
├── public/
│   ├── index.php
│   └── .htaccess
│
├── bootstrap/
│   └── app.php
│
├── src/
│   ├── Core/
│   │   ├── Application.php
│   │   ├── Router.php
│   │   └── Database.php
│   │
│   ├── Config/
│   │   ├── app.php
│   │   ├── database.php
│   │   ├── cors.php
│   │   ├── chapa.php
│   │   └── upload.php
│   │
│   ├── Routes/
│   │   ├── api.php
│   │   ├── auth.php
│   │   ├── admin.php
│   │   ├── customer.php
│   │   ├── technician.php
│   │   ├── jobs.php
│   │   ├── payments.php
│   │   ├── reviews.php
│   │   └── notifications.php
│   │
│   ├── Shared/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Admin.php
│   │   │   ├── AdminOtp.php
│   │   │   ├── RefreshToken.php
│   │   │   ├── Address.php
│   │   │   ├── CustomerVerification.php
│   │   │   ├── TechnicianVerification.php
│   │   │   ├── Payment.php
│   │   │   ├── JobCategory.php
│   │   │   ├── Job.php
│   │   │   ├── JobApplication.php
│   │   │   ├── Review.php
│   │   │   └── Notification.php
│   │   │
│   │   ├── Helpers/
│   │   │   ├── JWT.php
│   │   │   ├── Response.php
│   │   │   ├── Cookie.php
│   │   │   ├── ValidationHelper.php
│   │   │   ├── EmailHelper.php
│   │   │   ├── CorsHelper.php
│   │   │   └── Upload/
│   │   │       ├── FileUploader.php
│   │   │       └── ImageUploader.php
│   │   │
│   │   ├── Exceptions/
│   │   │   ├── HttpException.php
│   │   │   ├── BadRequestException.php
│   │   │   ├── UnauthorizedException.php
│   │   │   ├── ForbiddenException.php
│   │   │   ├── NotFoundException.php
│   │   │   ├── ConflictException.php
│   │   │   ├── ValidationException.php
│   │   │   ├── TooManyRequestsException.php
│   │   │   └── InternalServerErrorException.php
│   │   │
│   │   ├── Enums/
│   │   │   ├── UserRole.php
│   │   │   ├── PaymentType.php
│   │   │   ├── JobStatus.php
│   │   │   ├── VerificationStatus.php
│   │   │   ├── ApplicationStatus.php
│   │   │   ├── DocumentType.php
│   │   │   └── NotificationType.php
│   │   │
│   │   ├── Traits/
│   │   │   ├── Notifiable.php
│   │   │   └── HasLocation.php
│   │   │
│   │   └── Services/
│   │       └── TrustScoreService.php
│   │
│   └── Modules/
│       ├── Auth/
│       │   ├── Controllers/
│       │   │   ├── RegisterController.php
│       │   │   ├── LoginController.php
│       │   │   ├── GoogleAuthController.php
│       │   │   ├── ForgotPasswordController.php
│       │   │   ├── ResetPasswordController.php
│       │   │   └── AdminAuthController.php
│       │   ├── Services/
│       │   │   ├── RegisterService.php
│       │   │   ├── LoginService.php
│       │   │   ├── AdminAuthService.php
│       │   │   ├── ForgotPasswordService.php
│       │   │   └── ResetPasswordService.php
│       │   ├── Requests/
│       │   │   ├── RegisterRequest.php
│       │   │   ├── LoginRequest.php
│       │   │   ├── VerifyIdentityRequest.php
│       │   │   ├── ResetPasswordRequest.php
│       │   │   ├── AdminLoginRequest.php
│       │   │   └── AdminOtpRequest.php
│       │   ├── Middleware/
│       │   │   └── AuthMiddleware.php
│       │   └── Resources/
│       │
│       ├── Customer/
│       │   ├── Controllers/
│       │   │   └── CustomerController.php
│       │   ├── Services/
│       │   │   └── CustomerService.php
│       │   ├── Requests/
│       │   │   └── UpdateProfileRequest.php
│       │   └── Resources/
│       │       └── CustomerResource.php
│       │
│       ├── Technician/
│       │   ├── Controllers/
│       │   │   ├── TechnicianController.php
│       │   │   └── TechnicianVerificationController.php
│       │   ├── Services/
│       │   │   ├── TechnicianService.php
│       │   │   └── TechnicianVerificationService.php
│       │   ├── Repositories/
│       │   │   └── TechnicianRepository.php
│       │   ├── Requests/
│       │   │   └── TechnicianVerificationRequest.php
│       │   └── Resources/
│       │       └── TechnicianResource.php
│       │
│       ├── Jobs/
│       │   ├── Controllers/
│       │   │   ├── JobController.php
│       │   │   └── JobApplicationController.php
│       │   ├── Services/
│       │   │   ├── JobService.php
│       │   │   └── JobApplicationService.php
│       │   ├── Repositories/
│       │   │   └── JobRepository.php
│       │   ├── Requests/
│       │   │   ├── CreateJobRequest.php
│       │   │   └── ApplicationRequest.php
│       │   └── Resources/
│       │       ├── JobResource.php
│       │       └── JobCollection.php
│       │
│       ├── Payments/
│       │   ├── Controllers/
│       │   │   └── PaymentController.php
│       │   └── Services/
│       │       ├── PaymentService.php
│       │       └── ChapaService.php
│       │
│       ├── Reviews/
│       │   ├── Controllers/
│       │   │   └── ReviewController.php
│       │   ├── Services/
│       │   │   └── ReviewService.php
│       │   └── Requests/
│       │       └── CreateReviewRequest.php
│       │
│       ├── Notifications/
│       │   ├── Controllers/
│       │   │   └── NotificationController.php
│       │   └── Services/
│       │       └── NotificationService.php
│       │
│       └── Admin/
│           ├── Controllers/
│           │   ├── VerificationController.php
│           │   ├── JobApprovalController.php
│           │   └── DashboardController.php
│           ├── Services/
│           └── Requests/
│
├── storage/
│   ├── logs/
│   ├── uploads/
│   │   ├── ids/
│   │   ├── documents/
│   │   ├── profiles/
│   │   └── jobs/
│   └── cache/
│
├── database/
│   ├── migrations/
│   │   ├── 001_create_users_table.php
│   │   ├── 002_create_admins_table.php
│   │   ├── 003_create_admin_otps_table.php
│   │   ├── 004_create_refresh_tokens_table.php
│   │   ├── 005_create_addresses_table.php
│   │   ├── 006_create_customer_verifications_table.php
│   │   ├── 007_create_technician_verifications_table.php
│   │   ├── 008_create_payments_table.php
│   │   ├── 009_create_job_categories_table.php
│   │   ├── 010_create_jobs_table.php
│   │   ├── 011_create_job_applications_table.php
│   │   ├── 012_create_reviews_table.php
│   │   └── 013_create_notifications_table.php
│   └── migrate.php
│
├── .env
├── .gitignore
├── composer.json
└── composer.lock
```