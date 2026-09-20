# Nexora India — MERN Website

A full-featured MERN (MongoDB, Express, React, Node.js) website for **Nexora India** — an IT services company and kids products store.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (running locally on port 27017)

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running locally, or update `server/.env` with your MongoDB Atlas URI.

### 3. Seed the Database

```bash
cd server
npm run seed
```

### 4. Start the Development Servers

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Visit: **http://localhost:3000**

---

## 📁 Project Structure

```
nexoraindia/
├── client/                  # React + Vite frontend
│   ├── public/
│   │   └── logo.jpg         # Nexora India logo
│   ├── src/
│   │   ├── api/api.js       # Axios API helpers
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                  # Express + MongoDB backend
    ├── models/
    │   ├── Product.js
    │   ├── Service.js
    │   ├── Order.js
    │   └── Contact.js
    ├── routes/
    │   ├── products.js
    │   ├── services.js
    │   ├── orders.js
    │   └── contact.js
    ├── seed/
    │   └── seed.js
    ├── server.js
    ├── .env
    └── package.json
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | React Icons |
| Routing | React Router v6 |
| HTTP | Axios |
| Toasts | React Hot Toast |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |

---

## 📄 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/products` | List products (with filters) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/services` | List all IT services |
| GET | `/api/services/:slug` | Get single service |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | List all orders |
| POST | `/api/contact` | Submit contact form |

---

## 🎨 Brand Colors

| Color | Hex |
|-------|-----|
| Navy Blue | `#1a2d6b` |
| Orange | `#f56a00` |

---

## 📞 Contact

- **Website**: nexoraindia.com  
- **Email**: info@nexoraindia.com  
- **Phone**: +91 98765 43210
