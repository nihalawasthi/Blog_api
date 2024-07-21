from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('create/', TemplateView.as_view(template_name='create.html')),  # Serve the create.html file
    path('view/', TemplateView.as_view(template_name='view.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)