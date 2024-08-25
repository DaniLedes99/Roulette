import os

def delete_history():
    archivo_a_eliminar = 'PyWhatKit_DB.txt'
    if os.path.exists(archivo_a_eliminar):
        os.remove(archivo_a_eliminar)
        print(f"Archivo '{archivo_a_eliminar}' eliminado con éxito.")
    else:
        print(f"El archivo '{archivo_a_eliminar}' no existe.")

if __name__ == '__main__':
    delete_history()
