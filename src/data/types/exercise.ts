import { Scale } from './scales';

export interface Exercise {
  name: string;
  id: string;
  description: string;
  materials: string[];
  scales: { m: Scale[]; w: Scale[] };
  timer?: number;
  units: string;
  img: string;
}
