from django.contrib import admin
from django.utils.encoding import force_text
from django.utils.translation import ugettext_lazy as _

from tips.models import TipOfDay


class TipOfDayAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'text', 'active', 'for_staff', 'for_nonstaff', 'get_sites',
                    'get_groups')
    list_filter = ('active', 'for_staff', 'for_nonstaff', 'sites', 'groups')
    readonly_fields = ('id',)

    def get_sites(self, obj):
        if obj.sites.all().exists():
            return ', '.join(force_text(x) for x in obj.sites.all())
        else:
            return _('ALL')
    get_sites.short_description = _('sites')

    def get_groups(self, obj):
        if obj.groups.all().exists():
            return ', '.join(force_text(x) for x in obj.groups.all())
        else:
            return _('ALL')
    get_sites.short_description = _('groups')

admin.site.register(TipOfDay, TipOfDayAdmin)
