export interface Task {
  title: string,
  description: string,
  deadline: string,
  priority: string,
  order?: number,
  progress?: string,
  id?: number
}