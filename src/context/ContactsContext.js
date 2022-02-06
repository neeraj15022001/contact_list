import React, {useState, createContext} from "react";

export const ContactsContext = createContext();
export const ContactsProvider = (props) => {
    const [contacts, setContacts] = useState([]);
    return (
        <ContactsContext.Provider value={[contacts, setContacts]}>
            {props.children}
        </ContactsContext.Provider>
    )
}