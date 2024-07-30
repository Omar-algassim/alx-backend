#!/usr/bin/env python3
"""Flask app"""
from flask import render_template, Flask, request, g
from flask_babel import Babel
from typing import Dict, Union


class Config:
    """config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
babel = Babel(app)
app.config.from_object(Config)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

def get_user() -> Union[Dict, None]:
    """return user dictionary"""
    ID = request.args.get('login_as')
    ID = int(ID)
    if not ID:
        return None
    return users[ID] if ID in users.keys() else None


@babel.localeselector
def get_locale() -> str:
    """get best match languge"""
    locale = request.args.get('locale')
    if locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)

@app.before_request
def before_request():
    """register user to global user"""
    g.user = get_user()

@app.route('/')
def basic() -> str:
    """basic rote 'hello world'"""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run()
