import Edit from "./Edit";

const fakeEdits = [
  { id: "1", type: "sfx", content: "Bang noise" },
  { id: "2", type: "vfx", content: "Interstellar" },
  { id: "3", type: "music", content: "Sad violin" },
];

function EditList({ title, edits = fakeEdits }) {
  return (
    <div>
      <h2>{title || "Edit List"}</h2>
      <ul>
        {edits.map((edit, index) => (
          <Edit key={index} edit={edit} />
        ))}
      </ul>
    </div>
  );
}

export default EditList;
