from random import randint
from abc import ABC
import parametros as p

class Carta(ABC):
    def __init__(self, nombre, descripcion):
        self.nombre = nombre
        self.descripcion = descripcion

    def sacar_carta(self):
        #Emitir señal de la carta
        pass

class Evento(Carta):
    def __init__(self, nombre, descripcion):
        super().__init__(nombre, descripcion)

    def aplicar_evento(self, *args):
        #Aplica los cambios de los eventos
        pass

class Mejora(Carta):
    def __init__(self, nombre, descripcion):
        super().__init__(nombre, descripcion)

    def mejorar(self, *args):
        #Aplica los cambios a la planta
        pass

def mazos():
    event = []
    mejor = []
    with open(p.PATH_CARTAS, "r") as deck:
        info = deck.readlines()

    for line in info:
        actual = line.strip("\n").split(";")

        if actual[0] == "Evento":
            actual = Evento(*actual[1:])
            event.append(actual)

        else:
            actual = Mejora(*actual[1:])
            mejor.append(actual)

    todas = {"Eventos" : event, "Mejoras" : mejor}
    return todas

class Tablero():
    def __init__(self) -> None:
        self.riesgo = p.RIESGO
        self.produccion = p.PRODUCCION
        self.vida = p.VIDA
        self.seguro = 0
        self.desechos = 0

    def terminar(ganador):
        print(f"{ganador.color} ha ganado!")
        return False

class Equipo():
    def __init__(self, color) -> None:
        self.color = color
        self.__dinero = p.DINERO_INICIAL
        self.casas_iluminadas = 0
    
    @property
    def dinero(self):
        return self.__dinero

    @dinero.setter
    def dinero(self, mon):
        self.__dinero = mon
        
        return True

    def ganar(self):
        tablero.terminar(self)

