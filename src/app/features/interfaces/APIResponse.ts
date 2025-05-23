export interface APIResponse<DTOData> {
  date: string;
  size: number;
  data: Array<DTOData>;
}