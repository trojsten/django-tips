from django.shortcuts import get_object_or_404, Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import TipOfDay
from .serializers import TipOfDaySerializer


@api_view(['GET'])
def get_current_tip_of_day(request):
    user = request.user
    if user.is_anonymous():
        return Response()
    try:
        available_tips = TipOfDay.objects.filter(
            active=True
        ).exclude(seen_by=user.pk).order_by('id')
        serializer = TipOfDaySerializer(available_tips[0])
        return Response(serializer.data)
    except IndexError:
        return Response()


@api_view(['POST'])
def mark_tip_as_read(request, tip_id):
    user = request.user
    if user.is_anonymous() or not user.is_staff:
        raise Http404
    tip = get_object_or_404(TipOfDay, pk=tip_id)
    tip.seen_by.add(user)
    return Response({'status': 'success'})
