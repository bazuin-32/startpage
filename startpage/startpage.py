from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort

from startpage.auth import login_required
from startpage.db import get_db

import re

bp = Blueprint('startpage', __name__)


@bp.route('/')
@login_required
def index():
	db = get_db()

	history = db.execute(
		"SELECT * FROM history WHERE user_id = ? ORDER BY last_access DESC", (g.user['id'],)
	).fetchall()

	freq_visited = db.execute(
		"SELECT * FROM history WHERE user_id = ? ORDER BY count DESC", (g.user['id'],)
	).fetchall()

	return render_template('startpage/index.html', history=history, freq_visited=freq_visited)


@bp.route('/go', methods=('POST',))
@login_required
def go():
	query = request.form['query']
	
	# add the query to the history db
	db = get_db()

	db.execute(
		"INSERT INTO history (user_id, query) VALUES (?, ?)",
		(g.user['id'], query)
	)

	db.commit()

	# check if protocol was provided, or
	# if the query is a valid domain or ip address
	if re.match(r'^(http|https)://', query):
		return redirect(query)
	elif re.match(r'^(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$', query):
		return redirect('https://' + query)
	elif re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', query):
		return redirect('https://' + query)

	# if the query is not a valid domain or ip address,
	# interpret it as a search query
	return redirect(f"https://www.google.com/search?q={query}")