export interface RocketsHttpService {
  getRocketNames(ids: string[]): Promise<string[]>;
  getRocketName(id: string): Promise<string>;
}
