import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        console.log("Listing contacts...");
        const contacts = await listContacts();
        console.table(contacts);
        break;
      case "get":
        console.log(`Getting contact with id ${id}...`);
        const contact = await getContactById(id);
        console.log(contact || `Contact with id ${id} not found`);
        break;
      case "add":
        console.log(`Adding contact: ${name}, ${email}, ${phone}...`);
        const newContact = await addContact(name, email, phone);
        console.log("Contact added:", newContact);
        break;
      case "remove":
        console.log(`Removing contact with id ${id}...`);
        const removedContact = await removeContact(id);
        console.log(
          removedContact
            ? "Contact removed:"
            : `Contact with id ${id} not found`,
          removedContact
        );
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error in invokeAction:", error.message);
  }
};

invokeAction(argv);
