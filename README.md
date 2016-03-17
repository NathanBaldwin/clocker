# Clocker

Front-End Capstone project for Nashville Software School

Clocker is the tool I wish existed during my time in the nonprofit world. This time-keeping app enables organizations to track and analyze project-related human resource allocation. Use it to track volunteerism for multiple grant initiatives, client participation in various programs, or employee hours spent on different tasks. Get rid of those trusty time sheets and sign-in clipboards!

Built using JavaScript, AngularJS, Bootstrap, Firebase, Moment.js and deployed via Digital Ocean.

## Note:

This version of Clocker is a prototype, and is currently being cleaned up, commented, and refactored. Visit my clocker 2.0 repository to see current progress.

##How the app works:

There currently two main views: the sign in/sign out view and the 'backend' view.

Click on the button in the top right of the sign in/sign out view to go to the backend view.

###Sign in/Sign Out:

Individuals enter their email address, select or create a new group and activity.

Upon clicking 'Sign In', the app searches the database to determine whether or not this individual has signed in before.

If the individual has signed in previously, the app recognizes their email address and signs them in, creating a time stamp, and listing them on the right side of the screen.

IF the individual is new, they are asked to enter their name, and are added to the database before being 'signed in' with a timestamp.

###Backend View:

Click on the button in the top right of the sign in/sign out view to navigate to the backend view.

Here, you can view the history of all visitors, and key statistics are listed at the top.

Use the filter bar on the left to filter the data and see the statistics update accordingly in real time!

You can filter by name, date range, group, and/or activity to segment the data to taste.



