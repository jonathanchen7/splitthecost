import React from "react";
import { Overview } from "./overview/Overview";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import { Fab, Tabs, Tab } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { Breakdown } from "./breakdown/Breakdown";
import { TabContext, TabPanel } from "@material-ui/lab";
import { useState } from "react";

export const SideDialog: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("ov");

  function handleOpen() {
    setOpen(!open);
  }

  function handleChange(event: React.ChangeEvent<{}>, value: string) {
    setTab(value);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className='sideDialog'
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 600, opacity: 0 }}
            exit={{ x: 600, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabContext value={tab}>
              <Tabs
                value={tab}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
              >
                <Tab className='sideDialogTab' value='ov' label='OVERVIEW' />
                <Tab className='sideDialogTab' value='bd' label='BREAKDOWN' />
              </Tabs>
              <motion.div
                animate={tab === "ov" ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <TabPanel className='sideDialogContent' value={"ov"}>
                  <Overview />
                </TabPanel>
              </motion.div>
              <motion.div
                animate={tab === "bd" ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <TabPanel className='sideDialogContent' value={"bd"}>
                  <Breakdown />
                </TabPanel>
              </motion.div>
            </TabContext>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className='sideDialogFab'
        animate={open ? { x: -440 } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Fab variant='extended' size='medium' onClick={handleOpen}>
          {open ? <ArrowForwardRoundedIcon /> : <ArrowBackRoundedIcon />}
        </Fab>
      </motion.div>
    </>
  );
};
