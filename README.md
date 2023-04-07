# Project Title

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ... 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Abdulqadir Abuharrus, call me Abdo. I can't affored my hobbies.
* My name is Mika! I really love BC's great outdoors 
* My name is Victor Liu, and my favourite animals are sheep even though they are incredibly dumb.
* My name is Emma. I love hiking and biking!

	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.3 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Unsplash for stock photos
* Google Material Icons for icons
* Mapbox for our map feature

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Visit our page: https://revival-1800-202310-dtc01.web.app/
* Sign up or Login
* Land on our landing/ main page
* (1) View Alerts
* (2) View Map alerts
* (3) View and create community board posts
* Logout when you are finished with the app

## 5. Known Bugs and Limitations
Here are some known bugs:
* Our top navbar hovers over the page instead of taking actual space. Our temporary workaround is to place an empty block for the navbar to cover..
* Delete button does not delete the actual post but the most recent post made.
* Our trending section for our communityboard doesn't actually populate the cards with the most clicks, but randomly from the DB.

## 6. Features for Future
What we'd like to build in the future:
* a Messaging component for users to interact with each other, especially with the community posts.
* CommunityBoard posts can be linked to our map widget, giving a general radius where a post originated from.
* News can be scrapped from the internet (linked to actual articles).
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore                # Git ignore file
├── index.html                # landing HTML file, this is what users see when you come to url
├── login.html                # login and signup page
├── main.html                 # landing page after user login
├── README.md                 # README for this project
│
│------It has the following subfolders and files------
├── .git                      # Folder for git repo
├── images                    # Folder for images
│   ├── footer                # Folder for footer images
│   └── (39) image files
│
├── partials                  # Folder for templates to be used across our pages
│   └── footer.html           # Template for app's footer bar
│   └── navbar.html           # Template for app's top navbar
│   └── oldPageTemplate.html  # For reference purposes
│ 
├── scripts                   # Folder for scripts
│   └── authentication.js     # For login and authentication
│   └── communityboard.js     # For communityboard page
│   └── createpost.js         # To create posts for communityboard
│   └── editpost.js           # To edit own posts in communiboard
│   └── index.js              # For index landing page
│   └── main.js               # For main landing page after user login
│   └── map.js                # For map page
│   └── myListings.js         # Page to view your own posts in communityboard
│   └── script.js             # Script to logout
│   └── template.js           # To display our templates
│   └── viewListing.js        # To view post details in communityboard
│
│
│
├── styles                   # Folder for styles
│   └── style.css            # Our style sheet for all things CSS
│ 


```


