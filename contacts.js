import * as fs from "node:fs";
import chalk from "chalk";
import validator from "validator";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContacts = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const addContact = (name, email, mobPhone) => {
  const contact = { name, email, mobPhone };
  const contacts = loadContacts();

  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold("Contact already registered, use another name!")
    );
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Invalid Email!"));
      return false;
    }
  }

  if (!validator.isMobilePhone(mobPhone, "id-ID")) {
    console.log(chalk.red.inverse.bold("Invalid Mobile Phone!"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log(
    chalk.green.inverse.bold("Thank you, your data has been successfully added")
  );
};

const listContacts = () => {
  const contacts = loadContacts();
  console.log(chalk.greenBright.bold("Contact List"));
  contacts.forEach((contact, i) => {
    console.log(
      chalk.blueBright.bold(`${i + 1}. ${contact.name} => ${contact.mobPhone}`)
    );
  });
};

const detailContact = (name) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${name} not found!`));
    return false;
  }

  console.log(chalk.yellow.bold("Contact Details"));
  console.log(`Contact name: ${chalk.cyan.bold(contact.name)}`);
  console.log(`Mobile phone: ${chalk.cyan.bold(contact.mobPhone)}`);
  if (contact.email) {
    console.log(`Email: ${chalk.cyan.bold(contact.email)}`);
    return false;
  }
};

const deleteContact = (name) => {
  const contacts = loadContacts();
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${name} not found!`));
    return false;
  }

  fs.writeFileSync(dataPath, JSON.stringify(newContacts));
  console.log(
    chalk.greenBright.inverse.bold(`Contact data ${name} has been deleted`)
  );
};

export { addContact, listContacts, detailContact, deleteContact };
