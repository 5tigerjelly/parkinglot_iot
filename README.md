# parkinglot_iot

## Client
This is where the client end (drivers, machines at building entrance, and green red like at costco gas statioin) is.

There will be two different interfaces, one for the phone and large moniters, and the green and red light

## Web-Server
This is the core of the project, all the small PIs will talk to this server to update information.

POST request -> update status of that lot

GET request -> get overall status

GET request on lotID -> gets status of that lot

## Pi-Server
Smaller server which will check if there is a change in the spot, and if there is a car accross, will use Microsoft OCR to extract the lisence plate number