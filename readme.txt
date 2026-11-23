--Readme document for Bryan Dao, bryandd1@uci.edu, 80835584--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
~15 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
N/A


5. Is there anything special we need to know in order to run your code?
Installed @ionic/storage-angular to use persistent storage as the additional feature


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
The application was not designed with any particular type of user in mind, but it could appeal to someone who desires an informative but simple interface.


7. Did you design your app specifically for iOS or Android, or both?
Most of the widgets/component design are based on iOS.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
A person can log overnight sleep when they wake up (log both sleep and wake up times simultaneously). I supported logging this way as
it would be more fluid when considering if a user would like to change the values, for example if a user initiated a log but didn't fall 
asleep until some time after.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
A person can log sleepiness similarly to the overnight logs, and was done to keep the UI design consistent.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
A person can view the logged data within the two tabs at the bottom of the screen, split by Overnight/Sleepiness logs. This was done
as it was the simplest and most intuitive way to create a history page.


11. Which feature choose--using a native device resource, backing up logged data, or both?
Backing up logged data.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A


13. If you backed up logged data, where does it back up to?
The logged/persistent data utilizes Ionic Storage, which backs up to the devices LocalStorage/IndexedDB.

14. How does your app implement or follow principles of good mobile design?
The application follows principles of good mobile design by keeping consistent UI design, with simple inputs while
adhering to iOS's UI heuristics.