from app.model.user import Users
import random, string
from flask_seeder import Seeder, Faker, generator
from werkzeug.security import generate_password_hash

# SQLAlchemy database model
class User(Users):
    def __init__(self, name=None, email=None, password=None, role=None, department=None):
        self.name = name
        self.email = email
        self.password = generate_password_hash(password)
        self.role = role
        self.department = department

    def __str__(self):
        return "Name=%s, Email=%s, Password=%s, Role=%s, Department=%s" % (self.name, self.email, self.password, self.role, self.department)

# All seeders inherit from Seeder
class UserSeeder(Seeder):
    # run() will be called by Flask-Seeder
    def run(self):
        # Create a new Faker and tell it how to create User objects
        # name = generator.Name()
        # print( vars(name) )
        # exit("Exit...")

        role = ["admin", "CEO", "manager", "secretary", "staff"]
        department = ["IT", "Finance", "Marketing", "Research and Development", "Executive"]

        faker = Faker(
            cls=User,
            init={
                "name": "Fitria Amastini",
                "email": 'amas@ecampus.ut.ac.id',
                "password": "secret",
                "role": role[0],
                "department": department[0]
            }
        )

        # Create 25 user random
        for user in faker.create(1):
            print("Adding user: %s" % user)
            self.db.session.add(user)

        # name = generator.Name()

        # Create 25 user random
        for i in range(5):
            name = generator.Name()
            role_idx = i % len(role)
            depart_idx = i % len(department)

            faker_2 = Faker(
                cls=User,
                init={
                    "name": name,
                    "email": ''.join(random.choice(string.ascii_letters) for i in range(10)) + "@mail.com",
                    "password": "secret",
                    "role": role[role_idx],
                    "department": department[depart_idx]
                    # "role": role[random.randint(0, len(role)-1)],
                    # "department": department[random.randint(0, len(department)-1)]
                }
            )

            for user_2 in faker_2.create(1):
                print("Adding user: %s" % user_2)
                self.db.session.add(user_2)

        # for user in faker.create(10):
        #     print("Adding user: %s" % user)
        #     self.db.session.add(user)