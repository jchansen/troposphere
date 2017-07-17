Troposphere
===========

Welcome to Troposphere! The front-end for [Atmosphere](https://atmo.cyverse.org).

## Quick Start
Assuming you have `npm`, `virtualenv` and `postgresql` installed, you can run the steps below to get started developing with Troposphere. For more detailed instructions, see the "Installation" section below.

```
# clone the repo
git clone git@github.com:cyverse/troposphere.git

# install python dependencies
cd troposphere
virtualenv env
source env/bin/activate
pip install -r dev_requirements.txt

# create the postgresql database
createdb troposphere_db

# install node dependencies
npm install

# generate static files
cp variables.ini.dist variables.ini
./configure

# run migrations against the database
./manage.py migrate

# start the webpack server
npm run serve

# start the django server
./manage.py runserver
```

If you navigate to `http://localhost:8000` you should see the Troposphere UI load, pulling assets from the webpack-dev-server running on `http://localhost:8080`.

## Installation
Troposphere is a [Django](https://www.djangoproject.com/) project that serves a [React](https://facebook.github.io/react/) application for the front-end that's built using [Webpack](https://webpack.js.org/). The steps below will walk you through the process of cloning the repo and getting it running so you can begin to work in the JavaScript application.

### Pre-requisites
The following steps assume you already have `npm`, `virtualenv` and `postgresql` installed, and have some familiarity using each of them.

### 1. Clone the Repo
Start by cloning this repository:

```
git clone git@github.com:cyverse/troposphere.git
```

Once that process completes, navigate into the project, where we will run the remaining steps.

```
cd troposphere
```

### 2. Install Python Dependencies
With the project cloned, we need to set up our Python environment and download dependencies. First, setup the virtual environment and activate it:

```
virtualenv env
source env/bin/activate
```

Next, install the development dependencies:

```
pip install -r dev_requirements.txt
```

While you *can* run the project using just the regular dependences (requirements.txt) they won't be sufficient to configure the project or run the tests.

### 3. Install Node Dependencies
Before we can build the JavaScript application, we need to install the Node dependencies. Run this command to do so:

```
npm install
```

This will place all JavaScript-centric dependencies in a `node_modules` folder at the root of the project.

### 4. Configure the Project
There are a few files that need to be created before Troposphere can be built, such as:

```
themeImagesPath.js
troposphere/settings/local.py
troposphere/static/css/app/variables.scss
troposphere/static/theme/theme.json
```

The `configure` script at the root of the project will automatically generate those files, based on values provided in the `variables.ini` file. For our needs, the default values are sufficient. First, create a copy of the `variables.ini.dist` file at the root of the project and name it `variables.ini`:

```
cp variables.ini.dist variables.ini
```

Next, run the configure script to generate the neccesary files

```
configure
```

### 5. Create the PostgreSQL Database
Troposphere uses PostgreSQL for the database, and due to some database-specific migrations, you'll need to install it in order to build the project. Assuming it's already installed, run this command to create a database called `troposphere`:

```
createdb troposphere_db
```

With the database created, the next step is to run the migrations to generate the structure the application needs.

> While we won't be using the database for local development on the JavaScript application, we still need to run migrations before the server will start.

```
./manage.py migrate
```

### 6. Start the Webpack Server
With the files created, we can now start the webpack server to build and serve the JavaScript application. Run the following command:

```
npm run server
```

This will cause the webpack development server to spin up on `http://localhost:8080`, and generate a manifest file that describes all the files it can serve. That will will look something like this:

```json
{
    "status": "done",
    "chunks": {
        "vendor": [
            {
                "name": "bundle.vendor.js",
                "publicPath": "http://localhost:8080/assets/bundles/bundle.vendor.js",
                "path": "/Users/username/cyverse/troposphere/troposphere/assets/bundles/bundle.vendor.js"
            }
        ],
        "app": [
            {
                "name": "bundle.app.js",
                "publicPath": "http://localhost:8080/assets/bundles/bundle.app.js",
                "path": "/Users/username/cyverse/troposphere/troposphere/assets/bundles/bundle.app.js"
            }
        ],
        "public": [
            {
                "name": "bundle.public.js",
                "publicPath": "http://localhost:8080/assets/bundles/bundle.public.js",
                "path": "/Users/username/cyverse/troposphere/troposphere/assets/bundles/bundle.public.js"
            }
        ]
    },
    "publicPath": "http://localhost:8080/assets/bundles/"
}
```

### 7. Start the Django Server
With the `webpack-stats.json` manifest file created, we can now start the Django web server. You can do that using this command (you'll need to do this in a new console):

```
./manage.py runserver
```

At this point, if you navigate to `http://localhost:8000` you should see the Troposphere UI load, pulling assets from the webpack-dev-server running on `http://localhost:8080`. The application should look something like this:

![atmosphere](https://user-images.githubusercontent.com/2637399/28301235-f7a53aa4-6b39-11e7-9010-abf0aa6c863d.png)

### Aside: How are Django and Webpack related?
Django is responsible for serving the `index.html` file when the user navigates to the application, but it doesn't actually know what the URL is to the CSS and JavaScript files it should serve. The `webpack-stats.json` file we highlighted earlier is what teaches Django what the URL to the files is.

The `index.html` template (located at `troposphere/templates/index.html`) contains lines that look like this:

```
{% render_bundle 'app' 'js' %}
```

The `render_bundle` tag uses the [django-webpack-loader](https://github.com/ezhome/django-webpack-loader) plugin to inspect the `webpack-stats.json` file for the `app` bundle and copies the URL into the `index.html` file. That's how Django knows how to construct the webpage, and where the assets are located that we want the user to see.

### 8. Accessing the Logged In View
Currently you can access the public experience, but if you click the "login" button you'll notice you get dumped onto the "Forbidden" page. By default, this Troposphere setup will try to communicate with the production Atmosphere API located at https://atmo.cyverse.org. The "Forbidden" page is what happens when the user's access token is rejected (i.e. they tried to fetch data from the API and the API returned a 403 UNAUTHORIZED).

To fix this, and allow us to see the logged in experience, we're going to track down an access token and tell Django to serve it to us, which will emulate the real "logged in" behavior.

To get an access token, first log into Atmopshere https://atmo.cyverse.org. Next open up the developer tools, and enter `access_token` into the console. Hit enter, and you should see the value of your access_token, which will look something like this:

```
TGT-9999-ABCDEF-auth.iplantc.org
```

Copy this value, and open up the `variables.ini` file at the root of your project. Find the setting for `MOCK_ACCESS_TOKEN` and paste the value there, like this:

```
MOCK_ACCESS_TOKEN = "TGT-9999-ABCDEF-auth.iplantc.org"
```

Next, re-run the `configure` script (to regenerate the `local.py` file) and restart the server:

```
# stop the server, then...
./configure
./manage.py runserver
```

Now if you refresh the browser, you should see the logged in experience, which will look something like this:

![atmosphere 2](https://user-images.githubusercontent.com/2637399/28301533-26731610-6b3c-11e7-92d9-1aa9b4d9969d.png)

### And now...start hacking!

Which these steps completed, you can now start developing the Troposphere application. The JavaScript application is stored in `troposphere/static`, and changes to any of the files will cause the application to automatically be re-built and the webpage will refresh. Changes to any of the CSS files will cause the application to update *without* a page refresh (hot-reloading).

## Django Note: Requirements
The `*requirements.txt` files are generated using [pip-tools](https://github.com/jazzband/pip-tools). See [REQUIREMENTS.md](REQUIREMENTS.md) for instructions on using pip-tools and upgrading packages in Troposphere.

Install the required python packages
```
pip install -r requirements.txt
```

A separate environment is provided for developers
```
pip install -r dev_requirements.txt
```

## Development

### Quick feedback

The `webpack-dev-server` will serve new bundles to a browser when files change.

It has the following features:

- Changes result in a browser refresh (you know they are propagated)
- The bundle is served from memory not disk
- Small changes result in small compiles

### Linting

See `LINT.md`

### Coding Style

- Use an [EditorConfig](http://editorconfig.org/) plugin to leverage the project's `.editorconfig`

#### Git Hooks
The hooks below give helpful hints about common tasks like migrating, or installing dependencies.

Link the following hook to get these hints after pulling in code. From the root of the project:

```bash
ln -fs ../../extras/hooks/post-merge.hook .git/hooks/post-merge
```
