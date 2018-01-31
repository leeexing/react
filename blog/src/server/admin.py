'''
后台 api
'''
import re
import json
import requests
from flask import request, jsonify
from .indexApp import app
from .database import user_react, douban_music

@app.route('/api/admin')
def admin():
    users = list(user_react.find({}))
    [item.pop('_id') for item in users]
    data = {
        'success': True,
        'data': users
    }
    return jsonify(data)
