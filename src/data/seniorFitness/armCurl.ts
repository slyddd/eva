import { Exercise } from '@data/types/exercise';
import { Scale } from '@data/types/scales';

const menScales: Scale[] = [
  { age: [60, 64], score: [16, 22] },
  { age: [65, 69], score: [15, 21] },
  { age: [70, 74], score: [14, 21] },
  { age: [75, 79], score: [13, 19] },
  { age: [80, 84], score: [13, 19] },
  { age: [85, 89], score: [11, 17] },
  { age: [90, 94], score: [10, 14] },
];

const womanScales: Scale[] = [
  { age: [60, 64], score: [13, 19] },
  { age: [65, 69], score: [12, 18] },
  { age: [70, 74], score: [12, 17] },
  { age: [75, 79], score: [11, 17] },
  { age: [80, 84], score: [10, 16] },
  { age: [85, 89], score: [10, 15] },
  { age: [90, 94], score: [8, 13] },
];

export const armCurl: Exercise = {
  name: 'Arm Curl Test',
  id: 'armCurl',
  description:
    'El ejercicio consiste en evaluar la fuerza del tren superior mediante un test en el que el participante, sentado en una silla con la espalda recta, los pies apoyados en el suelo y el brazo extendido hacia abajo, debe levantar una pesa de 2,27 kg (5 lb) para las mujeres y 3,63 kg (8 lb) para los hombres, el mayor número de veces posibles en 30 segundos; se cuenta como repetición completa si al finalizar el movimiento ha realizado al menos la mitad del levantamiento, y antes de iniciar el test se practica el movimiento una o dos veces tras una demostración inicial (primero de forma lenta para mostrar la técnica correcta y luego a mayor velocidad para enfatizar la necesidad de rapidez sin perder seguridad), además de asegurar que la silla esté estable (respaldada en la pared o sostenida) y vigilar que el participante no presente problemas de equilibrio, deteniendo el test de inmediato si se siente dolor.',
  materials: ['silla', 'pesas (5 lb y 8 lb)'],
  scales: { m: menScales, w: womanScales },
  timer: 30,
  units: 'rep',
  img: require('./assets/armcurl.png'),
};
