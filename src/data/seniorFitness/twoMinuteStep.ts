import { Exercise } from '@data/types/exercise';
import { Scale } from '@data/types/scales';

const menScales: Scale[] = [
  { age: [60, 64], score: [87, 115] },
  { age: [65, 69], score: [86, 116] },
  { age: [70, 74], score: [80, 110] },
  { age: [75, 79], score: [73, 109] },
  { age: [80, 84], score: [71, 103] },
  { age: [85, 89], score: [59, 91] },
  { age: [90, 94], score: [52, 86] },
];

const womanScales: Scale[] = [
  { age: [60, 64], score: [75, 107] },
  { age: [65, 69], score: [73, 107] },
  { age: [70, 74], score: [68, 101] },
  { age: [75, 79], score: [68, 100] },
  { age: [80, 84], score: [60, 90] },
  { age: [85, 89], score: [55, 85] },
  { age: [90, 94], score: [44, 72] },
];

export const twoMinuteStep: Exercise = {
  id: 'twoMinutesStep',
  name: '2-Minute Step Test',
  description:
    'El ejercicio evalúa la resistencia aeróbica mediante una prueba en la que los participantes deben elevar las rodillas hasta la altura de la cadera durante 2 minutos, solo se contabilizan los pasos en los que la rodilla alcanza la altura fijada y, si no lo logra, se le pedirá reducir el ritmo sin detener el tiempo la puntuación corresponde al número total de pasos completos realizados (derecha-izquierda), la prueba debe realizarse en una superficie lisa y segura, con sillas fuera del área de circulación, y se detendrá si algún participante muestra signos de esfuerzo excesivo.',
  materials: [],
  scales: { m: menScales, w: womanScales },
  timer: 120,
  img: require('./assets/twominutesstep.png'),
  units: 'rep',
};
