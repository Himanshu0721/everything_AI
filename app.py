from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
from werkzeug.exceptions import HTTPException
import json

app = Flask(__name__, template_folder='templates')
CORS(app)  # Enable CORS for all routes

url = "https://simple-chatgpt-api.p.rapidapi.com/ask"
headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": "edfe3870b0mshbe155f99bc15a7bp1fb5a7jsn3ee827c63613",
    "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com"
}

def ask(question):
    try:
        payload = {"question": question}
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json().get("answer")
    except requests.RequestException as e:
        app.logger.error(f"API request failed: {str(e)}")
        raise

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        if not request.form.get('question'):
            return jsonify({"error": "Question is required"}), 400
        
        answer = ask(request.form['question'])
        if not answer:
            return jsonify({"error": "No answer received from AI service"}), 502
            
        return jsonify({"answer": answer})
        
    except requests.RequestException as e:
        return jsonify({"error": "Failed to get response from AI service"}), 502
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "error": e.name,
        "message": e.description,
    })
    response.content_type = "application/json"
    return response

if __name__ == "__main__":
    app.run(debug=True)