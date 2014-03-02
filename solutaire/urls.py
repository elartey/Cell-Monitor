from django.conf.urls import patterns, url, include

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
#    (r'^$', 'auth.views.main_page'),
    url(r'^login/$', 'auth.views.login_user'),
    url(r'^logout/$', 'auth.views.logout_user'),
    # Examples:
    # url(r'^$', 'solutaire.views.home', name='home'),
    # url(r'^solutaire/', include('solutaire.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)
