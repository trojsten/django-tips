from django.contrib import admin

from tips.models import TipOfDay


class TipOfDayAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'text', 'active')
    readonly_fields = ('id',)

admin.site.register(TipOfDay, TipOfDayAdmin)
