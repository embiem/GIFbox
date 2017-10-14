import sys
import os.path
import subprocess
from picamera import PiCamera
from time import sleep, time
import RPi.GPIO as GPIO

# args[0] contains the folder where files should be put
args = sys.argv[1:]
path_video = os.path.join(args[0], 'model.h264')
path_gif_raw = os.path.join(args[0], 'model.gif')
path_gif_final = os.path.join(args[0], 'final.gif')
path_vid_to_gif = os.path.join(args[1], 'video_to_gif.sh')

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)
GPIO.output(23, GPIO.HIGH)
GPIO.output(24, GPIO.HIGH)

# turn only left light on
sleep(1)
GPIO.output(23, GPIO.HIGH)
GPIO.output(24, GPIO.LOW)
# turn only right ligh traon
sleep(1)
GPIO.output(23, GPIO.LOW)
GPIO.output(24, GPIO.HIGH)
# turn both on
sleep(1)
GPIO.output(23, GPIO.LOW)
GPIO.output(24, GPIO.LOW)

# Cam setup
camera = PiCamera(resolution=(640, 480))
#camera.image_effect = 'cartoon'
camera.start_preview()
sleep(3)
# Fix values
camera.shutter_speed = camera.exposure_speed
camera.exposure_mode = 'off'
g = camera.awb_gains
camera.awb_mode = 'off'
camera.awb_gains = g

# Start Capturing
camera.start_recording(path_video)
camera.wait_recording(5)
camera.stop_recording()

# Stop Capturing
camera.stop_preview()
GPIO.output(23, GPIO.HIGH)
GPIO.output(24, GPIO.HIGH)
GPIO.cleanup()

# Processing
start_time = time()

# RAW-GIF
params_raw = ['sudo', path_vid_to_gif, path_video, path_gif_raw]
subprocess.check_call(params_raw)

raw_time = time()
print('raw took %d seconds' % (raw_time - start_time))

# Boomerang-style
params_final = [
    'convert', '-coalesce', '-delay', '4', path_gif_raw,
    '-delete', '-1', '-delete', '0', '-reverse', '-coalesce',
    '-delay', '4', path_gif_raw, '-loop', '0', path_gif_final]
subprocess.check_call(params_final)

end_time = time()
print('boomerang-style took %d seconds' % (end_time - start_time))
