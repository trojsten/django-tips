from rest_framework import serializers

from .models import TipOfDay


class TipOfDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TipOfDay
        fields = ('id', 'title', 'rendered_text')
        # text = serializers.CharField(source='rendered_text', read_only=True)
