from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import random


@app.route("/sendrandomnumber", methods=['GET'])
def send_random_number():              
    try:
        random_number = random.randint(0, 36)  # Generar un número aleatorio entre 0 y 36
        return jsonify({"status": "success", "number": random_number}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
