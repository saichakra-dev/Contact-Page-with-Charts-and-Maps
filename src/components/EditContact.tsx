import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useParams, useNavigate } from "react-router-dom";
import { updateContact } from "../features/contactsSlice";

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === id)
  );
  const [firstName, setFirstName] = useState(contact?.firstName || "");
  const [lastName, setLastName] = useState(contact?.lastName || "");
  const [status, setStatus] = useState(contact?.status || "active");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      dispatch(updateContact({ ...contact, firstName, lastName, status }));
      navigate("/contacts");
    }
  };

  return (
    //form to edit contact
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label>First Name:</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="block w-full p-2 border"
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="block w-full p-2 border"
        />
      </div>
      <div>
        <label>Status:</label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={status === "active"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={status === "inactive"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Inactive
          </label>
        </div>
      </div>
      {/* Save changes button */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
    </form>
  );
};

export default EditContact;
