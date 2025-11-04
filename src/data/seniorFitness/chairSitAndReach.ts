import { Exercise } from '@data/types/exercise';
import { Scale } from '@data/types/scales';

const menScales: Scale[] = [
  { age: [60, 64], score: [-2.5, 4.0] },
  { age: [65, 69], score: [-3.0, 3.0] },
  { age: [70, 74], score: [-3.0, 3.0] },
  { age: [75, 79], score: [-4.0, 2.0] },
  { age: [80, 84], score: [-5.5, 1.5] },
  { age: [85, 89], score: [-5.5, 0.5] },
  { age: [90, 94], score: [-6.5, -0.5] },
];

const womanScales: Scale[] = [
  { age: [60, 64], score: [-0.5, 5.0] },
  { age: [65, 69], score: [-0.5, 4.5] },
  { age: [70, 74], score: [-1.0, 4.0] },
  { age: [75, 79], score: [-1.5, 3.5] },
  { age: [80, 84], score: [-2.0, 3.0] },
  { age: [85, 89], score: [-2.5, 2.5] },
  { age: [90, 94], score: [-4.5, 1.0] },
];

export const sitAndReach: Exercise = {
  id: 'sitAndReach',
  name: 'Chair Sit and Reach Test',
  description:
    'El ejercicio evalúa la flexibilidad de la parte posterior de las piernas y la parte baja de la espalda mediante una prueba en la que los participantes, sentados al borde de una silla, con una pierna extendida y la otra apoyada en el suelo, deben alcanzar la punta de los dedos de los pies con ambas manos, manteniendo la posición durante 2 segundos; se mide la distancia entre la punta de los dedos y el borde de la silla, y se registra como positiva si los dedos sobrepasan el borde o negativa si no lo hacen; la puntuación se basa en la mejor de las dos pruebas realizadas, y si el participante no puede alcanzar la posición inicial, se le permite realizarla con ambas piernas extendidas; la prueba debe realizarse en una superficie lisa y segura, con sillas fuera del área de circulación, y se detendrá si algún participante muestra signos de esfuerzo excesivo.',
  materials: ['silla', 'cinta métrica'],
  scales: { m: menScales, w: womanScales },
  img: 'https://placehold.co/600x600',
  units: 'cm',
};
