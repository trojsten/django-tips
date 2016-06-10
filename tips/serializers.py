from rest_framework import serializers

from .models import TipOfDay


class TipOfDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TipOfDay
        fields = ('id', 'title', 'rendered_text')
