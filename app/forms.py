from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField,SelectField
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

class carForm(FlaskForm):
    make = StringField('Make', validators=[InputRequired()], description="Please enter make.")
    model = PasswordField('Model', validators=[InputRequired()], description="Please enter vechile's model.")
    colour = StringField('Colour', validators=[InputRequired()], description="Please enter vehicle's colour.")
    year = StringField('Year', validators=[InputRequired()], description="Please enter year.")
    price = PasswordField('Price', validators=[InputRequired()], description="Please enter the price for the vehicle.")
    ctype = SelectField('Car Type', choices=[('Micro'), ('Hatchback'), ('Sedan'),('SUV'), ('MPV'), ('Convertible'), ('Wagon'), ('Luxury'), ('Antique'), ('Coupe'), ('Sports'),('Supercar'),('Muscle Car'),('Electric')])
    transmission = SelectField('Transmission', choices=[('Automatic'), ('Manual')])
    description = TextAreaField('Description', validators=[DataRequired()], description='Please enter a short description.')
    photo = FileField('Photo', validators=[FileRequired(), FileAllowed(['jpg', 'png', 'Photos only!'])])
