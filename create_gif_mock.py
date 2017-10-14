# this mock file will imitate the real create_gif script
# why? to quickly test the front-end outside of the RPi

import sys
import os.path
from time import sleep, time
from shutil import copyfile

args = sys.argv[1:]
path_video = os.path.join(args[0], 'model.h264')
path_gif_raw = os.path.join(args[0], 'model.gif')
path_gif_final = os.path.join(args[0], 'final.gif')

sleep(5)

copyfile('test.gif', path_gif_final)
