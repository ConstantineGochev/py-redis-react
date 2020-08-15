from flask import Flask
from flask_cors import CORS
from flask import jsonify
from flask import request
import redis

app = Flask(__name__)
r_client = redis.Redis(host='redis', port=6379, db=0,password="SUPER_SECRET")
print("connected to redis")
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'
@app.route('/users', methods=['POST'])
def users():

        app.logger.info(request.json['date'])
        request.get_json(force=True)
        data=request.json
        r_client.sadd(data['date'], data['sec_id'])
        params={"name":data['name'], "qty": data['qty'], "last_price": data['last_price'],"chg_1d":data['chg_1d']}
        r_client.hmset('id:' + data['sec_id'], params)

        return 'success'
@app.route('/get')
def get_data():
        default = {}
        for key in r_client.keys("id:*"):
            data=r_client.hgetall(key)
            default[str(key)] = str(data)
        return jsonify(default)
if __name__ == '__main__':
    app.run()
