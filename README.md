# mini-wp

## For developers

Server setup:
1. Run "npm install" in the terminal to install the required package
2. Create a .env file inside server folder, refer to .env-template for the required environment variables
3. Run "npm run dev" in the terminal for developers or "npm run start" for users

Client setup:
1. Run "npm install -g live-server" in the terminal if you don't have it
2. Run "live-server --host=localhost" in the terminal

## List of user routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
user/register    | POST   | body(name, email, password) | On success a new user will be created in the                                                                    database, an error will be shown if fail
user/login       | POST   | body(email, password)       | On success a token will be generated in local                                                                   storage and a list of articles will be appear, an                                                               error will be shown if fail
user/googleLogin | POST   | body(id_token)              | You will be asked to authenticate through google,                                                               on success you will be able to see a list of articles

## List of article routes:

Route         | HTTP   | Request                                  | Response
------------- | ------ | ---------------------------------------- | --------------------------------------------
articles/user | GET    | header(access_token)                     | On success the user's articles                                                                                  will be shown, no articles will                                                                                 be shown if the user has not                                                                                    written any articles yet
articles/     | GET    | header(access_token)                     | On success a list of article will                                                                               be shown, no articles will be                                                                                   shown if there is nothing in the database yet
articles/     | POST   | header(access_token), body(title:String,                                                                        content:String, featured_image:String,                                                                          author:ObjectId)                         | On success the featured image will be                                                                           uploaded to google cloud storage and the                                                                        article data will be saved in the database
articles/:id  | GET    | header(access_token), params(_id)        | On success an article with a specific id                                                                        will be returned
articles/:id  | PUT    | header(access_token), params(_id),                                                                              body(title:String, content:String,                                                                              featured_image:String, author:ObjectId)  | On success an article with a specific id                                                                        will be updated
articles/:id  | DELETE | header(access_token), params(_id)        | On success an article with a specific id                                                                        will be deleted