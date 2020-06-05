# image_search_flickr
Search images by latitude &amp; longitude of a place or by the name of a place

## How to run the application:
### Bringing Django API up with Docker
1. Clone the git repo `git clone https://github.com/mfsi-subham/image_search_flickr.git`
2. Run `cd image_search_flickr/api/picture_search_api/picture_search_api/`
3. Create `.env` file for Django application (For example look .env.example file)
4. Run `cd ../` and then Build the docker `sudo docker-compose build` 
5. Bring the docker up by `nohup sudo docker-compose up &`
<br/>

### Bringing Frontend React APP up
1. Run `cd ../../frontend/picture_search_user_interface/`
2. Create .env file and edit first 2 options <br />
       - For option 1 add flickr api secret key. Get your api key and secret from [Flickr Api](https://www.flickr.com/services/api/keys/) <br />
       - For option 2 add API_URL (for local develoment with Docker url is `http://0.0.0.0.:8000/graphql/`) <br />
3. Now run `sudo npm install` then `sudo npm start`
4. Go to `localhost:3000` from your browser  to see the screen

### For Demo please visit (https://flickr-image-search.firebaseapp.com/)

