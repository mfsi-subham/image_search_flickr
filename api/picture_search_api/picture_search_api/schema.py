import graphene
import apps.coordinates.schema as coordinate_schema
import apps.favourite_photos.schema as favourite_photos_schema


class Query(coordinate_schema.Query,
            favourite_photos_schema.Query,
            graphene.ObjectType):
    """
    This class will inherit from multiple Queries
    as we begin to add more apps to our project
    """
    pass


class Mutation(coordinate_schema.Mutation,
               favourite_photos_schema.Mutation,
               graphene.ObjectType):
    """
    This class will inherit from multiple Queries
    as we begin to add more apps to our project
    """
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
