import * as contacts from "./contacts.js";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));

yargs
  .command({
    command: "add",
    describe: "Adding a new contact",
    builder: {
      name: {
        describe: "Full name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      mobPhone: {
        describe: "Mobile Phone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.addContact(argv.name, argv.email, argv.mobPhone);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Shows the entire contact list",
  handler() {
    contacts.listContacts();
  },
});

yargs.command({
  command: "detail",
  describe: "Shows details of a contact by name",
  builder: {
    name: {
      describe: "Full name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

yargs.command({
  command: "delete",
  describe: "Delete a contact by name",
  builder: {
    name: {
      describe: "Full name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.parse();
