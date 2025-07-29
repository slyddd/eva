export interface StepType {
  nextHandler: () => void;
  prevHandler?: () => void;
}
