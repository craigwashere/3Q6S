export interface Title {
    area: string;
    auditor: string;
    date: Date;
}

export interface QandA {
    'id': string;
    'question': string;
    'answer': Rating;
    'comment': string
}

export interface Section {
    header: string;
    questions: QandA[]
}

export interface Question {
    header: string;
    questions: string[]
}

export interface Sections {
    [header: string] : Section[]
}

export enum Rating {
    n_a   = "N/A",
    zero  = "0",
    one   = "1",
    two   = "2",
    three = "3",
    four  = "4",
    five  = "5"
  }

  export interface Sections2 {
    [x: number] : Section
  }
  
  export interface valuesInterface {
    'area': string;
    'auditor': string;
    'date': string;
    'questions': Sections2
  }