import os

import django
django.setup()

from users.models import User
from faker import Faker
from faker.providers import person, job,address, date_time
#from faker.providers.person import Faker
fake = Faker()
fake.add_provider(person)
fake.add_provider(job)
fake.add_provider(address)
fake.add_provider(date_time)
def generate(N=10):
    for i in range(40):
        first = fake.first_name()
        last = fake.last_name()
        description = fake.text()
        job_position = fake.job()
        date = fake.date(pattern="%Y-%m-%d", end_datetime=None)
        email = fake.email()
        country = fake.country()
        user_obj = User.objects.get_or_create(first_name=first, last_name=last, description=description, job_position=job_position,email=email,country=country,date_joined =date)[0]


if __name__ == '__generate__':
    print('Filling random data')
    generate(50)
    print('Filling Done')
