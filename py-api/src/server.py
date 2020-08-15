from flask import Flask
from flask_cors import CORS
import redis

app = Flask(__name__)
r_client = redis.Redis(host='redis', port=6379, db=0)
print("connected to redis")
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == "POST":
        r_client.sadd(request.json.date, request.json.sec_id)
if __name__ == '__main__':
    app.run()
