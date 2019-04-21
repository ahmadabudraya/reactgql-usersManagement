import graphene
from graphene_django.types import DjangoObjectType
from users.schema import Query as users_query
from users.schema import CreateUser 
from users.schema import UserType 
import users.schema

class Query(users.schema.Query, graphene.ObjectType):
    pass
    

class Mutation(users.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)