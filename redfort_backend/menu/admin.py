
from django.contrib import admin
from .models import Category, MenuItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'food_type', 'price', 'is_available']
    list_filter = ['category', 'food_type', 'is_available']
    search_fields = ['name']
