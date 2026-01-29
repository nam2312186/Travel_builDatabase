# 🚀 Traveloka Clone - Azure Deployment

## 📍 Live Demo

**Frontend (Website):**  
🔗 [https://traveloka-frontend-nam2026-dtb5eraqh7hpgrej.malaysiawest-01.azurewebsites.net](https://traveloka-frontend-nam2026-dtb5eraqh7hpgrej.malaysiawest-01.azurewebsites.net)

**Backend API:**  
🔗 [https://traveloka-backend-nam2026-ceftd6e0agfdhkd9.malaysiawest-01.azurewebsites.net](https://traveloka-backend-nam2026-ceftd6e0agfdhkd9.malaysiawest-01.azurewebsites.net)

**API Health Check:**  
🔗 [https://traveloka-backend-nam2026-ceftd6e0agfdhkd9.malaysiawest-01.azurewebsites.net/api/health](https://traveloka-backend-nam2026-ceftd6e0agfdhkd9.malaysiawest-01.azurewebsites.net/api/health)

---

## 🎯 Test Accounts

### Admin Account
- **Username:** `nampham1401`
- **Password:** `14012005`
- **Features:** Full access to admin dashboard, manage tours, bookings, users

### User Account
- **Username:** `user1`
- **Password:** `123456`
- **Features:** Browse tours, book tours, view booking history

---

## 🏗️ Architecture

### Frontend
- **Platform:** Azure App Service (Linux, Node 20 LTS)
- **Framework:** React 19 + Vite + TypeScript
- **Hosting:** App Service Free Tier (F1)
- **Region:** Malaysia West
- **Deployment:** GitHub Actions (automatic on push to `azure` branch)

### Backend
- **Platform:** Azure App Service (Linux, Node 20 LTS)
- **Framework:** Node.js + Express 5 + Prisma ORM
- **Hosting:** App Service Free Tier (F1)
- **Region:** Malaysia West
- **Deployment:** GitHub Actions (automatic on push to `azure` branch)

### Database
- **Platform:** Azure Database for MySQL Flexible Server
- **Tier:** Burstable B1ms (Free 750 hours/month)
- **Storage:** 20 GB
- **Region:** Malaysia West
- **Backup:** 7 days retention

---

## 📊 Features

✅ **User Features:**
- Browse available tours
- View tour details with images and descriptions
- Book tours with date selection
- View booking history
- Apply promotion codes
- Leave reviews and ratings
- User profile management

✅ **Admin Features:**
- Dashboard with statistics
- Manage tours (CRUD operations)
- Manage bookings
- Manage users
- Manage promotions
- View all reviews

---

## 🛠️ Technology Stack

### Frontend
- React 19.1.0
- Vite 6.3.5
- TypeScript 5.8.3
- Tailwind CSS 3.4.17
- Axios (API calls)
- React Router DOM

### Backend
- Node.js 18+
- Express 5.1.0
- Prisma ORM 6.7.0
- MySQL 8.0
- JWT Authentication
- bcrypt (Password hashing)

### DevOps
- GitHub Actions (CI/CD)
- Azure App Service
- Azure Database for MySQL
- Git (Version Control)

---

## 🔄 CI/CD Pipeline

### Automated Deployment
- **Trigger:** Push to `azure` branch
- **Frontend Workflow:** `.github/workflows/azure-frontend-deploy.yml`
- **Backend Workflow:** `.github/workflows/azure-backend-deploy.yml`

### Deployment Steps
1. Checkout code from GitHub
2. Setup Node.js 20
3. Install dependencies
4. Build application (frontend: Vite build, backend: Prisma generate)
5. Deploy to Azure App Service
6. Health check and verification

---

## 📈 Performance & Monitoring

- **Uptime:** 99.9% (Azure SLA)
- **Response Time:** < 500ms (Malaysia region)
- **SSL/TLS:** Enabled by default
- **CORS:** Configured for frontend-backend communication

---

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- HTTPS enforced
- Environment variables for sensitive data
- SQL injection prevention (Prisma ORM)
- Input validation
- CORS policy

---

## 💰 Cost Breakdown (Free Tier)

| Service | Tier | Cost |
|---------|------|------|
| Frontend App Service | F1 Free | $0/month |
| Backend App Service | F1 Free | $0/month |
| MySQL Flexible Server | B1ms Burstable | $0/month (750 hours free) |
| **Total** | | **$0/month** |

*Free tier limits: 1GB RAM, 60 CPU minutes/day per App Service*

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development
- Cloud deployment on Azure
- RESTful API design
- Database design and ORM usage
- CI/CD implementation
- Git workflow management
- React SPA development
- Authentication and authorization
- Responsive web design

---

## 📝 Notes

- Project deployed on Azure for Students account
- Free tier services with no credit card charges
- Automatic deployment via GitHub Actions
- Production-ready configuration with environment variables
- SSL certificates managed by Azure

---

## 👨‍💻 Developer

**Nam Pham**  
GitHub: [nam2312186](https://github.com/nam2312186)  
Repository: [Travel_builDatabase](https://github.com/nam2312186/Travel_builDatabase)

---

*Last Updated: January 29, 2026*
