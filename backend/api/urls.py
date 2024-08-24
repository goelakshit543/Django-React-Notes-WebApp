from django.urls import path
from . import views
from .views import send_emails_view

urlpatterns=[
    path('notes/',views.NoteListCreate.as_view(),name='note-list'),
    path('notes/delete/<int:pk>/',views.NoteDelete.as_view(),name='delete-note'),
    path('send-emails/', send_emails_view, name='send_emails'),
]