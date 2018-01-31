'''
初始化 app
'''
import os
from flask import Flask
from datetime import timedelta

app = Flask(__name__)

# 产生24位随机的字段 作为 salt
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days = 7)
