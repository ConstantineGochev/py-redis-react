from flask import Flask
from flask_cors import CORS
import redis

app = Flask(__name__)
r_client = redis.Redis(host='redis', port=6379, db=0)
print("connected to redis")
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'
if __name__ == '__main__':
    app.run()
