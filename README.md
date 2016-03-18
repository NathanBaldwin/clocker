# Clocker

Front-End Capstone project for Nashville Software School

Clocker is the tool I wish existed during my time in the nonprofit world. This time-keeping app enables organizations to track and analyze project-related human resource allocation. Use it to track volunteerism for multiple grant initiatives, client participation in various programs, or employee hours spent on different tasks. Get rid of those trusty time sheets and sign-in clipboards!

Built using JavaScript, AngularJS, Bootstrap, Firebase, Moment.js and deployed via Digital Ocean.

### Note:

This version of Clocker is a prototype, and is currently being cleaned up, commented, and refactored. Visit my clocker 2.0 repository to see current progress.

##How It Works:

There currently two main views: the sign in view, and the 'backend' view (accessible via the button in the top right corner of the Sign In view)

####Sign in:

In order to sign in, individuals/visitors enter their email address and select from two dropdowns: the group they are with, and the activity/reason for which they are presumably visiting your business/organization.

Upon clicking 'Sign In', the app searches the database to determine whether or not this individual has signed in before.

If the individual has signed in previously, the app recognizes their email address and signs them in, creating a time stamp, and listing them as 'signed in' on the right side of the screen.

If the individual is new, they are asked to enter their name, and are added to the database before being 'signed in' with a timestamp.

####Visit the Backend View to Filter and Segment Your data!

Click on the button in the top right of the sign in/sign out view to navigate to the backend view.

Here, you can view the history of all visitors, as well as key statistics listed at the top.

Use the filter bar on the left to filter the data and see the statistics update accordingly in real time!

You can filter by name, date range, group, and/or activity to segment the data according to you needs.
