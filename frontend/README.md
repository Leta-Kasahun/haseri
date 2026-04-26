
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
haseri_frontend/                        # Root directory
│
├── src/
│   ├── app/                                 # Next.js App Router - routing and layouts only
│   │   ├── (auth)/                          # Authentication route group (no sidebar/navbar)
│   │   │   ├── layout.tsx                   # Centered card layout for auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx                 # Login page for customers & providers
│   │   │   ├── admin/                       # Admin authentication routes
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx             # Admin password login page
│   │   │   │   └── verify-otp/
│   │   │   │       └── page.tsx             # Admin OTP verification page
│   │   │   ├── register/
│   │   │   │   ├── customer/
│   │   │   │   │   └── page.tsx             # Customer registration page
│   │   │   │   └── provider/
│   │   │   │       └── page.tsx             # Provider registration page
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx                 # Email verification token handler
│   │   │   └── forgot-password/
│   │   │       └── page.tsx                 # Password reset request page
│   │   │
│   │   ├── (dashboard)/                     # Protected route group for authenticated users
│   │   │   ├── layout.tsx                   # Dashboard layout with Sidebar, Navbar, role checks
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                 # Role-based dashboard home (stats, charts)
│   │   │   ├── jobs/                        # Jobs section
│   │   │   │   ├── page.tsx                 # Browse/search jobs page
│   │   │   │   ├── post/
│   │   │   │   │   └── page.tsx             # Customer: post a new job
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Job detail page
│   │   │   ├── applications/
│   │   │   │   ├── page.tsx                 # Provider: my applications
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Application detail with proposal
│   │   │   ├── contracts/
│   │   │   │   ├── page.tsx                 # List of user's contracts
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Contract detail, payments, reviews
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx                 # Conversation list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Chat room with messages
│   │   │   ├── notifications/
│   │   │   │   └── page.tsx                 # Notification list with channel management
│   │   │   ├── providers/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Public provider profile
│   │   │   ├── settings/
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx             # Edit profile, photo, bio
│   │   │   │   ├── security/
│   │   │   │   │   └── page.tsx             # Change password, manage sessions
│   │   │   │   └── payment-methods/
│   │   │   │       └── page.tsx             # Manage Telebirr, Bank, Card
│   │   │   └── admin/                       # Admin-only section (after login)
│   │   │       ├── dashboard/
│   │   │       │   └── page.tsx             # Platform stats, users, jobs overview
│   │   │       ├── users/
│   │   │       │   └── page.tsx             # User management table
│   │   │       ├── reports/
│   │   │       │   └── page.tsx             # Report queue for review
│   │   │       ├── categories/
│   │   │       │   └── page.tsx             # Manage service categories
│   │   │       └── audit-logs/
│   │   │           └── page.tsx             # Admin action logs viewer
│   │   │
│   │   ├── (public)/                        # Public pages accessible without authentication
│   │   │   ├── layout.tsx                   # Public layout (Navbar, Footer)
│   │   │   ├── page.tsx                     # Landing page / homepage
│   │   │   └── providers/
│   │   │       └── page.tsx                 # Browse providers catalog
│   │   │
│   │   ├── layout.tsx                       # Root layout (providers, fonts, metadata)
│   │   ├── globals.css                      # Global styles and Tailwind directives
│   │   └── favicon.ico
│   │
│   ├── features/                            # Business logic layer - feature-first architecture
│   │   │
│   │   ├── auth/                            # Authentication & user management
│   │   │   ├── admin/                       # Admin authentication (password + OTP)
│   │   │   │   ├── services/
│   │   │   │   │   ├── admin-auth.api.ts    # Admin login, verify OTP, logout endpoints
│   │   │   │   │   ├── admin-auth.service.ts # Admin auth business logic
│   │   │   │   │   └── index.ts             # Barrel export for admin auth services
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useAdminLogin.ts     # Step 1: password login to get OTP
│   │   │   │   │   ├── useAdminVerifyOtp.ts # Step 2: verify OTP and get token
│   │   │   │   │   ├── useAdminLogout.ts    # Admin logout and clear session
│   │   │   │   │   └── index.ts             # Barrel export for admin auth hooks
│   │   │   │   ├── components/
│   │   │   │   │   ├── AdminLoginForm.tsx   # Password entry form
│   │   │   │   │   ├── AdminOtpInput.tsx    # OTP entry form (6 digits)
│   │   │   │   │   ├── AdminAuthGuard.tsx   # Component to protect admin routes
│   │   │   │   │   └── index.ts             # Barrel export for admin auth components
│   │   │   │   ├── types/
│   │   │   │   │   ├── admin-auth.types.ts  # AdminLoginInput, AdminOtpInput, AdminAuthResponse
│   │   │   │   │   └── index.ts             # Barrel export for admin auth types
│   │   │   │   └── index.ts                 # Barrel export for entire admin auth module
│   │   │   │
│   │   │   ├── user/                        # Regular user authentication (email + password)
│   │   │   │   ├── services/
│   │   │   │   │   ├── user-auth.api.ts     # Register, login, logout, refresh token endpoints
│   │   │   │   │   ├── user-auth.service.ts # User auth business logic
│   │   │   │   │   ├── email.api.ts         # Verify email, resend verification
│   │   │   │   │   ├── password.api.ts      # Forgot password, reset password
│   │   │   │   │   └── index.ts             # Barrel export for user auth services
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useLogin.ts          # Email/password login mutation
│   │   │   │   │   ├── useRegister.ts       # New user registration mutation
│   │   │   │   │   ├── useLogout.ts         # Logout and clear session
│   │   │   │   │   ├── useUser.ts           # Fetch current authenticated user
│   │   │   │   │   ├── useVerifyEmail.ts    # Email verification mutation
│   │   │   │   │   ├── useForgotPassword.ts # Request password reset OTP
│   │   │   │   │   ├── useResetPassword.ts  # Reset password with OTP
│   │   │   │   │   └── index.ts             # Barrel export for user auth hooks
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.tsx        # Email/password login form
│   │   │   │   │   ├── RegisterCustomerForm.tsx
│   │   │   │   │   ├── RegisterProviderForm.tsx
│   │   │   │   │   ├── OTPInput.tsx         # Reusable OTP input for verification
│   │   │   │   │   ├── ForgotPasswordForm.tsx # Reset request form
│   │   │   │   │   ├── ResetPasswordForm.tsx  # New password with OTP form
│   │   │   │   │   ├── AuthGuard.tsx        # Wrapper to protect routes by role
│   │   │   │   │   └── index.ts             # Barrel export for user auth components
│   │   │   │   ├── types/
│   │   │   │   │   ├── user-auth.types.ts   # LoginInput, RegisterInput, AuthResponse
│   │   │   │   │   ├── session.types.ts     # Session, TokenPayload
│   │   │   │   │   └── index.ts             # Barrel export for user auth types
│   │   │   │   └── index.ts                 # Barrel export for entire user auth module
│   │   │   │
│   │   │   └── index.ts                     # Barrel export for entire auth feature
│   │   │
│   │   ├── users/                           # User profile & settings management
│   │   │   ├── services/
│   │   │   │   ├── profile.api.ts           # Get/update profile, upload photo
│   │   │   │   ├── profile.service.ts       # Profile completion calculation
│   │   │   │   ├── session.api.ts           # List/revoke active sessions
│   │   │   │   └── index.ts                 # Barrel export for user services
│   │   │   ├── hooks/
│   │   │   │   ├── useProfile.ts
│   │   │   │   ├── useUpdateProfile.ts
│   │   │   │   ├── useSessions.ts
│   │   │   │   └── index.ts                 # Barrel export for user hooks
│   │   │   ├── components/
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   ├── ProfilePhotoUpload.tsx
│   │   │   │   ├── SessionList.tsx
│   │   │   │   └── index.ts                 # Barrel export for user components
│   │   │   ├── types/
│   │   │   │   ├── profile.types.ts
│   │   │   │   └── index.ts                 # Barrel export for user types
│   │   │   └── index.ts                     # Barrel export for entire users feature
│   │   │
│   │   ├── providers/                       # Provider-specific features
│   │   │   ├── services/
│   │   │   │   ├── provider.api.ts          # Get/update provider profile, bio, resume
│   │   │   │   ├── provider.service.ts      # Availability, earnings calculation
│   │   │   │   ├── provider-stats.api.ts    # Response rate, success rate
│   │   │   │   ├── provider-services.api.ts # Manage offered services
│   │   │   │   └── index.ts                 # Barrel export for provider services
│   │   │   ├── hooks/
│   │   │   │   ├── useProviderProfile.ts
│   │   │   │   ├── useUpdateProvider.ts
│   │   │   │   ├── useProviderStats.ts
│   │   │   │   ├── useProviderServices.ts
│   │   │   │   └── index.ts                 # Barrel export for provider hooks
│   │   │   ├── components/
│   │   │   │   ├── ProviderCard.tsx         # Card for search results
│   │   │   │   ├── ProviderProfile.tsx      # Full provider detail view
│   │   │   │   ├── ProviderStats.tsx        # Stats badges (response rate, rating)
│   │   │   │   ├── ServiceTagList.tsx       # List of services offered
│   │   │   │   ├── ResumeViewer.tsx
│   │   │   │   └── index.ts                 # Barrel export for provider components
│   │   │   ├── types/
│   │   │   │   ├── provider.types.ts
│   │   │   │   ├── provider-stats.types.ts
│   │   │   │   └── index.ts                 # Barrel export for provider types
│   │   │   └── index.ts                     # Barrel export for entire providers feature
│   │   │
│   │   ├── customers/                       # Customer-specific features
│   │   │   ├── services/
│   │   │   │   ├── customer.api.ts          # Get/update customer profile
│   │   │   │   ├── customer-stats.api.ts    # Hiring rate, jobs posted
│   │   │   │   └── index.ts                 # Barrel export for customer services
│   │   │   ├── hooks/
│   │   │   │   ├── useCustomerProfile.ts
│   │   │   │   ├── useCustomerStats.ts
│   │   │   │   └── index.ts                 # Barrel export for customer hooks
│   │   │   ├── components/
│   │   │   │   ├── CustomerProfile.tsx
│   │   │   │   └── index.ts                 # Barrel export for customer components
│   │   │   ├── types/
│   │   │   │   ├── customer.types.ts
│   │   │   │   └── index.ts                 # Barrel export for customer types
│   │   │   └── index.ts                     # Barrel export for entire customers feature
│   │   │
│   │   ├── jobs/                            # Jobs & hiring core marketplace
│   │   │   ├── services/
│   │   │   │   ├── job.api.ts               # CRUD jobs, search, filter
│   │   │   │   ├── job.service.ts           # Budget formatting, status logic
│   │   │   │   ├── application.api.ts       # Apply, withdraw, accept/reject
│   │   │   │   ├── invite.api.ts            # Send/respond to invites
│   │   │   │   └── index.ts                 # Barrel export for job services
│   │   │   ├── hooks/
│   │   │   │   ├── useJobs.ts               # Paginated job list
│   │   │   │   ├── useJob.ts
│   │   │   │   ├── useCreateJob.ts
│   │   │   │   ├── useApplications.ts
│   │   │   │   ├── useApplyToJob.ts
│   │   │   │   ├── useInviteProvider.ts
│   │   │   │   └── index.ts                 # Barrel export for job hooks
│   │   │   ├── components/
│   │   │   │   ├── JobCard.tsx
│   │   │   │   ├── JobList.tsx
│   │   │   │   ├── JobDetail.tsx
│   │   │   │   ├── JobPostForm.tsx
│   │   │   │   ├── ApplicationForm.tsx
│   │   │   │   ├── ApplicationList.tsx
│   │   │   │   ├── InviteProviderModal.tsx
│   │   │   │   ├── JobStatusBadge.tsx
│   │   │   │   └── index.ts                 # Barrel export for job components
│   │   │   ├── types/
│   │   │   │   ├── job.types.ts
│   │   │   │   ├── application.types.ts
│   │   │   │   ├── invite.types.ts
│   │   │   │   └── index.ts                 # Barrel export for job types
│   │   │   └── index.ts                     # Barrel export for entire jobs feature
│   │   │
│   │   ├── contracts/                       # Contracts & agreements
│   │   │   ├── services/
│   │   │   │   ├── contract.api.ts          # Create, update status, complete
│   │   │   │   ├── contract.service.ts      # Status transitions, validation
│   │   │   │   └── index.ts                 # Barrel export for contract services
│   │   │   ├── hooks/
│   │   │   │   ├── useContracts.ts
│   │   │   │   ├── useContract.ts
│   │   │   │   ├── useCreateContract.ts
│   │   │   │   └── index.ts                 # Barrel export for contract hooks
│   │   │   ├── components/
│   │   │   │   ├── ContractCard.tsx
│   │   │   │   ├── ContractDetail.tsx
│   │   │   │   ├── ContractStatusTimeline.tsx
│   │   │   │   ├── ContractActions.tsx      # Accept, complete, dispute buttons
│   │   │   │   └── index.ts                 # Barrel export for contract components
│   │   │   ├── types/
│   │   │   │   ├── contract.types.ts
│   │   │   │   └── index.ts                 # Barrel export for contract types
│   │   │   └── index.ts                     # Barrel export for entire contracts feature
│   │   │
│   │   ├── payments/                        # Payments & transactions
│   │   │   ├── services/
│   │   │   │   ├── payment.api.ts           # Initiate, verify, list payments
│   │   │   │   ├── payment.service.ts       # Commission calculation
│   │   │   │   ├── payment-method.api.ts    # CRUD payment methods
│   │   │   │   └── index.ts                 # Barrel export for payment services
│   │   │   ├── hooks/
│   │   │   │   ├── usePayments.ts
│   │   │   │   ├── useInitiatePayment.ts
│   │   │   │   ├── usePaymentMethods.ts
│   │   │   │   └── index.ts                 # Barrel export for payment hooks
│   │   │   ├── components/
│   │   │   │   ├── PaymentHistory.tsx
│   │   │   │   ├── PaymentMethodForm.tsx
│   │   │   │   ├── PaymentMethodList.tsx
│   │   │   │   ├── CommissionBadge.tsx
│   │   │   │   └── index.ts                 # Barrel export for payment components
│   │   │   ├── types/
│   │   │   │   ├── payment.types.ts
│   │   │   │   ├── payment-method.types.ts
│   │   │   │   └── index.ts                 # Barrel export for payment types
│   │   │   └── index.ts                     # Barrel export for entire payments feature
│   │   │
│   │   ├── reviews/                         # Reviews & trust system
│   │   │   ├── services/
│   │   │   │   ├── review.api.ts            # Create, list reviews
│   │   │   │   ├── review.service.ts        # Rating calculation
│   │   │   │   └── index.ts                 # Barrel export for review services
│   │   │   ├── hooks/
│   │   │   │   ├── useReviews.ts
│   │   │   │   ├── useCreateReview.ts
│   │   │   │   └── index.ts                 # Barrel export for review hooks
│   │   │   ├── components/
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── ReviewForm.tsx
│   │   │   │   ├── StarRating.tsx
│   │   │   │   ├── ReviewList.tsx
│   │   │   │   └── index.ts                 # Barrel export for review components
│   │   │   ├── types/
│   │   │   │   ├── review.types.ts
│   │   │   │   └── index.ts                 # Barrel export for review types
│   │   │   └── index.ts                     # Barrel export for entire reviews feature
│   │   │
│   │   ├── chat/                            # Real-time messaging
│   │   │   ├── services/
│   │   │   │   ├── conversation.api.ts      # List/create conversations
│   │   │   │   ├── message.api.ts           # Send messages, mark read
│   │   │   │   └── index.ts                 # Barrel export for chat services
│   │   │   ├── hooks/
│   │   │   │   ├── useConversations.ts
│   │   │   │   ├── useMessages.ts
│   │   │   │   ├── useSendMessage.ts
│   │   │   │   ├── useUnreadCount.ts
│   │   │   │   └── index.ts                 # Barrel export for chat hooks
│   │   │   ├── components/
│   │   │   │   ├── ConversationList.tsx
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── MessageInput.tsx
│   │   │   │   ├── TypingIndicator.tsx
│   │   │   │   └── index.ts                 # Barrel export for chat components
│   │   │   ├── types/
│   │   │   │   ├── conversation.types.ts
│   │   │   │   ├── message.types.ts
│   │   │   │   └── index.ts                 # Barrel export for chat types
│   │   │   └── index.ts                     # Barrel export for entire chat feature
│   │   │
│   │   ├── notifications/                   # Email & Telegram alerts
│   │   │   ├── services/
│   │   │   │   ├── notification.api.ts      # Fetch, mark read, update channels
│   │   │   │   ├── notification.service.ts  # Channel preference logic
│   │   │   │   └── index.ts                 # Barrel export for notification services
│   │   │   ├── hooks/
│   │   │   │   ├── useNotifications.ts
│   │   │   │   ├── useMarkAsRead.ts
│   │   │   │   ├── useNotificationChannels.ts
│   │   │   │   └── index.ts                 # Barrel export for notification hooks
│   │   │   ├── components/
│   │   │   │   ├── NotificationBell.tsx
│   │   │   │   ├── NotificationList.tsx
│   │   │   │   ├── NotificationItem.tsx
│   │   │   │   ├── ChannelPreferences.tsx
│   │   │   │   └── index.ts                 # Barrel export for notification components
│   │   │   ├── types/
│   │   │   │   ├── notification.types.ts
│   │   │   │   └── index.ts                 # Barrel export for notification types
│   │   │   └── index.ts                     # Barrel export for entire notifications feature
│   │   │
│   │   ├── badges/                          # Gamification & achievements
│   │   │   ├── services/
│   │   │   │   ├── badge.api.ts
│   │   │   │   └── index.ts                 # Barrel export for badge services
│   │   │   ├── hooks/
│   │   │   │   ├── useUserBadges.ts
│   │   │   │   └── index.ts                 # Barrel export for badge hooks
│   │   │   ├── components/
│   │   │   │   ├── BadgeDisplay.tsx
│   │   │   │   ├── BadgeTooltip.tsx
│   │   │   │   └── index.ts                 # Barrel export for badge components
│   │   │   ├── types/
│   │   │   │   ├── badge.types.ts
│   │   │   │   └── index.ts                 # Barrel export for badge types
│   │   │   └── index.ts                     # Barrel export for entire badges feature
│   │   │
│   │   ├── services-catalog/                # Service categories & definitions
│   │   │   ├── services/
│   │   │   │   ├── category.api.ts
│   │   │   │   ├── service.api.ts
│   │   │   │   └── index.ts                 # Barrel export for catalog services
│   │   │   ├── hooks/
│   │   │   │   ├── useCategories.ts
│   │   │   │   ├── useServices.ts
│   │   │   │   └── index.ts                 # Barrel export for catalog hooks
│   │   │   ├── components/
│   │   │   │   ├── CategoryList.tsx
│   │   │   │   ├── ServiceSelector.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   └── index.ts                 # Barrel export for catalog components
│   │   │   ├── types/
│   │   │   │   ├── service.types.ts
│   │   │   │   └── index.ts                 # Barrel export for catalog types
│   │   │   └── index.ts                     # Barrel export for entire services-catalog feature
│   │   │
│   │   ├── location/                        # Location & maps
│   │   │   ├── services/
│   │   │   │   ├── city.api.ts
│   │   │   │   ├── address.api.ts
│   │   │   │   └── index.ts                 # Barrel export for location services
│   │   │   ├── hooks/
│   │   │   │   ├── useCities.ts
│   │   │   │   ├── useAddresses.ts
│   │   │   │   └── index.ts                 # Barrel export for location hooks
│   │   │   ├── components/
│   │   │   │   ├── CitySelector.tsx
│   │   │   │   ├── AddressAutocomplete.tsx
│   │   │   │   └── index.ts                 # Barrel export for location components
│   │   │   ├── types/
│   │   │   │   ├── location.types.ts
│   │   │   │   └── index.ts                 # Barrel export for location types
│   │   │   └── index.ts                     # Barrel export for entire location feature
│   │   │
│   │   ├── admin/                           # Admin-specific features (after login)
│   │   │   ├── services/
│   │   │   │   ├── report.api.ts            # Fetch, review, resolve reports
│   │   │   │   ├── audit-log.api.ts         # Fetch audit logs with filters
│   │   │   │   ├── admin-user.api.ts        # Ban/unban users, manage roles
│   │   │   │   ├── admin.service.ts         # Admin dashboard stats aggregation
│   │   │   │   └── index.ts                 # Barrel export for admin services
│   │   │   ├── hooks/
│   │   │   │   ├── useReports.ts            # Fetch all reports with pagination
│   │   │   │   ├── useReportAction.ts       # Resolve/dismiss report mutation
│   │   │   │   ├── useAuditLogs.ts          # Fetch audit logs
│   │   │   │   ├── useBanUser.ts            # Ban user mutation
│   │   │   │   ├── useUnbanUser.ts          # Unban user mutation
│   │   │   │   ├── useAdminStats.ts         # Fetch dashboard statistics
│   │   │   │   └── index.ts                 # Barrel export for admin hooks
│   │   │   ├── components/
│   │   │   │   ├── ReportQueue.tsx          # Table of pending reports
│   │   │   │   ├── ReportDetail.tsx         # Single report with action buttons
│   │   │   │   ├── AuditLogTable.tsx        # Filterable audit log table
│   │   │   │   ├── AdminStatsCards.tsx      # Overview statistics cards
│   │   │   │   ├── UserManagementTable.tsx  # User list with ban/unban actions
│   │   │   │   ├── CategoryManager.tsx      # CRUD interface for categories
│   │   │   │   └── index.ts                 # Barrel export for admin components
│   │   │   ├── types/
│   │   │   │   ├── report.types.ts          # Report, ReportStatus, ReportAction
│   │   │   │   ├── audit-log.types.ts       # AuditLog, AuditAction
│   │   │   │   ├── admin-stats.types.ts     # AdminDashboardStats
│   │   │   │   └── index.ts                 # Barrel export for admin types
│   │   │   └── index.ts                     # Barrel export for entire admin feature
│   │   │
│   │   └── shared/                          # Shared logic used across multiple features
│   │       ├── services/
│   │       │   ├── errorHandler.ts          # Centralized error handling utility
│   │       │   └── index.ts                 # Barrel export for shared services
│   │       ├── hooks/
│   │       │   ├── useDebounce.ts           # Debounce input values for search
│   │       │   ├── useLocalStorage.ts       # Persist data to localStorage
│   │       │   ├── useMediaQuery.ts         # Responsive breakpoint detection
│   │       │   ├── useGeolocation.ts        # Browser geolocation API
│   │       │   ├── usePusher.ts             # Real-time subscription hook
│   │       │   └── index.ts                 # Barrel export for shared hooks
│   │       ├── components/
│   │       │   ├── LoadingSpinner.tsx       # Centered loading indicator
│   │       │   ├── ErrorBoundary.tsx        # Catch and display React errors
│   │       │   ├── EmptyState.tsx           # Empty data placeholder with icon
│   │       │   ├── ConfirmDialog.tsx        # Reusable confirmation modal
│   │       │   └── index.ts                 # Barrel export for shared components
│   │       ├── types/
│   │       │   ├── shared.types.ts          # PaginationParams, SortOrder, Filter
│   │       │   └── index.ts                 # Barrel export for shared types
│   │       └── index.ts                     # Barrel export for entire shared module
│   │
│   ├── lib/                                 # External library configurations
│   │   ├── api/
│   │   │   ├── client.ts                    # Axios instance with baseURL, headers, auth interceptors
│   │   │   └── index.ts
│   │   ├── query/
│   │   │   ├── queryClient.ts               # TanStack Query client with default config
│   │   │   └── index.ts
│   │   ├── pusher/
│   │   │   ├── pusherClient.ts              # Pusher client for real-time chat/notifications
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── components/
│   ├── ui/                                  # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── index.ts
│   │
│   ├── home/                                # Homepage specific components only
│   │   ├── sections/
│   │   │   ├── CtaSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── TrustedBySection.tsx
│   │   │   └── index.ts
│   │   ├── CookieConsentBanner.tsx
│   │   ├── GoogleQuickAccessCard.tsx
│   │   ├── HomeTemplate.tsx
│   │   ├── Logo.tsx
│   │   └── index.ts
│   │
│   ├── layouts/                             # Only these 3 layouts
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── PublicLayout.tsx
│   │   └── index.ts
│   │
│                           # UI Kit - Atomic design with NO business logic
│   │   ├── atoms/                           # Smallest UI building blocks (single responsibility)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx               # Reusable button with variants (primary, secondary, error)
│   │   │   │   ├── Button.types.ts          # Button props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx                # Reusable input with label and error message
│   │   │   │   ├── Input.types.ts           # Input props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Textarea/
│   │   │   │   ├── Textarea.tsx             # Multi-line text input with label
│   │   │   │   ├── Textarea.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Badge/
│   │   │   │   ├── Badge.tsx                # Small status indicator with color variants
│   │   │   │   ├── Badge.types.ts           # Badge props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Avatar/
│   │   │   │   ├── Avatar.tsx               # User profile image with fallback initials
│   │   │   │   ├── Avatar.types.ts          # Avatar props TypeScript interface
│   │   │   │   └── index.ts
│   │   │   ├── Spinner/
│   │   │   │   ├── Spinner.tsx              # Loading animation indicator
│   │   │   │   └── index.ts
│   │   │   ├── Icon/
│   │   │   │   ├── Icon.tsx                 # Reusable SVG icon wrapper
│   │   │   │   ├── Icon.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts                     # Barrel export for all atoms
│   │   │
│   │   ├── molecules/                       # Combinations of atoms forming simple UI patterns
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx                 # Container with shadow and rounded corners
│   │   │   │   ├── Card.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx                # Overlay dialog with close button
│   │   │   │   ├── Modal.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Table/
│   │   │   │   ├── Table.tsx                # Data table with headers and rows
│   │   │   │   ├── Table.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Select/
│   │   │   │   ├── Select.tsx               # Dropdown select with options
│   │   │   │   ├── Select.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── SearchInput/
│   │   │   │   ├── SearchInput.tsx          # Input with search icon and debounce
│   │   │   │   ├── SearchInput.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── FileUpload/
│   │   │   │   ├── FileUpload.tsx           # Drag and drop file upload area
│   │   │   │   ├── FileUpload.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Tabs/
│   │   │   │   ├── Tabs.tsx                 # Tab navigation component
│   │   │   │   ├── Tabs.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts                     # Barrel export for all molecules
│   │   │
│   │   ├── organisms/                       # Complex UI sections combining multiple molecules
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx              # Main navigation sidebar with menu items
│   │   │   │   ├── SidebarItem.tsx          # Individual navigation link with active state
│   │   │   │   ├── Sidebar.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx               # Top bar with logo, search, user menu, notification bell
│   │   │   │   ├── Navbar.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx               # Site footer with links and copyright
│   │   │   │   ├── Footer.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── EmptyState/
│   │   │   │   ├── EmptyState.tsx           # Empty data placeholder with icon and message
│   │   │   │   ├── EmptyState.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts                     # Barrel export for all organisms
│   │   │
│   │   └── index.ts                         # Barrel export for all UI components
│   │
│   ├── stores/                              # Global state management using Zustand
│   │   ├── authStore.ts                     # Auth state: user, token, role, isAuthenticated
│   │   ├── uiStore.ts                       # UI state: sidebar collapsed, theme mode
│   │   └── index.ts
│   │
│   ├── providers/                           # React Context Providers for app initialization
│   │   ├── AuthProvider.tsx                 # Provides auth state to entire app
│   │   ├── ThemeProvider.tsx                # Provides dark/light theme
│   │   ├── QueryProvider.tsx                # Provides TanStack Query client
│   │   ├── ToastProvider.tsx                # Provides toast notification system
│   │   ├── PusherProvider.tsx               # Provides real-time connection context
│   │   └── index.ts                         # Combines all providers into one
│   │
│   ├── hooks/                               # Global React hooks used across multiple features
│   │   ├── useAuth.ts                       # Access auth state and methods (login, logout)
│   │   ├── useTheme.ts                      # Access theme state and toggle
│   │   ├── useToast.ts                      # Show toast notifications from anywhere
│   │   └── index.ts
│   │
│   ├── utils/                               # Pure utility functions - no React, no side effects
│   │   ├── formatters/
│   │   │   ├── date.ts                      # formatDate, relativeTime, isToday
│   │   │   ├── currency.ts                  # formatCurrency (ETB, USD)
│   │   │   ├── phone.ts                     # formatPhoneNumber (Ethiopian format)
│   │   │   └── index.ts
│   │   ├── validators/
│   │   │   ├── email.ts                     # isValidEmail regex check
│   │   │   ├── phone.ts                     # isValidPhoneNumber for Ethiopia
│   │   │   ├── password.ts                  # isStrongPassword (min 8 chars, etc)
│   │   │   └── index.ts
│   │   ├── helpers/
│   │   │   ├── cn.ts                        # className merger for Tailwind
│   │   │   ├── storage.ts                   # localStorage wrapper with JSON parse/stringify
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── config/                              # Environment and app configuration
│   │   ├── env.ts                           # Zod validation for environment variables
│   │   └── index.ts
│   │
│   ├── constants/                           # Fixed values that never change
│   │   ├── routes.ts                        # API and frontend route paths
│   │   ├── colors.ts                        # Color palette constants
│   │   ├── messages.ts                      # Success and error message templates
│   │   ├── job-status.ts                    # Job status options and display names
│   │   ├── contract-status.ts               # Contract status options and display names
│   │   ├── application-status.ts            # Application status options
│   │   ├── payment-status.ts                # Payment status options
│   │   ├── report-reasons.ts                # Report reason options
│   │   └── index.ts
│   │
│   ├── branding/                            # Design assets and theme tokens
│   │   ├── logos/                           # SkillBridge logo SVG files
│   │   ├── fonts/                           # Custom font files (Inter, Poppins, Noto)
│   │   ├── theme/
│   │   │   └── tokens.ts                    # Design tokens: spacing, radius, shadows
│   │   └── index.ts
│   │
│   ├── types/                               # Global TypeScript interfaces used across features
│   │   ├── api.types.ts                     # ApiResponse<T>, PaginatedResponse<T>, ErrorResponse
│   │   ├── auth.types.ts                    # User, Admin, JwtPayload, Role
│   │   └── index.ts
│   │
│   ├── middleware/                          # Next.js middleware for route protection
│   │   ├── auth.ts                          # Redirect unauthenticated users to login
│   │   ├── admin.ts                         # Restrict admin routes to admin role only
│   │   └── index.ts
│   │
│   └── workers/                             # Web Workers for browser-side background tasks
│       ├── sync.worker.ts                   # Background data sync without blocking UI
│       ├── notification.worker.ts           # Poll for new notifications in background
│       └── index.ts
│
├── public/                                  # Static assets served directly
│   ├── images/                              # Static images (og-image, hero images)
│   ├── fonts/                               # Fallback font files
│   └── icons/                               # Favicon and app icons
│
├── .env.local                               # Local environment variables (not committed)
├── .env.example                             # Example environment variables template
├── .gitignore                               # Git ignore rules
├── package.json                             # Dependencies and scripts
├── tailwind.config.ts                       # Tailwind CSS configuration (colors, fonts)
├── tsconfig.json                            # TypeScript compiler options
├── next.config.ts                           # Next.js configuration (rewrites, images)
├── postcss.config.js                        # PostCSS configuration for Tailwind
└── README.md                                # Project documentation
```