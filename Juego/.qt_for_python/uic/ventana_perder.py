# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'c:\Users\manue\OneDrive\Documents\UNI\Pensamiento_visual\grupo6\Juego\frontend\uis\ventana_perder.ui'
#
# Created by: PyQt5 UI code generator 5.15.2
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(721, 626)
        Form.setMinimumSize(QtCore.QSize(721, 626))
        Form.setMaximumSize(QtCore.QSize(721, 626))
        Form.setStyleSheet("background-color: rgb(210, 215, 223);\n"
"font: 28pt \"MS Shell Dlg 2\";")
        self.frame = QtWidgets.QFrame(Form)
        self.frame.setGeometry(QtCore.QRect(10, 10, 701, 601))
        self.frame.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame.setObjectName("frame")
        self.layoutWidget = QtWidgets.QWidget(self.frame)
        self.layoutWidget.setGeometry(QtCore.QRect(20, 460, 659, 141))
        self.layoutWidget.setObjectName("layoutWidget")
        self.verticalLayout_2 = QtWidgets.QVBoxLayout(self.layoutWidget)
        self.verticalLayout_2.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.pushButton = QtWidgets.QPushButton(self.layoutWidget)
        self.pushButton.setStyleSheet("background-color: rgb(255, 255, 255);")
        self.pushButton.setAutoExclusive(False)
        self.pushButton.setFlat(False)
        self.pushButton.setObjectName("pushButton")
        self.verticalLayout_2.addWidget(self.pushButton)
        self.pushButton_2 = QtWidgets.QPushButton(self.layoutWidget)
        self.pushButton_2.setStyleSheet("background-color:rgb(255, 255, 255)")
        self.pushButton_2.setObjectName("pushButton_2")
        self.verticalLayout_2.addWidget(self.pushButton_2)
        self.label = QtWidgets.QLabel(self.frame)
        self.label.setGeometry(QtCore.QRect(10, 10, 681, 41))
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.frame)
        self.label_2.setGeometry(QtCore.QRect(10, 410, 681, 41))
        self.label_2.setAlignment(QtCore.Qt.AlignCenter)
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.frame)
        self.label_3.setGeometry(QtCore.QRect(200, 100, 301, 281))
        self.label_3.setText("")
        self.label_3.setPixmap(QtGui.QPixmap("c:\\Users\\manue\\OneDrive\\Documents\\UNI\\Pensamiento_visual\\grupo6\\Juego\\frontend\\uis\\../assets/skull.png"))
        self.label_3.setScaledContents(True)
        self.label_3.setObjectName("label_3")

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Form"))
        self.pushButton.setText(_translate("Form", "Si"))
        self.pushButton_2.setText(_translate("Form", "No (salir)"))
        self.label.setText(_translate("Form", "La planta ha explotado (X 0 X)"))
        self.label_2.setText(_translate("Form", "??Volver a empezar?"))
