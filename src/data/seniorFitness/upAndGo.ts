import { Exercise } from '@data/types/exercise';
import { Scale } from '@data/types/scales';

const menScales: Scale[] = [
  { age: [60, 64], score: [5.6, 3.8] },
  { age: [65, 69], score: [5.9, 4.3] },
  { age: [70, 74], score: [6.2, 4.4] },
  { age: [75, 79], score: [7.2, 4.6] },
  { age: [80, 84], score: [7.6, 5.2] },
  { age: [85, 89], score: [8.9, 5.5] },
  { age: [90, 94], score: [10.0, 6.2] },
];

const womanScales: Scale[] = [
  { age: [60, 64], score: [6.0, 4.4] },
  { age: [65, 69], score: [6.4, 4.8] },
  { age: [70, 74], score: [7.1, 4.9] },
  { age: [75, 79], score: [7.4, 5.2] },
  { age: [80, 84], score: [8.7, 5.7] },
  { age: [85, 89], score: [9.6, 6.2] },
  { age: [90, 94], score: [11.5, 7.3] },
];

export const upAndGo: Exercise = {
  id: 'upAndGo',
  name: '8-Foot Up-and-Go Test',
  description:
    'El ejercicio evalúa la movilidad mediante una prueba en la que los participantes deben levantarse de una silla, caminar 2,44 m (8 pies) y regresar a sentarse en la silla, el tiempo se mide desde que el examinador dice ya hasta que el participante vuelve a sentarse; se registra el tiempo total y se realiza un solo intento, aunque el día anterior se practica para familiarizarse con el ritmo; la prueba debe realizarse en una superficie lisa y segura, con sillas fuera del área de circulación, y se detendrá si algún participante muestra signos de esfuerzo excesivo.',
  materials: ['silla', 'cinta métrica'],
  scales: { m: menScales, w: womanScales },
  timer: 0,
  img: 'https://placehold.co/600x600',
  units: 'seg',
};
