# 📁 Student Assistant - Modular Structure

```
src/
│
├── 📄 App.jsx                    # Main router & auth logic
│
├── 📂 config/
│   └── 📄 api.js                 # Axios setup & interceptors
│
├── 📂 components/                # Reusable UI components
│   ├── 📄 Button.jsx             # Button dengan variants
│   ├── 📄 Input.jsx              # Input field dengan label
│   ├── 📄 ChatMessage.jsx        # Message bubble + Markdown
│   └── 📄 Sidebar.jsx            # Navigation + History
│
└── 📂 pages/                     # Full page components
    ├── 📄 LandingPage.jsx        # Landing page publik
    ├── 📄 AuthPage.jsx           # Login & Register
    ├── 📄 ChatApp.jsx            # Chat interface utama
    └── 📄 AdminPanel.jsx         # Admin dashboard
```

## Component Dependencies

```
App.jsx
├── imports LandingPage
├── imports AuthPage
├── imports ChatApp
│   ├── imports Sidebar
│   ├── imports ChatMessage
│   └── imports Button
└── imports AdminPanel
    └── imports Button

All components import from:
- config/api.js (untuk axios)
- components/Button.jsx (untuk buttons)
- components/Input.jsx (untuk forms)
```

## File Sizes (Estimated Lines)

| File            | Lines | Purpose                |
| --------------- | ----- | ---------------------- |
| App.jsx         | ~80   | Main routing & state   |
| api.js          | ~30   | API configuration      |
| Button.jsx      | ~35   | Reusable button        |
| Input.jsx       | ~25   | Reusable input         |
| ChatMessage.jsx | ~75   | Message rendering      |
| Sidebar.jsx     | ~150  | Full sidebar component |
| LandingPage.jsx | ~110  | Landing page           |
| AuthPage.jsx    | ~140  | Auth forms             |
| ChatApp.jsx     | ~200  | Main chat interface    |
| AdminPanel.jsx  | ~150  | Admin settings         |

**Total: ~995 lines** (vs original ~900 lines)

Sedikit lebih banyak karena:

- ✅ Imports & exports
- ✅ Better organization
- ✅ More readable code
- ✅ Easier maintenance

## Usage Examples

### Importing Components

```jsx
// In any file
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "../config/api";
```

### Using in Component

```jsx
function MyComponent() {
  return (
    <div>
      <Button variant="primary" onClick={handleClick}>
        Click Me
      </Button>

      <Input label="Email" type="email" value={email} onChange={handleChange} />
    </div>
  );
}
```

## Benefits

✅ **Separation of Concerns** - Each file has one job
✅ **Reusability** - Components can be used anywhere
✅ **Testability** - Easy to test individual components
✅ **Scalability** - Easy to add new features
✅ **Collaboration** - Multiple devs can work simultaneously
✅ **Maintainability** - Easy to find & fix bugs
