'''
定义路由
'''
import re
import json
import requests
from flask import session, request, jsonify
from .indexApp import app
from .database import user_react, douban_music

# 这个很重要 -- 几个request 的钩子函数 -- before_request 和 after_request
# 登陆判断
@app.before_request
def before_request():
    if request.path != '/api/login' and not session.get('username'):
        print('='*30)
        print(session.get('username'))
        return jsonify(401)

@app.route('/api/auth')
def auth():
    data = {
        'success': True,
        'msg': '权限验证成功'
    }
    if not session.get('username'):
        return jsonify(41)
    return jsonify(data)


# 登陆
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
            # session.permanent = True

        return jsonify(data)

# 退出
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    # session.pop('username', None)
    data = {
        'success': True,
        'msg': '登录退出成功'
    }
    return jsonify(data)

# 注册
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

# 音乐列表查询
@app.route('/api/music', methods=['GET'])
@app.route('/api/music/<category>', methods=['GET'])
def get_music(category=1):
    print(request.cookies)
    print(category)
    print(session)
    print(session.get('username'))
    if re.match('\d+', category):
        musics = list(douban_music.find({"type": int(category)}))
    else:
        musics = list(douban_music.find({"typeName": {"$regex": category}})) # like查询
    # print(musics)
    [item.pop('_id') for item in musics]
    # print(music_data)
    data = {
        'success': True,
        'data': musics
    }
    return jsonify(data)

# 文章列表
@app.route('/api/article', methods=['GET'])
def article():
    content = requests.get('http://v3.wufazhuce.com:8000/api/channel/reading/more/0').content
    articles = json.loads(content)
    data = {
        'success': True,
        'data': articles
    }
    return jsonify(data)
