export type File = {
  id: number;
  name: string;
  device: string;
  path: string;
  status: string;
};

export enum FileStatus {
  Available = "available",
  Scheduled = "scheduled"
}
