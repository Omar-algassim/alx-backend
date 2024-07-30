#!/usr/bin/env python3
"""Flask app"""
from flask import render_template, Flask
from flask_babel import Babel, request, gettext


class Config():
    """config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
babel = Babel(app)
app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """get best match languge"""
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def basic() -> str:
    """basic rote 'hello world'"""
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run()
