define({ "api": [
  {
    "type": "put",
    "url": "firebase.storage().ref().child(`avatar/${nameImage}`)/",
    "title": "Image Uploaded",
    "name": "changeAvatar",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>UserInfo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "Avatar",
            "description": "<p>changed from User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"User\": \"Avatar Changed success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"resultPermissionCamera === 'denied'\": \"Process Gallery Suspense\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/components/Account/InfoUser.jsx",
    "groupTitle": "User"
  }
] });
