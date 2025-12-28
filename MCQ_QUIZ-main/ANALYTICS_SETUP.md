# Analytics Setup Guide

## Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" → Enter project name → Continue
3. **Disable Google Analytics** (for privacy) → Create project
4. In the project dashboard, click "Web" icon to add a web app
5. Copy the Firebase configuration object

### 2. Enable Firestore
1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create database" → Start in test mode
3. Choose a location → Enable

### 3. Update Firebase Configuration
Edit `src/firebase.ts` and replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Deploy Security Rules
In Firebase Console:
1. Go to "Build" → "Firestore Database" → "Rules" tab
2. Copy the contents of `firestore.rules` and paste it into the rules editor
3. Click "Publish"

## How It Works

### Visitor Tracking
- Uses localStorage to track first-time vs returning visitors
- Each visitor gets a unique ID stored locally
- Only tracks the first visit per visitor
- Data stored in `visits` collection

### Quiz Event Tracking
- Tracks quiz start when user selects a unit
- Tracks quiz completion with score and results
- Data stored in `quiz_events` collection
- Includes session ID for tracking quiz sessions

### Privacy Features
- **No read access** - Analytics data cannot be read by frontend
- **Admin only** - Data visible only in Firebase Console
- **No third-party** - Uses Firebase only, no Google Analytics
- **Minimal data** - Tracks only essential metrics

## Data Schema

### Visits Collection
```javascript
{
  visitorId: "visitor_1234567890_abc123",
  firstVisit: timestamp,
  trackedAt: timestamp,
  userAgent: "Mozilla/5.0...",
  referrer: "https://google.com",
  timestamp: timestamp
}
```

### Quiz Events Collection
```javascript
{
  visitorId: "visitor_1234567890_abc123",
  eventType: "quiz_start" | "quiz_complete",
  unit: "UNIT 1",
  totalQuestions: 20,
  correctAnswers: 15,
  score: 75,
  percentage: 75,
  timestamp: timestamp,
  sessionId: "session_1234567890_def456"
}
```

## Viewing Analytics Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to "Build" → "Firestore Database"
4. You can view the data in:
   - `visits` collection - Visitor data
   - `quiz_events` collection - Quiz usage data

## Deployment Notes

- The analytics code is already integrated into your app
- Firebase SDK is included in your dependencies
- Security rules ensure data privacy
- No additional configuration needed for Netlify deployment

## Troubleshooting

### Firebase Connection Issues
- Verify your Firebase configuration in `src/firebase.ts`
- Check that Firestore is enabled in your project
- Ensure security rules are published

### Data Not Appearing
- Check browser console for errors
- Verify Firebase project settings
- Ensure you're using the correct project ID

### Permission Errors
- Make sure security rules are published
- Check that rules allow `create` operations
- Verify collection names match exactly
