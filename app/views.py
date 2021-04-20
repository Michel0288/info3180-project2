"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
import jwt
import psycopg2 
from app import app, db, login_manager
from flask import request, jsonify, render_template
from flask_login import login_user, logout_user, current_user, login_required
from app.forms import  LoginForm, RegisterForm
from app.models import Users,Cars,Favourites
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
###
# Routing for your application.
###
@app.route('/api/users/register', methods = ['POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit() and form.request.method=="POST":
        username = form.username.data
        password = form.password.data
        name = form.name.data
        email = form.email.data
        location = form.location.data
        biography = form.biography.data
        photo = form.photo.data

        photo = secure_filename(photo.filename)
        photo.save(os.path.join(
            app.config['UPLOAD_FOLDER'], photo
        ))

        user = Users(username=username, password=password, name=name, email=email, location=location, biography=biography, photo=photo)
        db.session.add(user)
        db.session.commit()
        
        successMessage = {
            "message": "User successfully registered",
            "id": 1,
            "username": username,
            "name": name,
            "photo": photo,
            "email": email,
            "location": location,
            "biography": biography,
            "date_joined": "2021-04-05 17:53"
        }
        return jsonify(successMessage=successMessage)
    
    else:
        registerError = {
            "errors": form_errors(form)
        }
        return jsonify(registerError=registerError)

@app.route('/api/auth/login', methods=['POST'])
def login():
    loginform = LoginForm()

    if loginform.validate_on_submit:
        username=loginform.username.data
        password=loginform.password.data
        user=Users.query.filter_by(username=username).first()
        if user is not None and check_password_hash(user.password, password):
            login_user(user)
            payload = {
                "username": user.username,
                "password": user.password
            }
            encoded_jwt = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
            successMessage = {
                "token": encoded_jwt,
                "message": "User successfully logged in.",
                "user_id": user.id
            }

            return jsonify(successMessage=successMessage)

        else:
            loginError = {
            "error": "Username or Password is incorrect."
            }
            return jsonify(loginError=loginError)
    
    else:
        loginErrors = {
            "errors": form_errors(loginform)
        }
        return jsonify(loginError=loginErrors)



@app.route('/api/auth/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    successMessage = {
    "message": "Log out successful"
    }
    return jsonify(successMessage=successMessage)
# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###
@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
