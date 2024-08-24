from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Note
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .mailjet_integration import send_bulk_emails
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
        
class NoteDelete(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)

# mailing functionalities
@csrf_exempt
def send_emails_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender_email = data.get('sender_email')
            recipient_emails = [{'email': email, 'name': ''} for email in data.get('recipient_emails', [])]
            subject = data.get('subject')
            body = data.get('body')

            status_code, response = send_bulk_emails(sender_email, recipient_emails, subject, body)
            return JsonResponse({'status_code': status_code, 'response': response})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=400)

