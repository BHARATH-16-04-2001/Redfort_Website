import re
from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'phone']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # ✅ Password validation
    def validate_password(self, value):

        pattern = r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$'

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                "Password must contain 8 characters, one capital letter, one number and one special symbol."
            )

        return value

    # ✅ Confirm password validation
    def validate(self, data):

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")

        return data

    # ✅ Create user
    def create(self, validated_data):
        phone = validated_data.pop('phone')
        validated_data.pop('confirm_password')
        
        user = User.objects.create_user(**validated_data)
        
        # save phone in profile
        user.profile.phone = phone
        user.profile.save()
        
        return user
