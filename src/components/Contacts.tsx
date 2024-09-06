import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteContact } from "../features/contactsSlice";
import { Link } from "react-router-dom";

// Define the Contacts component as a functional component
const Contacts: React.FC = () => {
  // Use the useSelector hook to get the contacts from the Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  // Use the useDispatch hook to get the dispatch function from the Redux store
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      {/* Link to the create contact page */}
      <Link
        to="/contacts/create"
        className="bg-green-500 text-white p-2 rounded mb-4 block"
      >
        Create Contact
      </Link>
      {/* Container for the contact cards */}
      <div className="flex flex-wrap -mx-2">
        {contacts.length > 0 ? (
          // Map over the contacts array and render a contact card for each contact
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="border p-2 mb-2 flex flex-col justify-between items-center w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-2"
            >
              <div className="w-full">
                {/* Display the contact's name */}
                <h3 className="text-xl">
                  {contact.firstName} {contact.lastName}
                </h3>
                {/* Display the contact's status */}
                <p>Status: {contact.status}</p>
              </div>
              <div className="space-x-2 mt-2">
                {/* Link to the edit contact page */}
                <Link
                  to={`/contacts/edit/${contact.id}`}
                  className="bg-yellow-500 p-2 rounded"
                >
                  Edit
                </Link>
                {/* Button to delete the contact */}
                <button
                  onClick={() => dispatch(deleteContact(contact.id))}
                  className="bg-red-500 p-2 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          // Message to display if no contacts are found
          <p>
            No Contact Found. Please add a contact from Create Contact Button.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contacts;
