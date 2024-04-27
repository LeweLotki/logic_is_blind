from app import app 

if __name__ == '__main__':
    
    app.run(debug=True, use_reloader=True, port=8000, threaded=True)

