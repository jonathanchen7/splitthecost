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
    if (entry.createdBy === user.id) {
      // This is the current user's entry. Add the cost to totalSpent and
      // increment "theyOwe" for all valid users.
      breakdownData.totalSpent += entry.cost;

      const validUsers = Object.keys(users).filter(
        (userId) =>
          !entry.exclude.includes(userId) && userId !== entry.createdBy
      );
      validUsers.forEach((userId) => {
        breakdownData.userBreakdown[userId].theyOwe +=
          entry.cost / numEntryUsers;
      });
    } else if (!entry.exclude.includes(user.id)) {
      // This is another user's entry that you need to pay for. Add the cost to
      // totalOwed and increment "youOwe" for this particular user.
      breakdownData.totalOwed += entry.cost / numEntryUsers;
      breakdownData.userBreakdown[entry.createdBy].youOwe +=
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
    overviewData[entry.createdBy].totalSpent += entry.cost;

    const validUsers = Object.keys(users).filter(
      (userId) => !entry.exclude.includes(userId)
    );
    const userCost = entry.cost / validUsers.length;

    validUsers.forEach((userId) => {
      if (userId !== entry.createdBy) {
        overviewData[userId].totalOwed += userCost;
      }
    });
  });

  return overviewData;
}

export function validateSheetTitle(title: string): boolean {
  return !(
    title.trim().length < 5 ||
    title.length > 20 ||
    title.match(/[~`%^#@*+=\-[\]\\';,/{}|\\"<>]/)
  );
}

export function validateCustomSheetLink(link: string): boolean {
  return !(
    link.trim().length < 5 ||
    link.length > 20 ||
    link.match(/^[0-9a-z]+$/)
  );
}

// "Calculates" an avatar's color.
export function getAvatarColor(user: User, placeholder?: boolean): string {
  if (placeholder) return "#dedede";

  const colors = [
    "#AD1457",
    "#1565C0",
    "#6A1B9A",
    "#4527A0",
    "#283593",
    "#4E342E",
    "#00838F",
    "#0277BD",
    "#EF6C00",
    "#00695C",
    "#2E7D32",
    "#F9A825",
    "#C62828",
    "#9E9D24",
    "#558B2F",
    "#37474F",
    "#FF8F00",
    "#424242",
    "#D84315",
  ];

  var h = 0,
    l = user.displayName.length,
    i = 0;
  if (l > 0)
    while (i < l) h = ((h << 5) - h + user.displayName.charCodeAt(i++)) | 0;
  return colors[Math.abs(h % colors.length)];
}
