from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class MenuItem(models.Model):

    FOOD_TYPE = [
        ('Veg', 'Veg'),
        ('Non-Veg', 'Non-Veg'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='items'
    )

    food_type = models.CharField(max_length=10, choices=FOOD_TYPE)

    price = models.DecimalField(max_digits=6, decimal_places=2)

    image = models.URLField()

    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name
