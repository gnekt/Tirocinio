import psycopg2
from flask import request,jsonify
from flask_restful import Resource
from connection import db_session, commit
from Model import Esterno
from Model import Log_In
from Model import Recapito
from Model import Operatore
from pony.orm import *
from pony.orm.serialization import to_json
from connection import db


class InsertOperatore(Resource):
    @staticmethod
    def post():
        print(request.json)
        try:
            with db_session:
                user = Operatore(nome=request.json["nome"], cognome=request.json["cognome"],
                                 data_nascita=request.json["data_nascita"], tipo=request.json["tipo_utente"])
                if request.json["tipo_utente"] == "Esterno":
                    operatore_esterno = Esterno(provenienza=request.json["provenienza_esterno"], operatore=user)
                log_in = Log_In(email=request.json["email"], password=request.json["password"], operatore=user)
                if request.json["telefono_utente"] != "":
                    telefono = Recapito(numero_telefonico=request.json["telefono_utente"], operatore=user)
            commit()
        except Exception as ex:
            if ex.original_exc.original_exc.__class__ == psycopg2.errors.UniqueViolation:
                return jsonify(operationCode=201, message="Utente già registrato!")
            else:
                return jsonify(operationCode=201)
        return jsonify(operationCode=200)

class GetTipologieOperatore(Resource):
    @staticmethod
    def get():
        return jsonify(operationCode=200, items=[{"key":"Esterno","value":"Esterno"},
                                                 {"key":"Operatore Semplice","value":"Operatore Semplice"},
                                                 {"key":"Autorizzato","value":"Autorizzato"}])

class GetOperatori(Resource):
    @staticmethod
    def get():
        operatori=[]
        with db_session:
            data = select(operatore for operatore in Operatore).order_by(Operatore.nome,Operatore.cognome)[:]
            for operatore in data:
                operatori.append(operatore.to_dict())
        return jsonify(operationCode=201,items=operatori)

class GetOperatoriListed(Resource):
    @staticmethod
    def get():
        operatori=[]
        with db_session:
            data = select(operatore for operatore in Operatore).order_by(Operatore.nome,Operatore.cognome)[:]
            for operatore in data:
                operatori.append({"key":operatore.id_operatore,"value":operatore.nome+" "+operatore.cognome})
        return jsonify(operationCode=201,items=operatori)