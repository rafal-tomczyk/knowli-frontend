export type Topic = 'QUADRATIC_FUNCTION';
export type TaskType = 'MATCH_FORMULA_TO_GRAPH';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface FunctionObject {
  _id: string;
  topic: Topic;
  task_type: TaskType;
  difficulty: Difficulty;
  content: Content;
}

export interface Content {
  parameters: Parameters;
  forms: Forms;
  properties: Properties;
}

export interface Parameters {
  a: number;
  b: number;
  c: number;
}

export interface Forms {
  general: string;
  canonical: string;
  factored: string;
}

export interface Properties {
  roots: number[];
  roots_string: string[];
  vertex: [number, number]; // 👈 tuple (x, y)
}

export interface Point {
  x: number;
  y: number;
}
