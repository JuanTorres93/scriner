// Receive the repository in the constructor (Dependency Inversion)
export class GetEditById {
  constructor(editsRepo) {
    if (!editsRepo) throw new Error("GetEditById requires an editsRepo");
    this.edits = editsRepo;
  }

  async exec(id) {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid 'id' parameter");
    }
    const edit = await this.edits.getById(id);
    if (!edit) throw new Error("EditNotFound");
    return edit; // Domain entity Edit
  }
}
