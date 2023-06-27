
import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session, url_for
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError

from ml.ml import *
from flask import Flask

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///users.db")


@app.route('/optimiser', methods=["GET", "POST"])
def feedbackform():
    if request.method == 'GET':
        return render_template("feedback.html")
    else:
        name = request.form.get("name")
        age = float(request.form.get("age"))
        gender = float(request.form.get("gender"))
        meals_day = float(request.form.get("meals"))
        physical_illness = float(request.form.get("illness"))
        screen_time = float(request.form.get("screentime"))
        bluelight_filter = float(request.form.get("bl_filter"))
        exercise = float(request.form.get("exercise"))
        smoke_drink = float(request.form.get("smoke_drink"))
        beverage = float(request.form.get("beverage"))
        sleep_time = float(request.form.get("sleep_time"))
        # age, gender, meals_day, physical_illness, screen_time, bluelight_filter, exercise, smoke_drink, beverage, sleep_time = request.form.get("age", "gender", "meals", "illness", 'screentime', "bl_filter", "exercise", "smoke_drink", "beverage", "sleep_time")
        print('asdfasdfasfaf', request.form.items)
        
        app_time = optimiser(age, gender, meals_day, physical_illness, screen_time, bluelight_filter, exercise, smoke_drink, beverage, sleep_time)
        db.execute("INSERT INTO user(name, age, gender, meals_day, physical_illness, screen_time, bluelight_filter, exercise, smoke_drink, beverage, sleep_time, app_time) VALUES (:name, :age, :gender, :meals_day, :physical_illness, :screen_time, :bluelight_filter, :exercise, :smoke_drink, :beverage, :sleep_time, :app_time)", name=name, age=age, gender=gender, meals_day=meals_day, physical_illness=physical_illness, screen_time=screen_time, bluelight_filter=bluelight_filter, exercise=exercise, smoke_drink=smoke_drink, beverage=beverage, sleep_time=sleep_time, app_time=app_time)
        # player(name, app_time)
        return redirect(url_for('player', name=name, app_time=app_time))

@app.route('/', methods=["GET", "POST"])
def player():
    name = request.args.get("name")
    app_time = request.args.get("app_time")
    return render_template("index.html", name=name, app_time=app_time)


# main driver function
if __name__ == '__main__':
    app.run(debug=True, port=8001)
