import {
  armCurl,
  upAndGo,
  backScratch,
  chairStand,
  sitAndReach,
  twoMinuteStep,
} from './seniorFitness';
import { Battery } from './types/battery';

export const batteries: Battery[] = [
  {
    name: 'Senior Fitness',
    id: 'seniorFitness',
    description:
      'Batería de ejercicios diseñada para evaluar y mejorar la aptitud física en adultos mayores, enfocándose en la fuerza, resistencia, flexibilidad y equilibrio a través de una serie de pruebas estandarizadas.',
    duration: 10,
    excercises: [
      chairStand,
      armCurl,
      twoMinuteStep,
      sitAndReach,
      backScratch,
      upAndGo,
    ],
  },
];
