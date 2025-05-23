# Problema 01

En un circuito eléctrico de corriente alterna (AC), la impedancia total de dos componentes en paralelo está dada por:

\[
Z_{\text{total}} = \frac{Z_1 \cdot Z_2}{Z_1 + Z_2}, \quad \text{donde } Z_1 = (4 + 3j), \quad Z_2 = (1 - 2j)
\]

## Resuelva

### 1) Calcule \( Z_{\text{total}} \) en forma binómica

Sustituimos \( Z_1 \) y \( Z_2 \) en la ecuación:

\[
Z_{\text{total}} = \frac{(4 + 3j)(1 - 2j)}{(4 + 3j) + (1 - 2j)}
\]

Multiplicamos el numerador:

\[
(4 + 3j)(1 - 2j) = 4(1) + 4(-2j) + 3j(1) + 3j(-2j) = 4 - 8j + 3j - 6j^2
\]

Sabemos que \( j^2 = -1 \), por lo tanto:

\[
4 - 8j + 3j - 6(-1) = 4 - 5j + 6 = 10 - 5j
\]

Ahora el denominador:

\[
(4 + 3j) + (1 - 2j) = 5 + j
\]

Entonces:

\[
Z_{\text{total}} = \frac{10 - 5j}{5 + j}
\]

Para dividir números complejos, multiplicamos numerador y denominador por el conjugado del denominador \( (5 - j) \):

\[
Z_{\text{total}} = \frac{(10 - 5j)(5 - j)}{(5 + j)(5 - j)}
\]

Multiplicamos numerador:

\[
(10)(5) - (10)(j) - (5j)(5) + (5j)(j) = 50 - 10j - 25j + 5j^2 = 50 - 35j - 5 = 45 - 35j
\]

Multiplicamos denominador:

\[
(5 + j)(5 - j) = 5^2 - j^2 = 25 + 1 = 26
\]

Finalmente:

\[
Z_{\text{total}} = \frac{45 - 35j}{26}
\]

Separando parte real e imaginaria:

\[
Z_{\text{total}} = \frac{45}{26} - \frac{35}{26}j
\]

- Parte real: \( \frac{45}{26} \)
- Parte imaginaria: \( -\frac{35}{26}j \)
