export class GetEditById {
  constructor(repo) {
    this.repo = repo;
  }

  exec = async (id) => {
    if (!id) throw new Error("id required");
    return this.repo.getById(id);
  };
}
