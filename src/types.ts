export type File = {
  id: number;
  name: string;
  device: string;
  path: string;
  status: FileStatus;
};

export enum FileStatus {
  Available = "available",
  Scheduled = "scheduled"
}
