import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const initialContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];

  const savedContacts =
    JSON.parse(localStorage.getItem("contacts")) || initialContacts;

  const [contacts, setContacts] = useState(savedContacts);
  const [filteredContacts, setFilteredContacts] = useState(savedContacts);

  const addContact = (contact) => {
    const newContact = { ...contact, id: nanoid() };
    setContacts([newContact, ...contacts]);
    setFilteredContacts([newContact, ...filteredContacts]);
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filterContact = (e) => {
    const search = e.target.value.toLowerCase();
    setFilteredContacts(
      contacts.filter((item) => item.name.toLowerCase().includes(search))
    );
  };

  const handleDelete = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
    setFilteredContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox filterContact={filterContact} />
      <ContactList handleDelete={handleDelete} contacts={filteredContacts} />
    </div>
  );
}

export default App;
