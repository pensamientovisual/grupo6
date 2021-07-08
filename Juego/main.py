import sys
import os
from PyQt5 import uic
from PyQt5.QtCore import pyqtSignal, Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QLabel, QApplication
import parametros as p

from frontend.ventanas import VentanaInicio, VentanaJuego, VentanaGanador, VentanaPerder
from backend.logica import VentanaInicioBackend, VentanaJuegoBackend
from backend.clases import Equipo, Tablero

if __name__ == "__main__":
    red = Equipo("rojo")
    blue = Equipo("azul")
    table = Tablero()

    app = QApplication([])
    ventana_inicio = VentanaInicio()
    logica_inicio = VentanaInicioBackend()

    ventana_juego = VentanaJuego(red, blue, table)
    logica_juego = VentanaJuegoBackend()

    ventana_ganador = VentanaGanador()
    ventana_perder = VentanaPerder()

    ventana_inicio.senal_comenzar.connect(ventana_juego.mostrar)
    ventana_inicio.senal_salir.connect(os.close)
    logica_inicio.senal_comenzar.connect(ventana_juego.mostrar)

    ventana_juego.senal_mejora_azul.connect(logica_juego.mejorar)
    ventana_juego.senal_mejora_roja.connect(logica_juego.mejorar)
    logica_juego.senal_actualizar.connect(ventana_juego.actualizar_mejora)

    sys.exit(app.exec())