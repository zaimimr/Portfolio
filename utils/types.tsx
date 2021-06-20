export type ProjectImageCardType = {
  align: 'left' | 'right';
  project: IProject;
};
export type ProjectCardType = {
  project: IProject;
};

export type IProject = {
  id: string;
  title: string;
  subtitle: string;
  language: string;
  text: string;
  date: Date;
  img?: string;
  github?: string;
  web?: string;
};
