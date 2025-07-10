# ProTeam Portfolio Website

## Overview

This is a professional team portfolio website built with Flask, featuring a modern dark theme design. The application serves as a showcase for a professional team with sections for about, team members, services, and contact information. It includes a contact form with database storage capabilities and responsive design using Bootstrap.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy extension
- **Database**: SQLite for development, with PostgreSQL support via environment variables
- **Session Management**: Flask's built-in session handling with secret key configuration
- **Middleware**: ProxyFix for handling proxy headers in production environments

### Frontend Architecture
- **Template Engine**: Jinja2 (Flask's default)
- **CSS Framework**: Bootstrap 5 with dark theme
- **Icons**: Font Awesome 6.4.0
- **JavaScript**: Vanilla JS for interactive features
- **Styling**: Custom CSS with CSS variables and modern design patterns

### Database Design
- **Contact Model**: Stores contact form submissions with fields for name, email, subject, message, and timestamp
- **Schema Management**: Automatic table creation using SQLAlchemy's `create_all()`

## Key Components

### 1. Application Structure
- **app.py**: Main application file containing Flask app initialization, database configuration, and route definitions
- **models.py**: Database models definition using SQLAlchemy ORM
- **main.py**: Entry point that imports the Flask app for deployment
- **templates/index.html**: Main HTML template with responsive design
- **static/**: Static assets including CSS and JavaScript files

### 2. Contact Form System
- Form validation and processing
- Database storage of contact submissions
- Flash messaging for user feedback
- CSRF protection through Flask's session management

### 3. Frontend Features
- Responsive navigation with scroll effects
- Smooth scrolling between sections
- Interactive animations and card hover effects
- Mobile-friendly design with Bootstrap's responsive utilities

## Data Flow

1. **User Interaction**: Users navigate through different sections of the portfolio
2. **Contact Form**: When users submit the contact form, data is validated server-side
3. **Database Storage**: Valid contact submissions are stored in the SQLite/PostgreSQL database
4. **Response**: Users receive feedback via Flask's flash messaging system
5. **Page Rendering**: Jinja2 templates render dynamic content with Bootstrap styling

## External Dependencies

### Python Packages
- **Flask**: Web framework
- **Flask-SQLAlchemy**: Database ORM integration
- **Werkzeug**: WSGI utilities and middleware

### Frontend CDN Resources
- **Bootstrap 5**: CSS framework with dark theme
- **Font Awesome 6.4.0**: Icon library
- **Bootstrap Agent Dark Theme**: Custom Bootstrap theme from Replit CDN

### Environment Variables
- **SESSION_SECRET**: Flask session secret key
- **DATABASE_URL**: Database connection string (defaults to SQLite)

## Deployment Strategy

### Development
- SQLite database for local development
- Debug logging enabled
- Development secret key with fallback

### Production Considerations
- Environment-based configuration for database and secret keys
- ProxyFix middleware for proper header handling behind proxies
- Connection pooling with SQLAlchemy engine options
- Support for PostgreSQL through DATABASE_URL environment variable

### Database Migration
- Currently uses `create_all()` for table creation
- Ready for migration to Drizzle ORM if needed
- Schema changes require manual handling or migration system implementation

## Key Features

1. **Professional Design**: Modern dark theme with gradient backgrounds and subtle animations
2. **Responsive Layout**: Mobile-first design using Bootstrap's grid system
3. **Interactive Elements**: Smooth scrolling, hover effects, and dynamic navigation
4. **Contact Management**: Form processing with database storage and validation
5. **Accessibility**: Semantic HTML structure and proper ARIA labels
6. **Performance**: Optimized asset loading and efficient database queries

The application follows Flask best practices with proper separation of concerns, environment-based configuration, and scalable architecture suitable for team portfolio websites.