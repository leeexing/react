'''
react blog
'''
from flask import Flask, jsonify, make_response
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient('localhost', 27017)
user_db = client['myblog']['users']
douban_music = client['duoban']['duobanData']


@app.route('/api/users', methods=['GET'])
def users():
    users = list(user_db.find({}))
    # print(users)
    def select_info(data):
        return {'username': data['username'], 'password': data['password'], 'isAdmin': data.get('isAdmin', False)}
    user_data = list(map(select_info, users))
    # print('*'*20)
    # print(user_data)
    data = {
        'success': True,
        'data': user_data
    }
    return jsonify(data)

@app.route('/api/music', methods=['GET'])
def get_music():
    musics = list(douban_music.find({'type': '轻音乐'}))
    # print(musics)
    music_data = [item.pop('_id') for item in musics]
    # print(music_data)
    print(musics)
    data = {
        'success': True,
        'data': musics
    }
    return jsonify(data)

if __name__ == "__main__":
    # app.run(host='192.168.191.1')
    app.run(debug=True)