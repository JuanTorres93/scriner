import Edit from "./Edit";

function EditList({ edits }) {
  return (
    <div>
      <ul>
        {edits.map((edit, index) => (
          <Edit key={index} edit={edit} />
        ))}
      </ul>
    </div>
  );
}

export default EditList;
