import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import { Entry, User } from "../models/models";
import { OverviewGrid } from "./breakdown/OverviewGrid";
import { EntriesGrid } from "./entries/EntriesGrid";
import { Header } from "./header/Header";
import { UsersBar } from "./users/UsersBar";
import { v4 as uuidv4 } from "uuid";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import AddIcon from "@material-ui/icons/Add";
import { duration, Fab } from "@material-ui/core";
import { motion } from "framer-motion";

const jonathan: User = {
  id: uuidv4(),
  firstName: "Jonathan",
  lastName: "Chen",
  initials: "JC",
  email: "jonathanschen28@gmail.com",
  entries: ["fakeid1"],
};
const abigail: User = {
  id: uuidv4(),
  firstName: "Abigail",
  lastName: "Chen",
  initials: "AC",
  email: "abigail.chen@live.com",
  entries: ["fakeid2"],
};
const mom: User = {
  id: uuidv4(),
  firstName: "Christine",
  lastName: "Liu",
  initials: "CL",
  email: "thechens28@gmail.com",
  entries: [],
};
const dad: User = {
  id: uuidv4(),
  firstName: "Hongbo",
  lastName: "Chen",
  initials: "HC",
  email: "bradchen28@gmail.com",
  entries: [],
};

const entry1: Entry = {
  id: "fakeid1",
  item: "Hydroflask",
  cost: 35.99,
  note: "keeps ur water cold",
  exclude: [abigail],
  createdBy: jonathan,
};

const entry2: Entry = {
  id: "fakeid2",
  item: "canoe",
  cost: 65.95,
  note: "issa boat",
  exclude: [mom, dad],
  createdBy: abigail,
};

const entry3: Entry = {
  id: "",
  item: "",
  cost: 0,
  note: "",
  exclude: [],
  createdBy: jonathan,
};

export const SplitTheCost: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [curUser, setCurUser] = useState<User>(jonathan);

  const [openOverview, setOpenOverview] = useState(false);

  useEffect(() => {
    setUsers([jonathan, abigail, mom, dad]);
    setEntries([entry1, entry2, entry3]);
    setCurUser(jonathan);
  }, []);

  function addItem() {
    const newItem: Entry = {
      id: uuidv4(),
      item: "",
      cost: 0,
      exclude: null,
      note: "",
      createdBy: curUser,
    };
    setEntries((entries) => [...entries, newItem]);
    curUser.entries.push(newItem.id);
  }

  function handleOpen() {
    setOpenOverview(!openOverview);
  }

  return (
    <div>
      <Header curUser={curUser} />
      <UsersBar
        users={users}
        curUser={curUser}
        setUsers={setUsers}
        setEntries={setEntries}
      />
      <EntriesGrid
        entries={entries}
        setEntries={setEntries}
        curUser={curUser}
      />
      <div className='addItemFabDiv'>
        <Fab variant='extended' size='medium' onClick={addItem}>
          <AddIcon />
          Add Item
        </Fab>
      </div>
      <motion.div
        className='overviewFabDiv'
        animate={openOverview ? { x: -460 } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Fab variant='extended' size='medium' onClick={handleOpen}>
          {openOverview ? (
            <ArrowForwardRoundedIcon />
          ) : (
            <ArrowBackRoundedIcon />
          )}
        </Fab>
      </motion.div>
      <OverviewGrid
        users={users}
        curUser={curUser}
        entries={entries}
        open={openOverview}
      />
    </div>
  );
};
