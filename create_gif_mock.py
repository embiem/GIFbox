# this mock file will imitate the real create_gif script
# why? to quickly test the front-end outside of the RPi

import sys, json
import os.path
from time import sleep, time
from shutil import copyfile

args = sys.argv[1:]
path_video = os.path.join(args[0], 'model.h264')
path_gif_raw = os.path.join(args[0], 'model.gif')
path_gif_final = os.path.join(args[0], 'final.gif')

# starting up & testing lights

sleep(2)

# actually recording video
print json.dumps({
    "phase": 1
})
sys.stdout.flush()

sleep(3)

# processing video to create GIF
print json.dumps({
    "phase": 2
})
sys.stdout.flush()

sleep(5)

# finished! GIF created
print json.dumps({
    "phase": 3
})
sys.stdout.flush()

copyfile('test.gif', path_gif_final)
