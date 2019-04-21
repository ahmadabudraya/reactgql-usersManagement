from django.contrib import admin
from graphene_django.views import GraphQLView
from django.conf.urls import url, include
from .schema import schema
from django.views.decorators.csrf import csrf_exempt # New library

urlpatterns = [
    url('graphql',csrf_exempt(GraphQLView.as_view(
        graphiql=True,
        schema=schema
    ))),
    url('admin/', admin.site.urls)
]
