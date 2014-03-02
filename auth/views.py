# Create your views here.
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout



def login_user(request):

    state = "Please enter your Username and Password"
    username = password = ''

    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # state = "You have successfully logged in!"
                return render(request, 'dev_map.html', {'user':username})
            else:
                state = "Your account is not active, please contact the site administrator"

        else:
            state = "Your username and/or password were incorrect. "

    return render(request, 'new_auth.html', {'state':state, 'username':username})

def logout_user(request):
    logout(request)
    state = "You have successfully logged out"
    return render(request, 'new_auth.html', {'state':state})


