import React from "react";
import { Overview } from "./overview/Overview";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { Fab, Tabs, Tab } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { Breakdown } from "./breakdown/Breakdown";
import { TabContext, TabPanel } from "@material-ui/lab";
import { Entry, User } from "../../models/models";
import { useState } from "react";

interface Props {
  curUser: User;
  users: User[];
  entries: Entry[];
}

export const SideDialog: React.FC<Props> = ({ curUser, users, entries }) => {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("overview");

  function handleOpen() {
    setOpen(!open);
  }

  function handleChange(event: React.ChangeEvent<{}>, value: string) {
    setTab(value);
  }

  return (
    <div>
      <motion.div
        className='sideDialogFab'
        animate={open ? { x: -430 } : { x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Fab variant='extended' size='medium' onClick={handleOpen}>
          {open ? <ArrowForwardRoundedIcon /> : <ArrowBackRoundedIcon />}
        </Fab>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className='sideDialog'
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 600, opacity: 0 }}
            exit={{ x: 600, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TabContext value={tab}>
              <Tabs
                className='tabs'
                value={tab}
                onChange={handleChange}
                variant='fullWidth'
                indicatorColor='primary'
                textColor='primary'
              >
                <Tab className='dialogTab' value='overview' label='OVERVIEW' />
                <Tab
                  className='dialogTab'
                  value='breakdown'
                  label='BREAKDOWN'
                />
              </Tabs>
              <TabPanel className='sideDialogContent' value={"overview"}>
                <Overview users={users} entries={entries} curUser={curUser} />
              </TabPanel>
              <TabPanel className='sideDialogContent' value={"breakdown"}>
                <Breakdown users={users} entries={entries} curUser={curUser} />
              </TabPanel>
            </TabContext>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
