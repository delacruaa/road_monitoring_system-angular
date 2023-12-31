export interface IMaterial {
  id: number;
  done: number;
  today: number;
  yesterday: number;
  project: number;
  type: string;
  unit: string;
}

export interface IGraphic {
  [key: string]: {
    [key: string]: {
      isDones: boolean;
      name: string;
      num: number;
    }[];
  }[];
}

export interface ICell {
  isDones: boolean;
  name: string;
  num: number;
}
export interface IConstructive {
  id: string;
  constructive: string;
  projectLeft: number | null;
  projectRight: number | null;
  doneLeft: number | null;
  doneRight: number | null;
  todayRight: number | null;
  todayLeft: number | null;
  yesterdayLeft: number | null;
  yesterdayRight: number | null;
  project: number | null;
  done: number | null;
  today: number | null;
  yesterday: number | null;
  type: string;
}

export interface IObject {
  do: IConstructive;
  graph: IGraphic;
  material: IMaterial;
}
