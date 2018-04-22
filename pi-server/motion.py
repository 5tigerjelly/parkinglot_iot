import RPi.GPIO as GPIO
import time
import requests
GPIO.setwarnings(False)
isOccupied = False

def ping():
    global isOccupied
    GPIO.setmode(GPIO.BCM)
    TRIG = 23
    ECHO = 18

    GPIO.setup(TRIG,GPIO.OUT)
    GPIO.setup(ECHO,GPIO.IN)
    GPIO.output(TRIG, False)
    time.sleep(1)

    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    while GPIO.input(ECHO)==0:
        pulse_start = time.time()
    while GPIO.input(ECHO)==1:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start

    distance = pulse_duration * 17150

    distance = round(distance, 2)

    if distance < 30 and not isOccupied:
        isOccupied = True
        updateInfo(isOccupied)
        print "update to isOccupied true"
        # make POST request
    elif distance > 30 and isOccupied:
        isOccupied = False
        updateInfo(isOccupied)
        print "update to isOccupied false"
        #make POST request
    print "Distance:",distance,"cm"

    GPIO.cleanup()
    time.sleep(1)

def updateInfo(isOccupied):
    # http://206.189.71.244/
    print "calling update"
    print isOccupied
    r = requests.post("http://206.189.71.244/", data={'lotID': 'NP2', 'floor': 'P3', 'spaceID': '2', 'isOccupied': isOccupied})
    print r.status_code
print "Reading Distance \n"

while True:
    ping()

