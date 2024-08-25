from flask import Flask, jsonify, request
from flask_cors import CORS
import pywhatkit as kit
from deletehistory import delete_history
app = Flask(__name__)
CORS(app)

def read_msg(nombre_archivo):
    try:
        with open(nombre_archivo, 'r', encoding='utf-8') as archivo:
            return archivo.read().strip() 
    except Exception as e:
        raise RuntimeError(f"Error al leer el archivo: {str(e)}")


@app.route("/enviarmensaje", methods=['POST'])
def enviarmensaje():
    try:
      
        data = request.json
        print(data)
        hora = data['hora']
        minuto = data['minuto']
        cel="+5491158093998"
        msg = read_msg('msg.txt')
        kit.sendwhatmsg(cel, msg, hora, minuto, wait_time=13)
        delete_history()
        
        return jsonify({"status": "success", "message": "Mensaje enviado correctamente!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
