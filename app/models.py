from . import db
from  werkzeug.security import generate_password_hash


class Cars(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000))
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    colour = db.Column(db.String(80))
    year = db.Column(db.String(80))
    transmission = db.Column(db.String(80))
    car_type = db.Column(db.String(80))
    price = db.Column(db.Numeric(10000000,2))
    photo = db.Column(db.String(255))
    user_id = db.Column(db.Integer, foreign_key=True)
    

    def __init__(self, description, make, model, colour, year, transmission, car_type, price, photo, user_id):
        self.description = description
        self.make = make
        self.model = model
        self.colour = colour
        self.year = year
        self.transmission = transmission
        self.car_type = car_type
        self.price = price
        self.photo = photo
        self.user_id = user_id
        

class Favourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer, foreign_key=True)
    user_id = db.Column(db.Integer, foreign_key=True)
    

    def __init__(self,user_id, car_id, id):
        self.id = id
        self.car_id = car_id
        self.user_id = user_id

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    location = db.Column(db.String(255))
    biography = db.Column(db.String(1000))
    photo = db.Column(db.String(255))
    date_joined = db.Column(db.DateTime)
    

    def __init__(self, username, password, name, email, location, biography, photo, date_joined):
        self.username = username
        self.password = password
        self.name = name
        self.email = email
        self.location = location
        self.biography = biography
        self.photo = photo
        self.date_joined = date_joined

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)