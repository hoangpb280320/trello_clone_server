export function generateId(publicId: string): string {
  return publicId.split('/')[1];
}

export function generatePublicId(id: string): string {
  return `${this.folderName}/${id}`;
}
