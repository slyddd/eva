import { Exercise } from '@data/types/exercise';
import { Scale } from '@data/types/scales';

const menScales: Scale[] = [
  { age: [60, 64], score: [14, 19] },
  { age: [65, 69], score: [12, 18] },
  { age: [70, 74], score: [12, 17] },
  { age: [75, 79], score: [11, 17] },
  { age: [80, 84], score: [10, 15] },
  { age: [85, 89], score: [8, 14] },
  { age: [90, 94], score: [7, 12] },
];

const womanScales: Scale[] = [
  { age: [60, 64], score: [12, 17] },
  { age: [65, 69], score: [11, 16] },
  { age: [70, 74], score: [10, 15] },
  { age: [75, 79], score: [10, 15] },
  { age: [80, 84], score: [9, 14] },
  { age: [85, 89], score: [8, 13] },
  { age: [90, 94], score: [4, 11] },
];

export const chairStand: Exercise = {
  id: 'chairStand',
  name: 'Chair Stand Test',
  description:
    'El ejercicio consiste en evaluar la fuerza del tren inferior mediante un test en el que el participante, sentado en el centro de una silla con la espalda recta,los pies apoyados en el suelo y los brazos cruzados sobre el pecho, debe levantarse y volver a sentarse el mayor número de veces posibles en 30 segundos; se cuenta como repetición completa si al finalizar el movimiento ha realizado al menos la mitad del levantamiento y el sentado, y antes de iniciar el test se practica el movimiento una o dos veces tras una demostración inicial (primero de forma lenta para mostrar la técnica correcta y luego a mayor velocidad para enfatizar la necesidad de rapidez sin perder seguridad), además de asegurar que la silla esté estable (respaldada en la pared o sostenida) y vigilar que el participante no presente problemas de equilibrio, deteniendo el test de inmediato si se siente dolor.',
  materials: ['silla'],
  scales: { m: menScales, w: womanScales },
  img: require('./assets/chairstand.png'),
  timer: 30,
  units: 'rep',
};
