# Struktur Project - Student Assistant

## 📁 Folder Structure

```
src/
├── config/
│   └── api.js                 # Konfigurasi Axios & API
├── components/
│   ├── Button.jsx             # Reusable Button Component
│   ├── Input.jsx              # Reusable Input Component
│   ├── ChatMessage.jsx        # Chat Message dengan Markdown
│   └── Sidebar.jsx            # Sidebar Navigation & Chat History
├── pages/
│   ├── LandingPage.jsx        # Halaman Landing Page
│   ├── AuthPage.jsx           # Halaman Login & Register
│   ├── ChatApp.jsx            # Halaman Chat Application
│   └── AdminPanel.jsx         # Halaman Admin Dashboard
└── App.jsx                    # Main App Component (Router)
```

## 🎯 Keuntungan Struktur Modular

### 1. **Maintainability**
- ✅ Setiap komponen punya tanggung jawab spesifik
- ✅ Mudah menemukan dan mengubah code
- ✅ Bug lebih mudah dilacak

### 2. **Reusability**
- ✅ Button & Input bisa dipakai di mana saja
- ✅ ChatMessage bisa dipake untuk berbagai chat UI
- ✅ Sidebar bisa di-custom tanpa ganggu halaman lain

### 3. **Scalability**
- ✅ Mudah menambah fitur baru
- ✅ Mudah menambah page baru
- ✅ Mudah menambah component baru

### 4. **Collaboration**
- ✅ Multiple developer bisa kerja di file berbeda
- ✅ Merge conflict lebih jarang
- ✅ Code review lebih mudah

## 📦 Component Details

### **config/api.js**
- Setup Axios base URL
- Global interceptors untuk error handling
- Export axios instance yang sudah dikonfigurasi

### **components/Button.jsx**
- Reusable button dengan multiple variants
- Props: children, onClick, variant, className, type, disabled
- Variants: primary, secondary, danger, outline

### **components/Input.jsx**
- Reusable input field
- Props: label, type, value, onChange, placeholder, required
- Styling konsisten di seluruh aplikasi

### **components/ChatMessage.jsx**
- Render pesan chat dengan Markdown support
- User message: plain text
- AI message: ReactMarkdown dengan custom styling
- Avatar icon untuk user & bot

### **components/Sidebar.jsx**
- Navigation menu (Dashboard, Materi, Tugas, Diskusi)
- Chat history list
- User profile section
- Mobile-responsive dengan slide-in animation

### **pages/LandingPage.jsx**
- Hero section dengan CTA
- Feature cards (3 kolom)
- Footer
- Navigation bar

### **pages/AuthPage.jsx**
- Login & Register form dalam satu component
- Error handling & validation
- Switch antara login/register
- API integration untuk auth

### **pages/ChatApp.jsx**
- Main chat interface
- Message list dengan auto-scroll
- Input form dengan send button
- Empty state dengan suggestion cards
- Error handling
- Sidebar integration

### **pages/AdminPanel.jsx**
- Admin dashboard untuk konfigurasi AI
- Form untuk system instruction, temperature, max_tokens
- Save settings ke database
- Success/error notifications

### **App.jsx**
- Main router component
- Auth state management
- View switching logic
- Initial loading state

## 🚀 How to Use

### Import Component
```jsx
import Button from './components/Button';
import Input from './components/Input';
```

### Use Component
```jsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

<Input 
  label="Email" 
  type="email" 
  value={email} 
  onChange={handleChange}
  required 
/>
```

## 🔄 Migration dari Single File

Jika Anda punya file `App.jsx` lama yang monolithic:

1. Backup file lama
2. Copy seluruh folder `src/` baru
3. Update import di `index.js` atau `main.jsx`:
   ```jsx
   import App from './src/App';
   ```
4. Test semua fitur
5. Hapus file lama jika sudah berjalan dengan baik

## 📝 Best Practices

1. **Satu file = Satu component**
2. **Component name = File name**
3. **Gunakan default export untuk component utama**
4. **Props destructuring di parameter**
5. **Keep components small (<300 lines)**
6. **Pisahkan logic & UI jika component terlalu besar**

## 🎨 Future Improvements

Struktur ini siap untuk:
- ✅ Add routing (React Router)
- ✅ Add state management (Context/Redux)
- ✅ Add custom hooks di folder `hooks/`
- ✅ Add utility functions di folder `utils/`
- ✅ Add constants di folder `constants/`
- ✅ Add tests di folder `__tests__/`
