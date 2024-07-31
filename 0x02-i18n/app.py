#!/usr/bin/env python3
"""Flask app"""
from typing import Dict, Union
from flask_babel import Babel, format_datetime
from datetime import datetime
from flask import render_template, Flask, request, g
from pytz import timezone, exceptions


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
    user_id = request.args.get('login_as')
    if not user_id:
        return None
    user_id = int(user_id)
    return users[user_id] if user_id in users else None


@babel.localeselector
def get_locale() -> str:
    """get best match languge"""
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    user = get_user()
    if user:
        locale = user.get('locale')
        if locale and locale in Config.LANGUAGES:
            return locale
    locale = request.headers.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.before_request
def before_request() -> None:
    """register user to global user"""
    g.user = get_user()
    current_time = datetime.now()
    g.time = format_datetime(current_time)


@babel.timezoneselector
def get_timezone() -> str:
    """return the time zone format"""
    time_zone = request.args.get('timezone')
    try:
        timezone(time_zone)
        if time_zone:
            return time_zone
    except exceptions.UnknownTimeZoneError:
        return
    user = get_user()
    if user:
        
        time_zone = user.get("timezone")
        if time_zone:
            try:
                timezone(time_zone)
            except exceptions.UnknownTimeZoneError:
                return
            return time_zone
        return 'UTC'


@app.route('/')
def basic() -> str:
    """basic rote 'hello world'"""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
