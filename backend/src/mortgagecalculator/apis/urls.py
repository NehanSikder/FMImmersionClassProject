from django.conf.urls import include, url

from apis import views

urlpatterns = [
    url(r'^getData$', views.GetDataView.as_view()),
    url(r'^postData$', views.PostDataView.as_view()),
    url(r'^postPic$', views.PostPictureView.as_view()),
]

