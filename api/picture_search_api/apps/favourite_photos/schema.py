import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from apps.favourite_photos.models import FavouritePhoto


class FavouritePhotoType(DjangoObjectType):
    class Meta:
        model = FavouritePhoto


class Query(ObjectType):
    """
    Query the db for FavouritePhotos
    """
    favourite_photos = graphene.List(FavouritePhotoType)

    def resolve_favourite_photos(self, info, **kwargs):
        return FavouritePhoto.objects.all()


class FavouritePhotoInput(graphene.InputObjectType):
    id = graphene.ID()
    photo_url = graphene.String(required=True)


class CreateFavouritePhoto(graphene.Mutation):
    """
    To create a new FavouritePhoto
    """
    class Arguments:
        input = FavouritePhotoInput(required=True)

    ok = graphene.Boolean()
    favourite_photo = graphene.Field(FavouritePhotoType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        favourite_photo_instance = FavouritePhoto(photo_url=input.photo_url)
        favourite_photo_instance.save()
        return CreateFavouritePhoto(ok=ok,
                                    favourite_photo=favourite_photo_instance)


class DeleteFavouritePhoto (graphene.Mutation):
    """
    To remove a photo from favourite list
    """
    class Arguments:
        input = FavouritePhotoInput(required=True)
    ok = graphene.Boolean
    favourite_photo = graphene.Field(FavouritePhotoType)

    @staticmethod
    def mutate(root, info, input=None):

        favourite_photo_instance = FavouritePhoto.objects\
            .get(photo_url=input.photo_url)

        if favourite_photo_instance:
            favourite_photo_instance.delete()
            return DeleteFavouritePhoto(
                favourite_photo=favourite_photo_instance
                )
        return DeleteFavouritePhoto(favourite_photo=None)


class Mutation(graphene.ObjectType):
    create_favourite_photo = CreateFavouritePhoto.Field()
    delete_favourite_photo = DeleteFavouritePhoto.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
