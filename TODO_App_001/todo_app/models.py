from django.db import models

class Todo(models.Model):
    subject = models.CharField(max_length=200)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return self.subject

class ChecklistItem(models.Model):
    todo = models.ForeignKey(Todo, related_name='checklist_items', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.text
