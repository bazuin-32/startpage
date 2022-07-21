from flask import (
	Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort

from startpage.auth import login_required
from startpage.db import get_db

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