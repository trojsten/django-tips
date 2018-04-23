from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from tips.models import TipOfDay

tips = [
    {
        'title': 'First Tip',
        'text': 'This is a first tip',
        'active': True,
        'for_staff': True,
        'for_nonstaff': False
    },
    {
        'title': 'Second Tip',
        'text': 'Second Tipperoo',
        'active': True,
        'for_staff': True,
        'for_nonstaff': False
    },
    {
        'title': 'Third Tip',
        'text': 'Third tap',
        'active': True,
        'for_staff': True,
        'for_nonstaff': False,
    },
]

class TipsTestCase(APITestCase):

    def setUp(self):
        self.credentials = {
            'username': 'tester',
            'password': 'password',
        }
        self.admin_credentials = {
            'username': 'admin',
            'password': 'password',
        }
        user = User.objects.create_user(username=self.credentials['username'])
        user.set_password(self.credentials['password'])
        user.save()

        User.objects.create_superuser(
            self.admin_credentials['username'],
            'example@example.com',
            self.admin_credentials['password']
        )

        TipOfDay.objects.create(**tips[0])
        TipOfDay.objects.create(**tips[1])

    def test_tip_being_displayed(self):
        self.client.login(**self.admin_credentials)
        response = self.client.get('/tips/get_current_tip/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['title'], tips[0]['title'])
        self.assertEqual(response.json()['rendered_text'], '<p>This is a first tip</p>')

    def test_mark_as_read(self):
        '''
        User can mark the tip as read and get a subsequently get a new tip
        '''
        self.client.login(**self.admin_credentials)
        response = self.client.get('/tips/get_current_tip/')
        tip_id = response.json()['id']

        response = self.client.post('/tips/mark_tip_as_read/' + str(tip_id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get('/tips/get_current_tip/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['title'], tips[1]['title'])
        self.assertEqual(response.json()['rendered_text'], '<p>Second Tipperoo</p>')

    def test_user_cannot_see(self):
        self.client.login(**self.credentials)
        response = self.client.get('/tips/get_current_tip/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, None)
