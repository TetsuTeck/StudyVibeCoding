from rest_framework import generics
from .models import Todo, ChecklistItem
from .serializers import TodoSerializer, ChecklistItemSerializer

class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class ChecklistItemListCreate(generics.ListCreateAPIView):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer

    def get_queryset(self):
        return ChecklistItem.objects.filter(todo=self.kwargs['todo_pk'])

    def perform_create(self, serializer):
        todo = Todo.objects.get(pk=self.kwargs['todo_pk'])
        serializer.save(todo=todo)

class ChecklistItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer
