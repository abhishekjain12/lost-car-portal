from flask import request, jsonify
from flask_praetorian import auth_required

from app import app
from src.main.service.account import account_details as account_details_service
from src.main.service.account import change_password as change_password_service
from src.main.service.account import logout as logout_service
from src.main.service.account import auth as auth_service
from src.main.service.account import signup as signup_service
from src.main.service.account import refresh_token as refresh_token_service
from src.main.dto.account import logout as logout_dto


@app.route('/auth', methods=['POST'])
def auth():
    return auth_service(
        request.get_json(force=True)
    )


@app.route('/sign-up', methods=['POST'])
def signup():
    return signup_service(
        request.get_json(force=True)
    )


@app.route('/refresh-token', methods=['GET'])
def refresh_token():
    return jsonify(refresh_token_service())


@app.route('/account-details', methods=['GET'])
@auth_required
def account_details():
    return account_details_service()


@app.route('/change-password', methods=['PATCH'])
@auth_required
def change_password():
    return change_password_service(
        request.get_json(force=True)
    )


@app.route('/logout', methods=['GET'])
@auth_required
def logout():
    logout_service()
    return logout_dto()
