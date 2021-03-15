from scipy.optimize import newton
import sys

def sumatoria_CAE(x, monto_prestamo, cuota_mensual, cantidad_meses):
    return sum([cuota_mensual/((x + 1) ** (i + 1)) for i in range(cantidad_meses)]) - monto_prestamo

def CAE(i_f):
    return i_f*12

def encontrar_raiz(monto_prestamo, cuota_mensual, cantidad_meses):
    return newton(lambda x: sumatoria_CAE(x,monto_prestamo,cuota_mensual,cantidad_meses),0)

def test(monto_prestamo=0, cuota_mensual=0, cantidad_meses=0):

    i_f = encontrar_raiz(monto_prestamo, cuota_mensual, cantidad_meses)

    return round(CAE(i_f) * 100,2)
    

if __name__ == '__main__':
    monto_prestamo = int(sys.argv[1])
    cuota_mensual = int(sys.argv[2])
    cantidad_meses = int(sys.argv[3])

    print( test(monto_prestamo, cuota_mensual, cantidad_meses) , end="")
