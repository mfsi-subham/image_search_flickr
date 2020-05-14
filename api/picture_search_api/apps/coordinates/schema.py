import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from apps.coordinates.models import Coordinate


class CoordianteType(DjangoObjectType):
    class Meta:
        model = Coordinate


class Query(ObjectType):
    """
    Query the db for Coordinates
    """
    coordinate = graphene.Field(CoordianteType, id=graphene.Int())
    coordinates = graphene.List(CoordianteType)

    def resolve_coordinate(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Coordinate.objects.get(pk=id)

        return None

    def resolve_coordinates(self, info, **kwargs):
        return Coordinate.objects.all()


class CoordinateInput(graphene.InputObjectType):
    id = graphene.ID()
    longitude = graphene.Float(required=True)
    latitude = graphene.Float(required=True)
    place_name = graphene.String(required=True)


class CreateCoordinate(graphene.Mutation):
    """
    To create a new coordinate
    """
    class Arguments:
        input = CoordinateInput(required=True)

    ok = graphene.Boolean()
    coordinate = graphene.Field(CoordianteType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        coordinate_instance = Coordinate(longitude=input.longitude,
                                         latitude=input.latitude,
                                         place_name=input.place_name)
        coordinate_instance.save()
        return CreateCoordinate(ok=ok, coordinate=coordinate_instance)


class UpdateCoordinate(graphene.Mutation):
    """
    Update an existing coordinate
    """

    class Arguments:
        id = graphene.Int(required=True)
        input = CoordinateInput(required=True)

    ok = graphene.Boolean()
    actor = graphene.Field(CoordianteType)

    @staticmethod
    def mutate(root, info, id, input=None):
        ok = False
        coordinate_instance = Coordinate.objects.get(pk=id)
        if coordinate_instance:
            ok = True
            coordinate_instance.longitude = input.longitude
            coordinate_instance.latitude = input.latitude
            coordinate_instance.place_name = input.place_name
            coordinate_instance.save()
            return UpdateCoordinate(ok=ok, coordinate=coordinate_instance)

        return UpdateCoordinate(ok=ok, coordinate=None)


class Mutation(graphene.ObjectType):
    create_coordinate = CreateCoordinate.Field()
    update_coordinate = UpdateCoordinate.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
