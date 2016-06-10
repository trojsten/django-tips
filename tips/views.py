from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import TipOfDay
from .serializers import TipOfDaySerializer


@api_view(['GET'])
def get_current_tip_of_day(request):
    user = request.user
    if user.is_anonymous() or not user.is_staff:
        return Response()
    try:
        tip = TipOfDay.objects.filter(active=True).exclude(seen_by=user.pk).order_by('id')[0]
        serializer = TipOfDaySerializer(tip)
        return Response(serializer.data)
    except IndexError:
        return Response()
