import * as React from "react";
import { useEffect, useState } from "react";
import { Entry, User, UserBreakdownData } from "../../models/models";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import { Button } from "@material-ui/core";
import { calculateUserBreakdown } from "../../actions/actions";
import { BreakdownHeader } from "./BreakdownHeader";
import { BreakdownRow } from "./BreakdownRow";

interface Props {
  users: User[];
  curUser: User;
  entries: Entry[];
  open: boolean;
  setToggleOverview: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleBreakdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Breakdown: React.FC<Props> = ({
  users,
  curUser,
  entries,
  open,
  setToggleOverview,
  setToggleBreakdown,
}) => {
  const [breakdownData, setBreakdownData] = useState<UserBreakdownData>();

  useEffect(() => {
    setBreakdownData(calculateUserBreakdown(curUser, entries, users));
  }, [curUser, users, entries]);

  function toggleOverview() {
    setToggleOverview(true);
    setToggleBreakdown(false);
  }

  return (
    <div>
      {open && (
        <div className='breakdown'>
          <BreakdownHeader breakdownData={breakdownData} />
          {users.map(
            (user) =>
              user !== curUser && (
                <BreakdownRow
                  user={user}
                  curUser={curUser}
                  users={users}
                  data={breakdownData?.userBreakdown[user.id]}
                  key={user.id}
                />
              )
          )}
          <Button
            className='sideDialogButton'
            variant='contained'
            color='primary'
            startIcon={<ReceiptRoundedIcon />}
            onClick={toggleOverview}
          >
            <span className='buttonText'>Overview</span>
          </Button>
        </div>
      )}
    </div>
  );
};
