from rest_framework import serializers
from .models import Todo, ChecklistItem

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = ('id', 'todo', 'text', 'completed')

class TodoSerializer(serializers.ModelSerializer):
    checklist_items = ChecklistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Todo
        fields = ('id', 'subject', 'start_date', 'end_date', 'status', 'checklist_items')