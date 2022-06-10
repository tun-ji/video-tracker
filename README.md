# Endpoints

## List Videos
`GET api/videos`

Authentication required.

Returns all videos belonging to a logged in user filtered by most recent date, by default. It can be queried:

- Filtered by ID: `?id=1`
- Limit number of videos: `?limit=5`
- Filtered by status: `?status=published`
- Filtered by channel: `?channel=Tomilola`
- Filtered by sponsors: `?sponsor=nest`


## Create a Video Entry
`POST api/videos`

Example request body: 
```
{
  "video": {
      "vid_ID": 1,
      "thumbnail": thumb.png,
      "title": "Making APIs",
      "status": "Writing in Progress",
      "date": 10/06/2022,
      "sponsor": ["nest","git","github"],
      "tags": ["programming","nestjs","typescript"]
      "url": "https://www.youtube.com/",
      "channel": "Tomilola"
   }
}
```
Authentication required, returns the video info

## Update a Video Entry
`PUT api/videos/:slug`

Example request body: 
```
{
  "video": {
      "vid_ID": 1,
      "status": "Published",
   }
}
```
Authentication required, returns the updated video info

## Delete a Video Entry
`DELETE /api/videos/:slug`

Authentication required

## Return all the tasks for a Video
`GET /api/videos/:slug/tasks`

Authentication required 

Can be filtered by completion status

- Filtered by status: `?done=true`

## Registration
`POST /api/users`

Example request body
```
{
  user: {
    "firstname": "Tomi",
    "lastname": "Ade",
    "username": "tomade",
    "email": "a@b.com",
    "password": "abc"
  }
}
```
No authentication required, returns a user. All fields are required 

## Authentication
`POST /api/users/login`




Example request body:
```
{
  "user":{
    "email": "a@b.com",
    "password": "abc"
  }
}
```
No authentication required, returns a User

Required fields: `email`, `password`
















