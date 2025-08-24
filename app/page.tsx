"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CalculadoraCafe() {
  // Supuestos iniciales (editables)
  const [supuestos, setSupuestos] = useState({
    precioGranoVerde: 10000,
    rendimientoTueste: 85,
    costeTueste: 2000,
    costoEmpaque250g: 1200,
    etiquetadoManipulacion: 400,
    empaqueSecundarioTransporte: 300,
    overheadMarketing: 600,
    margenComercial: 35,
    margenSupermercado: 30,
    comisionAgente: 5,
    iva: 19,
  })

  // Cálculos automáticos
  const calcularCostos = () => {
    const cantidadGranoVerde = 250 / (supuestos.rendimientoTueste / 100)
    const costoGranoVerde = (cantidadGranoVerde / 1000) * supuestos.precioGranoVerde
    const costoTueste = (cantidadGranoVerde / 1000) * supuestos.costeTueste

    const cogs =
      costoGranoVerde +
      costoTueste +
      supuestos.costoEmpaque250g +
      supuestos.etiquetadoManipulacion +
      supuestos.empaqueSecundarioTransporte +
      supuestos.overheadMarketing

    const markup = cogs * (supuestos.margenComercial / 100)
    const precioMayorista = cogs + markup
    const pvp = precioMayorista / (1 - supuestos.margenSupermercado / 100)
    const comision = precioMayorista * (supuestos.comisionAgente / 100)
    const precioFinalConIva = pvp * (1 + supuestos.iva / 100)

    return {
      cantidadGranoVerde: Math.round(cantidadGranoVerde),
      costoGranoVerde: Math.round(costoGranoVerde),
      costoTueste: Math.round(costoTueste),
      cogs: Math.round(cogs),
      markup: Math.round(markup),
      precioMayorista: Math.round(precioMayorista),
      pvp: Math.round(pvp),
      comision: Math.round(comision),
      precioFinalConIva: Math.round(precioFinalConIva),
    }
  }

  const resultados = calcularCostos()

  const actualizarSupuesto = (campo: string, valor: number) => {
    setSupuestos((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculadora de Costos - Café Tostado</h1>
          <p className="text-gray-600">Análisis completo de costos para empaque de 250g</p>
        </div>

        {/* Tabla de Supuestos */}
        <Card>
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-xl">📊 SUPUESTOS INICIALES</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Concepto</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Valor</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Precio grano verde en finca", campo: "precioGranoVerde", unidad: "COP/kg" },
                    { label: "Rendimiento del tueste", campo: "rendimientoTueste", unidad: "%" },
                    { label: "Costo de tueste (energía + mano de obra)", campo: "costeTueste", unidad: "COP/kg verde" },
                    {
                      label: "Costo empaque 250g (bolsa con válvula)",
                      campo: "costoEmpaque250g",
                      unidad: "COP/unidad",
                    },
                    { label: "Etiquetado / manipulación", campo: "etiquetadoManipulacion", unidad: "COP/unidad" },
                    {
                      label: "Empaque secundario + transporte",
                      campo: "empaqueSecundarioTransporte",
                      unidad: "COP/unidad",
                    },
                    { label: "Overhead y marketing", campo: "overheadMarketing", unidad: "COP/unidad" },
                    { label: "Margen comercial objetivo", campo: "margenComercial", unidad: "%" },
                    { label: "Margen del supermercado", campo: "margenSupermercado", unidad: "%" },
                    { label: "Comisión agente", campo: "comisionAgente", unidad: "%" },
                    { label: "IVA", campo: "iva", unidad: "%" },
                  ].map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{item.label}</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <Input
                          type="number"
                          value={supuestos[item.campo as keyof typeof supuestos]}
                          onChange={(e) => actualizarSupuesto(item.campo, Number.parseFloat(e.target.value) || 0)}
                          className="text-center font-mono"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600">
                        {item.unidad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Cálculos Paso a Paso */}
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-xl">🧮 CÁLCULOS PASO A PASO (250g)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Paso</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Descripción</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Valor (COP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">1</td>
                    <td className="border border-gray-300 px-4 py-2">Cantidad grano verde necesaria</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      {resultados.cantidadGranoVerde}g
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">2</td>
                    <td className="border border-gray-300 px-4 py-2">Costo grano verde</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${resultados.costoGranoVerde.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">3</td>
                    <td className="border border-gray-300 px-4 py-2">Costo de tueste</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${resultados.costoTueste.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">4</td>
                    <td className="border border-gray-300 px-4 py-2">Empaque</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${supuestos.costoEmpaque250g.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">5</td>
                    <td className="border border-gray-300 px-4 py-2">Etiquetado / manipulación</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${supuestos.etiquetadoManipulacion.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">6</td>
                    <td className="border border-gray-300 px-4 py-2">Transporte / empaque secundario</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${supuestos.empaqueSecundarioTransporte.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">7</td>
                    <td className="border border-gray-300 px-4 py-2">Overhead / marketing</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${supuestos.overheadMarketing.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-yellow-100 border-2 border-yellow-400">
                    <td className="border border-gray-300 px-4 py-2 font-bold">8</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">COSTO TOTAL DE PRODUCCIÓN (COGS)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono font-bold text-lg">
                      ${resultados.cogs.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-green-100">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">9</td>
                    <td className="border border-gray-300 px-4 py-2">Markup ({supuestos.margenComercial}%)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${resultados.markup.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-green-200 border-2 border-green-400">
                    <td className="border border-gray-300 px-4 py-2 font-bold">10</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold">PRECIO MAYORISTA</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono font-bold text-lg">
                      ${resultados.precioMayorista.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Resultados Finales */}
        <Card>
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle className="text-xl">💰 RESULTADOS FINALES</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Concepto</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold">250g</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold">500g</th>
                    <th className="border border-gray-300 px-4 py-3 text-right font-semibold">1kg</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Precio Mayorista</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${resultados.precioMayorista.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${Math.round(resultados.precioMayorista * 1.95).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${Math.round(resultados.precioMayorista * 3.8).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">PVP (sin IVA)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${resultados.pvp.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${Math.round(resultados.pvp * 1.95).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${Math.round(resultados.pvp * 3.8).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-orange-100 border-2 border-orange-400">
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      PRECIO FINAL AL CONSUMIDOR (con IVA {supuestos.iva}%)
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono font-bold text-lg">
                      ${resultados.precioFinalConIva.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono font-bold text-lg">
                      ${Math.round(resultados.precioFinalConIva * 1.95).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono font-bold text-lg">
                      ${Math.round(resultados.precioFinalConIva * 3.8).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-red-100">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Comisión Agente ({supuestos.comisionAgente}%)
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${resultados.comision.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${Math.round(resultados.comision * 1.95).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-mono">
                      ${Math.round(resultados.comision * 3.8).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Resumen Ejecutivo */}
        <Card>
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle className="text-xl">📋 RESUMEN EJECUTIVO</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">Precios Recomendados de Introducción:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>250g:</strong> ${Math.round(resultados.pvp * 0.98).toLocaleString()} - $
                    {Math.round(resultados.pvp * 1.02).toLocaleString()} COP
                  </li>
                  <li>
                    • <strong>500g:</strong> ${Math.round(resultados.pvp * 1.9).toLocaleString()} - $
                    {Math.round(resultados.pvp * 1.95).toLocaleString()} COP
                  </li>
                  <li>
                    • <strong>1kg:</strong> ${Math.round(resultados.pvp * 3.7).toLocaleString()} - $
                    {Math.round(resultados.pvp * 3.8).toLocaleString()} COP
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">Márgenes del Negocio:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Margen Bruto:</strong> {supuestos.margenComercial}%
                  </li>
                  <li>
                    • <strong>Margen Supermercado:</strong> {supuestos.margenSupermercado}%
                  </li>
                  <li>
                    • <strong>Comisión Agente:</strong> {supuestos.comisionAgente}%
                  </li>
                  <li>
                    • <strong>IVA Aplicado:</strong> {supuestos.iva}%
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
