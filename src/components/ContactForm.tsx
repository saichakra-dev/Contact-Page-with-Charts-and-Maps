import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../features/contactsSlice";
import { useNavigate } from "react-router-dom";

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addContact({ id: Date.now().toString(), firstName, lastName, status })
    );
    setFirstName("");
    setLastName("");
    setStatus("active");
    navigate("/contacts");
  };

  return (
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Contact
      </button>
    </form>
  );
};

export default ContactForm;
