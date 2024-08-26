from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/enviarmensaje", methods=['POST'])
def enviarmensaje():
    try:
              
        return jsonify({"status": "success", "message": "Mensaje enviado correctamente!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
