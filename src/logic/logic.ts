import { User, Entry, UserBreakdownData, OverviewData } from "../models/models";

// Calculates and returns the breakdown data.
export function calculateUserBreakdown(
  user: User,
  entries: Entry[],
  users: { [id: string]: User }
): UserBreakdownData {
  let breakdownData: UserBreakdownData = {
    user: user,
    totalSpent: 0,
    totalOwed: 0,
    userBreakdown: {},
  };

  Object.entries(users).forEach((pair) => {
    let curUser = pair[1];
    if (curUser !== user) {
      breakdownData.userBreakdown[curUser.id] = { theyOwe: 0, youOwe: 0 };
    }
  });

  entries.forEach((entry) => {
    const numEntryUsers = Object.keys(users).length - entry.exclude.length;
    if (entry.user === user.id) {
      // This is the current user's entry. Add the cost to totalSpent and
      // increment "theyOwe" for all valid users.
      breakdownData.totalSpent += entry.cost;

      const validUsers = Object.keys(users).filter(
        (userId) => !entry.exclude.includes(userId) && userId !== entry.user
      );
      validUsers.forEach((userId) => {
        breakdownData.userBreakdown[userId].theyOwe +=
          entry.cost / numEntryUsers;
      });
    } else if (!entry.exclude.includes(user.id)) {
      // This is another user's entry that you need to pay for. Add the cost to
      // totalOwed and increment "youOwe" for this particular user.
      breakdownData.totalOwed += entry.cost / numEntryUsers;
      breakdownData.userBreakdown[entry.user].youOwe +=
        entry.cost / numEntryUsers;
    }
  });

  return breakdownData;
}

// Calculates and returns the overview data.
export function calculateOverview(
  entries: Entry[],
  users: { [id: string]: User }
): OverviewData {
  let overviewData: OverviewData = {};

  // Create entries for each user.
  Object.entries(users).forEach((pair) => {
    let user = pair[1];
    overviewData[user.id] = { totalSpent: 0, totalOwed: 0 };
  });

  entries.forEach((entry) => {
    overviewData[entry.user].totalSpent += entry.cost;

    const validUsers = Object.keys(users).filter(
      (userId) => !entry.exclude.includes(userId)
    );
    const userCost = entry.cost / validUsers.length;

    validUsers.forEach((userId) => {
      if (userId !== entry.user) {
        overviewData[userId].totalOwed += userCost;
      }
    });
  });

  return overviewData;
}

// Returns true if a name is valid, false otherwise.
// Assumes the name has no leading/trailing whitespace.
export function validateName(name: string): boolean {
  return name.length > 0 && name.length < 21 && /^[a-zA-Z'-\s]+$/.test(name);
}

// Returns true if a sheet title is valid, false otherwise.
// Assumes the title has no leading/trailing whitespace.
export function validateSheetTitle(title: string): boolean {
  return (
    title.length > 2 && title.length < 21 && /^[0-9a-zA-Z!@#'-\s]+$/.test(title)
  );
}

// Returns true if a custom sheet link is valid, false otherwise.
// Assumes the title has no leading/trailing whitespace.
export function validateCustomSheetLink(link: string): boolean {
  return link.length > 4 && link.length < 21 && /^[0-9a-zA-Z]+$/.test(link);
}

// "Calculates" an avatar's color.
export function getAvatarColor(
  user: User,
  userIdx: number,
  placeholder?: boolean
): string {
  if (placeholder) return "#dedede";

  const colors = [
    "#AD1457",
    "#F9A825",
    "#1565C0",
    "#4527A0",
    "#D84315",
    "#4E342E",
    "#00838F",
    "#0277BD",
    "#EF6C00",
    "#424242",
  ];

  return colors[userIdx % colors.length];
}

export function handleKeyPress(
  e: React.KeyboardEvent,
  target: string,
  action: () => void
) {
  if (e.key.toLowerCase() === target) {
    action();
  }
}
