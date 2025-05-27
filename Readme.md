# Appointment App

A comprehensive healthcare platform for Appointment App featuring appointment booking, consultation management, AI-powered chatbot assistance, and patient management system.

## Demo
[Click here to view the demo](https://www.canva.com/design/DAGokUufqXk/4RWd1p4hC-wvNnYc93mZzA/view?utm_content=DAGokUufqXk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf37a4a30c8)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)


## ✨ Features

- **Patient Management**: Complete patient registration and profile management
- **Appointment Booking**: Schedule and manage medical appointments
- **AI Chatbot**: Intelligent healthcare assistance and consultation
- **Consultation System**: Video consultations with healthcare providers
- **Billing & Payments**: Integrated wallet system for payments
- **Blog System**: Health-related articles and information
- **Admin Dashboard**: Complete administrative control panel
- **Social Authentication**: Google OAuth integration
- **Email Notifications**: 

## 🛠 Tech Stack

### Backend
- **Django 4.x** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database
- **AWS S3** - File storage
- **Email Services** - SMTP integration

### Frontend
- **React 18** - JavaScript library
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **React Router** - Navigation

### Chatbot
- **Python** - AI chatbot service

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Python 3.8+**
- **Node.js 16+**
- **npm or yarn**
- **PostgreSQL 12+**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AmosMaru/konvergence.git
cd konvergence
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Create and activate virtual environment
```bash
# On macOS/Linux
python3 -m venv env
source env/bin/activate
```

#### Install Python dependencies
```bash
pip install -r requirements.txt
```

#### Create environment file
```bash
cp .env.example .env
```

#### Configure your `.env` file with the following variables:
```env
SECRET_KEY=
DEBUG=1
ALLOWED_HOSTS='*'

SQL_ENGINE=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DATABASE=

EMAIL_BACKEND=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USE_TLS=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_REPLY_TO=

USE_S3=True


GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

BASE_BACKEND_URL=
FRONT_END_URL=
CONSOLE_URL=

SITE_URL=
ADMIN_URL=
LOGIN_URL=

REDIS_URL=redis://localhost:6379


ENVIRONMENT=local

PASSWORD_EXPIRY_DAYS=3
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
```

#### Setup Database
```bash
# Create PostgreSQL database
createdb appointment_app_db

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd ../frontend
```

#### Install Node.js dependencies
```bash
npm install
```


### 4. Chatbot Setup

#### Navigate to chatbot directory
```bash
cd ../chatbot
```

#### Create virtual environment
```bash
python -m venv env
```

#### Install dependencies
```bash
pip install -r requirements.txt
```

#### Configure chatbot environment
```bash
# Create .env file with openai API key
touch .env
```

## ⚙️ Configuration

### AWS S3 Configuration
1. Create an AWS S3 bucket for file storage
2. Create IAM user with S3 permissions
3. Add AWS credentials to your `.env` file

### Email Configuration
1. Set up SMTP credentials (Gmail recommended)
2. For Gmail, enable 2FA and create an App Password

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Update both backend and frontend `.env` files

## 🏃‍♂️ Running the Application

### Start the Backend Server
```bash
cd backend
source env/bin/activate  # On Windows: env\Scripts\activate
python manage.py runserver
```
The backend will be available at `http://localhost:8000`

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Start the Chatbot Service
```bash
cd chatbot
source env/bin/activate  # Activate virtual environment
python main.py
```
The chatbot service will run on its configured port.

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## 📁 Project Structure

```
konvergence/
├── backend/                 # Django backend
│   ├── account/            # User authentication
│   ├── appointments/       # Appointment management
│   ├── blogs/             # Blog system
│   ├── social_auth/       # Social authentication
│   ├── walletApp/         # Payment system
│   ├── util/              # Utility functions
│   └── templates/         # Email templates
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # API and utilities
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
└── chatbot/               # AI chatbot service
```

## 🔧 Available Scripts

### Backend
```bash
python manage.py runserver          # Start development server
python manage.py makemigrations     # Create database migrations
python manage.py migrate            # Apply migrations
```

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **CORS Issues**
   - Check `CORS_ALLOWED_ORIGINS` in backend settings
   - Ensure frontend URL is included

3. **Environment Variables Not Loading**
   - Ensure `.env` files are in correct directories
   - Check variable names match exactly

4. **File Upload Issues**
   - Verify AWS S3 credentials
   - Check bucket permissions

## 📝 API Documentation

The API documentation is available at:
- **Swagger UI**: http://localhost:8000/swagger/

Key API endpoints:
- `/api/auth/` - Authentication endpoints
- `/api/appointments/` - Appointment management
- `/api/blogs/` - Blog posts
- `/api/wallet/` - Payment operations


## 📞 Support

For support, email amosmaru10@gmail.com or create an issue in the repository.

---

**Note**: Make sure to keep your environment variables secure and never commit them to version control.