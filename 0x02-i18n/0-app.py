#!/usr/bin/env python3
"""Flask app"""
from flask import render_template, Flask


app = Flask(__name__)


@app.route('/')
def basic():
    """basic rote 'hello world'"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
