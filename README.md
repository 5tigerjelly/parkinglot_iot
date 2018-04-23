# T-fficient Parkinglot solved with IoT

## Inspiration
Motivation to make the world the better place with Internet of Things.

## What it does
T-ficcient is a smart parking system that helps users find empty parking spots by offering different types of services. Users are able to get access to the empty spaces information in different parking lots through our website, information board outside of the parking lots and our auto reply SMS service. What's more, there is a motion sensor with light and camera on the top of each parking space to inform users the availability of the spot. 

## How we built it
The process began by whiteboarding our ideas onto paper. This included the architecture of how we would integrate sensors/cameras and the data flow between front-end to back-end. After that, a handy boilerplate was provided to us by Chris Oh, who helped decide what technologies we were going to write with (node.js + express.js). Since we were building to accommodate for T-Mobile’s parking situation, we created our database to store parking lots, floors, empty spaces, and associated license plates in parking spots. 
After this was all planned out, we began thinking of all features that needed to be created in order to bring our ideas/specifications into a developed product. Features included: getting data from the database, configuring the Raspberry Pi, passing in the Raspberry Pi data to know when to switch a different light color, building the front-end website to display parking data, utilizing Microsoft API’s to get facial recognition, etc. 
For serverless website development, we used Jazz to deploy our application. Our features were developed with our team of three and we all separately pushed to our own branches and then merging to master on Github. Technologies involved include: HTML, CSS, Javascript, Python, etc.

## Challenges we ran into
There were certain features that we wanted to implement, which ended up taking a long time. One of these features was integrating facial recognition to recognize a T-Mobile employee and alert them of their parking spots. The documentation to access all fetch endpoints for registering employees faces and also verification of faces was not as clear as we could have hoped for. Due to the time restrictions and limited resources, made it more difficult.

## Accomplishments that we're proud of
We are able to develop the basic features and main components of the system as we expected. We hadn’t been in touch with some technologies that we were using in the process of development; however, we learned them in a short amount of time and were able to install and implement them in our project. 

## What we learned
We learned how to quickly prototype a solution for a current problem in a short amount of time. This taught us how to manage our features and structurally deliver our tasks in a timely fashion. This process was quickened through utilization of Agile methodologies. We have also learned about the hardware that we barely use in our daily school work, such as Raspberry Pi. We have learned how to connect the Raspberry Pi to our laptop, gather and transport data from the sensor, and being able to use the data in our system. 

## What's next for T-fficient
We are planning to apply machine learning into our system to predict personalized parking spots for users by analyzing the parking lot real time data and users’ personal data such as their office location.
