from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, DataRequired, Email
from flask_wtf.file import FileField, FileRequired, FileAllowed


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])


class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()], description="Please enter a username.")
    password = PasswordField('Password', validators=[InputRequired()], description="Please enter a password.")
    name = StringField('Name', validators=[InputRequired()], description="Please enter your full name.")
    email = StringField('Email', validators=[DataRequired(), Email()], description='Please enter your email address.')
    location = StringField('Location', validators=[InputRequired()], description='Please enter your location.')
    biography = TextAreaField('Biography', validators=[DataRequired()], description='Please enter a short biography.')
    photo = FileField('Photo', validators=[FileRequired(), FileAllowed(['jpg', 'png', 'Photos only!'])])
