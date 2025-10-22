# Admin Panel Implementation Plan

## Overview

Create an admin panel that allows super users to manage users' waitlist status and export waitlisted emails.

## Database Structure Analysis

Based on the existing database structure, we have:

- `users` table with fields:
  - `id` (uuid) - primary key
  - `email` (string) - user email
  - `full_name` (string) - user's full name
  - `waitinglist` (boolean) - current waitlist status
  - `super_user` (boolean) - admin access flag
  - `created_at` (timestamp) - user creation date
  - Other fields for billing, quotas, etc.

## Authentication & Authorization

### Super User Access

- Check `super_user` field in users table
- Create middleware to protect admin routes
- Redirect non-super users to appropriate page

### Implementation:

1. **Server-side check**: Verify super_user status in page component
2. **Middleware protection**: Add admin route protection
3. **Database queries**: Use supabaseAdmin for admin operations (bypasses RLS)

## Admin Panel Features

### 1. User Management Table

**Requirements:**

- Display all users in a paginated table
- Show relevant user information
- Allow toggling waitlist status

**Table Columns:**

- Full Name
- Email
- Created Date
- Waitlist Status (toggle)
- User Type
- Last Sign In
- Actions

**Functionality:**

- Sortable columns
- Search functionality
- Pagination (20 users per page)
- Real-time status updates

### 2. Waitlist Toggle

**Requirements:**

- Toggle waitinglist field for individual users
- Immediate UI feedback
- Server-side validation
- Optimistic updates

**Implementation:**

- Server action for updating waitlist status
- Toast notifications for success/error
- Optimistic UI updates
- Revalidation after update

### 3. Email Export Feature

**Requirements:**

- Text box showing emails of waitlisted users
- Copy to clipboard functionality
- Comma-separated format
- Auto-refresh when waitlist status changes

**Implementation:**

- Server-side query for waitlisted users
- Client-side copy functionality
- Real-time updates using React state
- Format: `email1@example.com, email2@example.com, email3@example.com`

## Technical Implementation

### File Structure

```
app/admin/
├── page.tsx (main admin page)
├── components/
│   ├── UserTable.tsx
│   ├── WaitlistToggle.tsx
│   ├── EmailExporter.tsx
│   └── AdminHeader.tsx
├── actions/
│   └── admin-actions.ts
└── types/
    └── admin-types.ts
```

### Components Architecture

#### 1. AdminPage (page.tsx)

- **Purpose**: Main admin page component
- **Features**:
  - Super user authentication check
  - Layout and composition of child components
  - Error boundaries

#### 2. UserTable Component

- **Purpose**: Display and manage users
- **Features**:
  - Server-side data fetching
  - Pagination with search params
  - Sortable columns
  - Search functionality
  - Loading states

#### 3. WaitlistToggle Component

- **Purpose**: Toggle individual user waitlist status
- **Features**:
  - Optimistic updates
  - Server actions
  - Error handling
  - Loading states

#### 4. EmailExporter Component

- **Purpose**: Display and copy waitlisted emails
- **Features**:
  - Dynamic email list generation
  - Copy to clipboard
  - Auto-refresh on data changes
  - Format validation

### Server Actions

#### 1. toggleUserWaitlist

```typescript
async function toggleUserWaitlist(userId: string, currentStatus: boolean);
```

- Update user waitlist status
- Return success/error response
- Use supabaseAdmin for admin privileges

#### 2. fetchAllUsers

```typescript
async function fetchAllUsers(page: number, search?: string, sortBy?: string);
```

- Fetch paginated users list
- Support search and sorting
- Return user data with pagination info

#### 3. fetchWaitlistedEmails

```typescript
async function fetchWaitlistedEmails();
```

- Fetch all users where waitinglist = true
- Return comma-separated email string
- Use for export functionality

### UI/UX Design

#### Layout

- **Header**: Admin panel title and user info
- **Main Content**: Split into two sections:
  - **Top Section**: User management table (70% height)
  - **Bottom Section**: Email export area (30% height)

#### Styling (Tailwind CSS)

- **Table**: `bg-white shadow-sm border border-gray-200 rounded-lg`
- **Toggle Buttons**: `bg-green-500 hover:bg-green-600` (active) / `bg-gray-300 hover:bg-gray-400` (inactive)
- **Export Section**: `bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300`
- **Copy Button**: `bg-blue-500 hover:bg-blue-600 text-white`

#### Responsive Design

- **Desktop**: Full table with all columns
- **Tablet**: Hide less critical columns
- **Mobile**: Card-based layout instead of table

### Error Handling

#### Client-Side

- Toast notifications for actions
- Loading states for all async operations
- Fallback UI for errors
- Retry mechanisms

#### Server-Side

- Proper error responses
- Logging for debugging
- Validation before database operations
- Graceful degradation

### Security Considerations

#### Access Control

- Super user validation on every request
- Server-side permission checks
- Protect against unauthorized access

#### Data Protection

- Use supabaseAdmin responsibly
- Sanitize all inputs
- Rate limiting for admin actions
- Audit logging for admin operations

## Implementation Steps

### Phase 1: Authentication & Basic Structure

1. ✅ Create admin route protection
2. ✅ Set up basic admin page structure
3. ✅ Implement super user check
4. ✅ Create basic layout

### Phase 2: User Management Table

1. ✅ Create UserTable component
2. ✅ Implement server-side data fetching
3. ✅ Add pagination and search
4. ✅ Style with Tailwind CSS

### Phase 3: Waitlist Toggle

1. ✅ Create WaitlistToggle component
2. ✅ Implement server action for updates
3. ✅ Add optimistic updates
4. ✅ Error handling and feedback

### Phase 4: Email Export

1. ✅ Create EmailExporter component
2. ✅ Implement email fetching logic
3. ✅ Add copy to clipboard functionality
4. ✅ Auto-refresh on data changes

### Phase 5: Polish & Testing

1. ✅ Add loading states
2. ✅ Implement error boundaries
3. ✅ Mobile responsiveness
4. ✅ Performance optimization
5. ✅ Testing and debugging

## API Endpoints

### GET /api/admin/users

- Fetch paginated users list
- Query parameters: page, search, sortBy, sortOrder
- Response: { users: User[], pagination: PaginationInfo }

### PATCH /api/admin/users/[userId]/waitlist

- Toggle user waitlist status
- Body: { waitinglist: boolean }
- Response: { success: boolean, user: User }

### GET /api/admin/waitlisted-emails

- Fetch comma-separated list of waitlisted emails
- Response: { emails: string, count: number }

## Testing Strategy

### Unit Tests

- Component rendering
- Server action functionality
- Utility functions

### Integration Tests

- Admin authentication flow
- Waitlist toggle functionality
- Email export feature

### E2E Tests

- Complete admin workflow
- Permission checks
- Error scenarios

## Performance Considerations

### Client-Side

- Virtual scrolling for large user lists
- Debounced search input
- Optimistic updates
- Memoized components

### Server-Side

- Database indexing on frequently queried fields
- Pagination to limit data transfer
- Caching for frequently accessed data
- Connection pooling

## Future Enhancements

### Phase 2 Features

- Bulk waitlist operations
- User activity logs
- Advanced filtering options
- Export to CSV
- User analytics dashboard

### Phase 3 Features

- Email templates management
- Notification system
- Role-based permissions
- Audit trail
- Advanced user management features
