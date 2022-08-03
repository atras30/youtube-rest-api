import React from "react";

export default function Student({student}) {
  return (
    <div className="card col-3 shadow p-3">
      <div>
        <strong>Nama : </strong>{student.name}
      </div>
      <div>
        <strong>Username : </strong>{student.username}
      </div>
      <div>
        <strong>Email : </strong>{student.email}
      </div>
    </div>
  );
}
