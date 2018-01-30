'''
react blog
'''
from flask import Flask, jsonify, request, session, Response
import pymongo
import re
import os

app = Flask(__name__)
# 产生24位随机的字段 作为 salt
app.config['SECRET_KEY'] = os.urandom(24)

client = pymongo.MongoClient('localhost', 27017)
user_db = client['myblog']['users']
user_react = client['myblog']['usersReact']
douban_music = client['myblog']['music']

# 这个很重要 -- 几个request 的钩子函数 -- before_request 和 after_request
@app.before_request
def before_request():
    if request.path != '/api/login':
        auth = request.headers.get('Authorization')
        if not auth:
            return jsonify(401)

    # print(request.path)
    # if request.path != '/api/login':
    #     auth = request.headers.get('Authorization')
    #     print('*'*20)
    #     print(auth)
    #     resp = make_response()
    #     resp.headers['Authorization'] = 'leeing'
    #     return resp
        
    # if not auth:
    #     return url_for('login')

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    '''用户名或者注册邮箱都可以登陆'''
    # print(request.args)
    # print(request.values)
    if request.method == 'POST':
        username = request.form['userName']
        password = request.form['password']
        is_email = re.compile('\w+@\w+.com')
        if is_email.match(username):
            user = user_react.find_one({'email': username})
        else:
            user = user_react.find_one({'username': username})
        print(user)
        data = {
            'success': True,
            'msg': '恭喜你，用户登陆成功'
        }
        if not user:
            data = {
                'success': False,
                'msg': '用户名不存在'
            }
        elif password != user.get('password'):
            data = {
                'success': False,
            }
        if user:
            data['isAdmin'] = user.get('isAdmin')
            data['username'] = user.get('username')
            session['username'] = user.get('username')
        return jsonify(data)

@app.route('/api/register', methods=['GET','POST'])
def register():
    '''注册
        用户名或者邮箱重复都不能完成注册
    '''
    print(request.form)
    username = request.form['nickname']
    password = request.form['password']
    email = request.form['email']
    phone = request.form['phone']
    prefix = request.form['prefix']
    user = user_react.find_one({'username': username})
    email_db = user_react.find_one({'email': email})
    print(user)
    print('*'*20)
    if user:
        data = {
            'success': False,
            'msg': '用户名已存在，请换一个用户名'
        }
    elif email_db:
        data = {
            'success': False,
            'msg': '该邮箱已被注册'
        }
    else:
        save_data = {
            'username': username,
            'password': password,
            'email': email,
            'phone': phone,
            'prefix': prefix,
            'isAdmin': False
        }
        # user_react.save(save_data)
        user_react.insert(save_data)
        data = {
            'success': True,
            'msg': '用户注册成功'
        }
    print(data)
    return jsonify(data)


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
@app.route('/api/music/<category>', methods=['GET'])
def get_music(category=1):
    # print(category)
    # print(request.headers)
    print(request.cookies)
    # auth = request.headers.get('Authorization')
    # print('#'*20)
    # print(auth)
    # if not auth:
    #     print(4455)
    #     return redirect('/')
    musics = list(douban_music.find({"type": int(category)}))
    print(category)
    print(musics)
    music_data = [item.pop('_id') for item in musics]
    # print(music_data)
    data = {
        'success': True,
        'data': musics
    }
    return jsonify(data)

if __name__ == "__main__":
    # app.run(host='192.168.191.1')
    app.run(debug=True)