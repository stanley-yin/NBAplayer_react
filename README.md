💻 Run in local
1. Clone the repository

git clone https://github.com/NTUCourse-Neo/ncn-frontend.git
cd my-app


cp .env.defaults .env
Then paste your keys into the file. Please refer to the table below.

KEY	Description	Default Value
REACT_APP_API_ENDPOINT	Backend API Endpoint URL	http://localhost:5000/api/
REACT_APP_API_VERSION	Backend API Endpoint Version	v1
REACT_APP_AUTH0_DOMAIN	Auth0 Domain	
REACT_APP_AUTH0_CLIENT_ID	Auth0 Single Page Application Client ID	
REACT_APP_SELF_API_AUDIENCE	NTUCourse-Neo API Identifier	
REACT_APP_RECAPTCHA_CLIENT_KEY	reCAPTCHA Service Client Key	
REACT_APP_GA_TRACKING_ID	Google Analytics Tracking ID (Started with UA-)	
2. Install required dependencies

yarn

3. Run the server

yarn start
4. Open the browser and go to http://localhost:3000/

and you should see the website running.

