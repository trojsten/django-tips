from django.contrib.sites.models import Site
from django.contrib.sites.shortcuts import get_current_site
from django.db.models import Q
from django.shortcuts import Http404, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import TipOfDay
from .serializers import TipOfDaySerializer


@api_view(['GET'])
def get_current_tip_of_day(request):
    user = request.user
    if user.is_anonymous:
        return Response()
    try:
        visibility_filter = {'for_staff': True} if user.is_staff else {'for_nonstaff': True}
        site_filter = None
        if isinstance(get_current_site(request), Site):
            site_filter = Q(sites=None) | Q(sites__id__exact=get_current_site(request).id)

        available_tips = TipOfDay.objects.filter(
            active=True,
            **visibility_filter
        ).exclude(
            seen_by=user.pk,
        ).filter(
            Q(groups=None) |
            Q(groups__in=user.groups.all())
        ).filter(site_filter).order_by('id')
        serializer = TipOfDaySerializer(available_tips[0])
        return Response(serializer.data)
    except IndexError:
        return Response()


@api_view(['POST'])
def mark_tip_as_read(request, tip_id):
    user = request.user
    if user.is_anonymous:
        raise Http404
    tip = get_object_or_404(TipOfDay, pk=tip_id)
    if user.is_staff and not tip.for_staff or not user.is_staff and not tip.for_nonstaff:
        raise Http404
    tip.seen_by.add(user)
    return Response({'status': 'success'})
