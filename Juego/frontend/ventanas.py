import sys
from PyQt5 import uic
from PyQt5.QtCore import pyqtSignal, Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QLabel, QApplication
from random import randint
import parametros as p

window_name_juego, base_class_juego = uic.loadUiType(p.PATH_JUEGO)
window_name_inicio, base_class_inicio = uic.loadUiType(p.PATH_INICIO)

class VentanaInicio(window_name_inicio, base_class_inicio):
    senal_comenzar = pyqtSignal()
    senal_salir = pyqtSignal()

    def __init__(self) -> None:
        super().__init__()
        self.setupUi(self)

        self.start.clicked.connect(self.comenzar)
        self.exit.clicked.connect(self.salir)

        self.mostrar()

    def mostrar(self):
        self.show()

    def comenzar(self):
        self.senal_comenzar.emit()
        self.hide()

    def salir(self):
        self.close()

class VentanaJuego(window_name_juego, base_class_juego):
    senal_seguir = pyqtSignal()
    senal_gana_roja = pyqtSignal()
    senal_mejora_roja = pyqtSignal()
    senal_gana_azul = pyqtSignal()
    senal_mejora_azul = pyqtSignal()
    senal_perder = pyqtSignal()

    def __init__(self, rojo, azul, tablero) -> None:
        super().__init__()
        self.setupUi(self)
        self.rojo = rojo
        self.azul = azul
        self.tablero = tablero

        self.instalar_rojo.clicked.connect(self.casa_roja)
        self.mejora_rojo.clicked.connect(self.mejorar_roja)
        self.instalar_azul.clicked.connect(self.casa_azul)
        self.mejora_azul.clicked.connect(self.mejorar_azul)
        self.fin.clicked.connect(self.actualizar)

        self.dinero_azul.setText(f"${self.azul.dinero}")
        self.dinero_rojo.setText(f"${self.azul.dinero}")

    def mostrar(self):
        self.show()

    def casa_roja(self):
        if self.rojo.dinero >= p.COSTO_CASA and self.tablero.produccion > (self.azul.casas_iluminadas + self.rojo.casas_iluminadas):
            self.rojo.dinero -= p.COSTO_CASA
            self.dinero_rojo.setText(f"${self.rojo.dinero}")
            self.rojo.casas_iluminadas += 1
            self.casas_rojo.setValue(int((self.rojo.casas_iluminadas/p.CASAS)*100))

            if self.rojo.casas_iluminadas == p.CASAS:
                self.senal_gana_roja.emit()

    def mejorar_roja(self):
        if self.rojo.dinero >= p.COSTO_CARTA:
            self.rojo.dinero -= p.COSTO_CARTA
            self.dinero_rojo.setText(f"${self.rojo.dinero}")
            self.mejora_rojo.setEnabled(False)
            self.senal_mejora_roja.emit()
        else:
            pass

    def casa_azul(self):
        if self.azul.dinero >= p.COSTO_CASA and self.tablero.produccion > (self.azul.casas_iluminadas + self.rojo.casas_iluminadas):
            self.azul.dinero -= p.COSTO_CASA
            self.dinero_azul.setText(f"${self.azul.dinero}")
            self.azul.casas_iluminadas += 1
            self.casas_azul.setValue(int((self.azul.casas_iluminadas/p.CASAS)*100))

            if self.azul.casas_iluminadas == p.CASAS:
                self.senal_gana_azul.emit()

    def mejorar_azul(self):
        if self.azul.dinero >= p.COSTO_CARTA:
            self.azul.dinero -= p.COSTO_CARTA
            self.dinero_azul.setText(f"${self.azul.dinero}")
            self.mejora_azul.setEnabled(False)
            self.senal_mejora_azul.emit()
        else:
            pass
    
    def actualizar_mejora(self, datos):
        if datos == ["seguro"]:
            self.tablero.seguro += 1
            self.insurance.setText(f"{self.tablero.seguro}")

        else:
            self.tablero.riesgo += datos[0]
            self.tablero.produccion += datos[1]
            self.tablero.desechos += datos[2]

            if self.tablero.riesgo < 0:
                self.tablero.riesgo = 0
            elif self.tablero.riesgo >= 100:
                self.tablero.riesgo = 99

            if self.tablero.produccion > 50:
                self.tablero.produccion = 50

            if self.tablero.desechos < 0:
                self.tablero.desechos = 0

            self.risk.setText(f"{self.tablero.riesgo}%")
            self.production.setText(f"{self.tablero.produccion} casas")
            self.waste.setText(f"{self.tablero.desechos}")
        self.mostrar()

    def actualizar(self):
        if randint(0, 100) <= self.tablero.riesgo:
            if self.tablero.seguro > 0:
                self.tablero.seguro -= 1
                self.insurance.setText(f"{self.tablero.seguro}")
            else:    
                vida_menos = randint(1, 7)
                self.tablero.vida -= vida_menos
                if self.tablero.vida < 0:
                    self.tablero.vida = 0
                self.life.setValue(self.tablero.vida)

        if self.tablero.vida == 0:
            self.senal_perder.emit()

        else:
            self.rojo.dinero = p.DINERO_INICIAL
            self.azul.dinero = p.DINERO_INICIAL
            self.dinero_rojo.setText(f"${self.rojo.dinero}")
            self.dinero_azul.setText(f"${self.azul.dinero}")
            self.mejora_azul.setEnabled(True)
            self.mejora_rojo.setEnabled(True)
            self.mostrar()


class VentanaPerder():
    pass

class VentanaGanador():
    pass

if __name__ == "__main__":
    app = QApplication([])
    form = VentanaInicio()
    form.show()
    sys.exit(app.exec())