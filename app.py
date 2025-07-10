import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key_change_in_production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///portfolio.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

with app.app_context():
    # Import models
    import models
    db.create_all()

@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()
        
        # Basic validation
        if not all([name, email, subject, message]):
            flash('All fields are required.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # Email validation
        if '@' not in email or '.' not in email:
            flash('Please enter a valid email address.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # Create contact record
        contact_record = models.Contact(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        db.session.add(contact_record)
        db.session.commit()
        
        flash('Thank you for your message! We will get back to you soon.', 'success')
        app.logger.info(f'New contact form submission from {email}')
        
    except Exception as e:
        app.logger.error(f'Error processing contact form: {str(e)}')
        flash('An error occurred while sending your message. Please try again.', 'error')
        db.session.rollback()
    
    return redirect(url_for('index') + '#contact')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
