from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/project/galactic-rotation-curve')
def project_galactic():
    return render_template('project_galactic.html')

if __name__ == '__main__':
    app.run(debug=True)
