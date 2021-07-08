from os import close
from typing import List
from backend.clases import mazos, Tablero, Equipo
from random import randint, randrange
from PyQt5 import uic
from PyQt5.QtCore import pyqtSignal, Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QLabel, QApplication
from PyQt5.QtCore import QObject, pyqtSignal
import parametros as p

class VentanaInicioBackend(QObject):
    senal_comenzar = pyqtSignal()
    senal_salir = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.comenzar()
    
    def comenzar(self):
        self.senal_comenzar.emit()

    def salir(self):
        self.close()

class VentanaJuegoBackend(QObject):
    senal_actualizar = pyqtSignal(list)

    def __init__(self):
        super().__init__()

    def mejorar(self):
        seguro = randint(0, 10)
        if seguro == 5:
            self.senal_actualizar.emit(["seguro"])

        else:
            riesgo = randint(-5, 5)
            desecho = randint(-5, 5)
            produce = randint(0, 10)

            self.senal_actualizar.emit([riesgo, produce, desecho])
    