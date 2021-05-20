export interface FileRepository {
    uploadFile(id: string, file: any): Promise<string>;
  }