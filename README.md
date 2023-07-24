# FairAssistanceQueue

# Sources
- Fair Assistance Queue name - thanks Prof O!

# Setup

## Install flask:
- Inside `faq_server` folder directory run
`pip3 install Flask`
- All done.  Check to see if it's there:\
`python3 -c "import flask; print(flask.__version__)"`

## Setup Frontend
- Inside `faq-client` install yarn: `npm install -g yarn`

## Install dependencies
- inside `faq_server`: 
    - CORS package: `pip install -U flask-cors` to install the `CORS` package used in `faq_server.py`
    - flask_sqlalchemy: `pip install Flask-SQLAlchemy`
- inside `faq-client`:
    - run the `yarn` command to update project with relevant packages.

# Running the app
- Inside `faq_server` run: `flask --app faq_server --debug run`
  - if this doesn't work, run `FLASK_APP=__init__.py python3 -m flask run`
  - ensure the app is running off of port `5000` since this is the port the front end is sending requests to.
- Inside `faq-server` run: `yarn dev`
  - to see the web app in the browser, go to the url specified in the terminal.

# Once the app is running
- For a demonstration, enter the course code `CPTR-101` and the admin key `9edc9e13-aa87-4c9e-8ac4-d14e7857abea`. This admin key will work wherever 
an admin key is specified anywhere on the site.

# Important notes
- If for some strange reason things are not updating, try clearing the cache on the browser and refreshing. For example, this 
is accomplished on mac by simultaneously holdind down `shift` + `command` + `R`.
- Although normally bad practice, `.env` files are added here to make this project easy to set up.
