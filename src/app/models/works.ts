export interface LanguageWorks {
  title: string;
  description: string;
}

export interface Works {
  image: string;
  languages: {
    english: LanguageWorks;
    german: LanguageWorks;
  };
  link: string;
  dev: any;
}
