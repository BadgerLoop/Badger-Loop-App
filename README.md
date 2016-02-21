# Badger-Loop-App

This is the Badger Loop app to be used for PR and to show how badass the Badger Loop software team is.  This app is built using [Ionic framework](http://ionicframework.com/) and [AngularJS](https://angularjs.org/).  

###Features to be added (WIP)

* **Message the pod AI** - message the pod and receive descriptions and updates and info on each of the subsystems. (Likely to use [Exis](http://www.exis.io/) as a backend for this)
* **Project updates** - An events feed that gives updates on pod construction and development
* **Team Member descriptions/blog posts** - Team members bios or blog posts about about Badger Loop can be incorporated in the app.
*  **Virtual Reality** - Add the VR from the website to the app (also have a back button)
* **Donations/Funding** -  Allow users to donate to Badger Loop.
* **Picture/Graphics gallery** -  Cool pictures, videos or 3D models!

Feel Free to add more to this list of features to be added if you have any good ideas!!

##Getting Started

install ionic:

	 npm install -g cordova ionic

View the app in your browser:

	ionic serve 
or

	ionic serve --lab

## Build

To add the Android platform to the app:

	ionic platform add android
	
Install  [crosswalk web runtime](https://crosswalk-project.org/) to the android build (this allows the app to run more consistently on a wider variety of android devices)

	ionic browser add crosswalk

To add the IOS platform to the app

	ionic platform add ios

* Note: With IOS9 there is are new transport security settings/policies (Thanks apple for being such hard asses) so we may encounter problems with pulling data from remotes sources.  Contact Kyle Grieger or Chase Roosin if you have issues.

To build the app 

	ionic platform build ios

or

	ionic platform build android

* Note to build a signed production version of the app to submit to the app store please contact Kyle Grieger or Chase Roosin.

To emulate the app follow the instructions found [here](http://ionicframework.com/docs/guide/testing.html).



##Misc

* If anyone wants/needs access to the Badger Loop app Ionic account please contact Kyle Grieger (Kgrieger on slack).
* Ionic has a feature called [Ionic Deploy](http://docs.ionic.io/docs/deploy-from-scratch) which will let us push continuous updates to the app without having to resubmit new versions to the app store(s) that will be implemented in the near future.
* Also you can use [ionic lab](http://lab.ionic.io/) to add/work on the app which can make building/testing/adding plugins much easier.
* We want to get a simplistic cool looking app published on the app store as soon as possible and we can add more and more cool stuff to it with ease via ionic deploy.