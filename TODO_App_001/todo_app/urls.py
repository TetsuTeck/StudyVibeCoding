from django.urls import path
from .views import TodoListCreate, TodoRetrieveUpdateDestroy, ChecklistItemListCreate, ChecklistItemRetrieveUpdateDestroy

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroy.as_view(), name='todo-retrieve-update-destroy'),
    path('todos/<int:todo_pk>/checklist-items/', ChecklistItemListCreate.as_view(), name='checklist-item-list-create'),
    path('todos/<int:todo_pk>/checklist-items/<int:pk>/', ChecklistItemRetrieveUpdateDestroy.as_view(), name='checklist-item-retrieve-update-destroy'),
]