import graphene
from graphene_django.types import DjangoObjectType
from users.models import User
from graphene import InputObjectType

class UserType(DjangoObjectType):
    class Meta:
        model = User

class Query(graphene.ObjectType):
    
    user = graphene.Field(UserType, id=graphene.Int())
    all_users = graphene.List(UserType)
    
    def resolve_user(self,info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return User.objects.get(pk=id)
        
        return None
    
    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()
'''
class CreateUser(graphene.Mutation):
    class Arguments:
        firstName = graphene.String()
        lastName = graphene.String()
        description = graphene.String()
        email = graphene.String()
        country = graphene.String()
        jobPosition = graphene.String()
        dateJoined = graphene.Date()

    user = graphene.Field(lambda: User)
    
    def mutate(self,info, firstName, lastName, description, email, country, jobPosition, dateJoined):
        user = User.objects.create(first_name=firstName, last_name=lastName, description=description, email=email, country=country, job_position=jobPosition,date_joined=dateJoined)
        return CreateUser(user=user)
'''

class UserInput(graphene.InputObjectType):  
    id = graphene.ID()
    first_name = graphene.String(required=False)
    last_name = graphene.String(required=False)
    #description = graphene.String(required=False)
    email = graphene.String(required=False)
    country = graphene.String(required=False)
    job_position = graphene.String(required=False)
    date_joined = graphene.types.datetime.Date(required=False)


class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True) 

    ok = graphene.Boolean()
    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        user_instance = User(first_name=input.first_name, last_name=input.last_name, email=input.email, country=input.country, job_position=input.job_position, date_joined=input.date_joined)
        user_instance.save()
        return CreateUser(ok=ok, user=user_instance)

class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
    
    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    @staticmethod
    def mutate(root, info, id):
        ok = False
        user_instance = User.objects.get(pk=id)
        if user_instance:
            ok = True
            user_instance.delete()
            return UpdateUser(ok=ok, user=user_instance)
        return UpdateUser(ok=ok, user=None)

class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = UserInput(required=True)
    
    ok = graphene.Boolean()
    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, id, input=None):
        ok = False
        user_instance = User.objects.get(pk=id)
        if user_instance:
            ok = True
            user_instance.first_name = input.first_name
            user_instance.last_name = input.last_name
            user_instance.email = input.email
            user_instance.job_position = input.job_position
            user_instance.country = input.country
            #user_instance.description = input.description
            user_instance.date_joined = input.date_joined
            user_instance.save()
            return UpdateUser(ok=ok, user=user_instance)
        return UpdateUser(ok=ok, user=None)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)




