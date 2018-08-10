from flask import Flask, render_template
import json

app = Flask(__name__)


@app.route('/')
def index():
	with open('maps_API.json') as f:
		data = json.load(f)
	apiKey = data['apikey']
	return render_template('sidebar/mapNav.html', apiKey = apiKey)



if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0', port=5000)