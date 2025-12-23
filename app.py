import os
from flask import Flask, render_template

app = Flask(__name__)
# Secure secret key for production
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-static-fallback-123')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/project/galactic-rotation-curve')
def project_galactic():
    return render_template('project_galactic.html')

if __name__ == '__main__':
    # Debug mode disabled for production safety
    app.run(debug=False)
