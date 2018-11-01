from flask import Flask, render_template, redirect, jsonify
import json

app = Flask(__name__)


@app.route('/')
def index():
	with open('maps_API.json') as key:
		data = json.load(key)
	apiKey = data['apikey']
	return render_template('sidebar/mapNav.html', apiKey = apiKey)

@app.route('/Photo_404')
def imgNotFound():
	return redirect('https://www.lifewire.com/thmb/qLv10Pgd30kCy7OxXacwOWKxZ8M=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_325494917-5a68d8403418c600190a3e1f.jpg')


if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0', port=5000)