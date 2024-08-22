from flask import Flask, jsonify, request
from flask_cors import CORS
import pywhatkit as kit

app = Flask(__name__)
CORS(app)

@app.route("/enviarmensaje", methods=['POST'])
def enviarmensaje():
    try:
      
        data = request.json
        print(data)
        hora = data['hora']
        minuto = data['minuto']
        
        kit.sendwhatmsg("+5491158093998", "Hola Dani, perdón si algo de lo que te dije te hirió. Quiero que volvamos a ser los mejores amigos por siempre. En compensación, te invitaré todos los sandwiches de lomo con smiles que quieras, te carrearé en cualquier juego que necesites, y te responderé cualquier duda de programación o lo que sea por más estúpida que sea  ", hora, minuto, wait_time=13)

        
        return jsonify({"status": "success", "message": "Mensaje enviado correctamente!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
