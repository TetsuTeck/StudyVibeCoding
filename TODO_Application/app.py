
from flask import Flask, render_template, request, redirect, jsonify

app = Flask(__name__)
todos = []

@app.route('/')
def index():
    return render_template('index.html', todos=todos)

@app.route('/add', methods=['POST'])
def add_todo():
    todo = request.form.get('todo')
    if todo:
        todos.append({'text': todo, 'status': '未着手'})
    return redirect('/')

@app.route('/update/<int:index>', methods=['POST'])
def update_todo(index):
    if 0 <= index < len(todos):
        todos[index]['status'] = request.form.get('status', '未着手')
    return redirect('/')

@app.route('/delete/<int:index>')
def delete_todo(index):
    if 0 <= index < len(todos):
        todos.pop(index)
    return redirect('/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=51354, debug=True)
