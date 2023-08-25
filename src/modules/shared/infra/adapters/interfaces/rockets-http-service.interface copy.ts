export interface RocketsHttpService {
  getRockets(ids: string[]): Promise<string[]>;
}
