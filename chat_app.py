from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

users = {}

@app.route('/')
def index():
    return render_template('chat.html')

@socketio.on('join')
def handle_join(data):
    username = data['username']
    users[request.sid] = username
    emit('message', {'username': 'System', 'message': f'{username} 加入了聊天室'}, broadcast=True)
    emit('user_count', {'count': len(users)}, broadcast=True)

@socketio.on('send_message')
def handle_message(data):
    emit('message', data, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    username = users.pop(request.sid, None)
    if username:
        emit('message', {'username': 'System', 'message': f'{username} 离开了聊天室'}, broadcast=True)
        emit('user_count', {'count': len(users)}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
