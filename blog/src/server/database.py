'''
链接数据库
'''
# __all__ = ['user_react', 'douban_music']

import pymongo

client = pymongo.MongoClient('localhost', 27017)
user_react = client['myblog']['usersReact']
douban_music = client['myblog']['music']
