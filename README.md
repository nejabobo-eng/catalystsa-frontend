# CatalystSA Frontend

Next.js frontend for CatalystSA eCommerce store.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

### Build for Production

```bash
npm run build
npm start
```

## Features

- 🛍️ Product listing from API
- ⚡ Automatic pricing calculation
- 🔐 Admin panel for product uploads
- 📱 Mobile-responsive design
- 🎨 Tailwind CSS styling

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: https://catalystsa.onrender.com)
