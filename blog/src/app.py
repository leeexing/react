'''
react blog
'''
from flask import Flask, jsonify
import pymongo
import io, sys, json

# 重置编码方式
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='gb18030')



app = Flask(__name__)

client = pymongo.MongoClient('localhost', 27017)
user_db = client['myblog']['users']

@app.route('/api/users', methods=['GET'])
def users():
    data = {
        'success': True,
        'msg': 'leeing'
    }
    # return jsonify({'name': 1231,'words':7879})
    return json.dumps(data)

if __name__ == "__main__":
    # app.run(host='192.168.191.1')
    app.run(debug=True)