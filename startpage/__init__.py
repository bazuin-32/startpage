import os

from flask import Flask

from werkzeug.middleware.proxy_fix import ProxyFix

def create_app(test_config = None) -> Flask:
	app = Flask(__name__, instance_relative_config=True)

	app.wsgi_app = ProxyFix(
			app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
	)

	app.config.from_mapping(
		SECRET_KEY='dev',
		DATABASE=os.path.join(app.instance_path, 'startpage.sqlite'),
	)

	if test_config is None:
		app.config.from_pyfile('config.py', silent=True)
	else:
		app.config.from_mapping(test_config)

	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	from . import db
	db.init_app(app)

	from . import auth
	app.register_blueprint(auth.bp)

	from . import startpage
	app.register_blueprint(startpage.bp)
	app.add_url_rule('/', endpoint='index')

	@app.route('/hello')
	def hello():
		return 'Hello, World!'

	return app
