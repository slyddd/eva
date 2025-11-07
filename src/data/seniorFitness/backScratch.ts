import { Exercise } from '@data/types/exercise';
import { Scale } from '@data/types/scales';

const menScales: Scale[] = [
  { age: [60, 64], score: [-6.5, 0.0] },
  { age: [65, 69], score: [-7.5, -1.0] },
  { age: [70, 74], score: [-8.0, -1.0] },
  { age: [75, 79], score: [-9.0, -2.0] },
  { age: [80, 84], score: [-9.5, -2.0] },
  { age: [85, 89], score: [-9.5, -3.0] },
  { age: [90, 94], score: [-10.5, -4.0] },
];

const womanScales: Scale[] = [
  { age: [60, 64], score: [-3.0, 1.5] },
  { age: [65, 69], score: [-3.5, 1.5] },
  { age: [70, 74], score: [-4.0, 1.0] },
  { age: [75, 79], score: [-5.0, 0.5] },
  { age: [80, 84], score: [-5.5, 0.0] },
  { age: [85, 89], score: [-7.0, -1.0] },
  { age: [90, 94], score: [-8.0, -1.0] },
];

export const backScratch: Exercise = {
  id: 'backScratch',
  name: 'Back Scratch Test',
  description:
    'El ejercicio evalúa la flexibilidad de los hombros mediante una prueba en la que los participantes, de pie y con la espalda recta, deben intentar tocarse las manos por detrás de la espalda, con un brazo por encima del hombro y el otro por debajo de la espalda; se mide la distancia entre las puntas de los dedos y se registra como positiva si se tocan o negativa si no lo hacen; la puntuación se basa en la mejor de las dos pruebas realizadas, y si el participante no puede alcanzar la posición inicial, se le permite realizarla con ambas piernas extendidas; la prueba debe realizarse en una superficie lisa y segura, con sillas fuera del área de circulación, y se detendrá si algún participante muestra signos de esfuerzo excesivo.',
  materials: ['silla', 'cinta métrica'],
  scales: { m: menScales, w: womanScales },
  img: require('./assets/backscratch.png'),
  units: 'cm',
};
