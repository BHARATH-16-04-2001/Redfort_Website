from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, MenuItemViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'menu', MenuItemViewSet)

urlpatterns = router.urls
