import * as React from "react";
import { Entry, EntryItem } from "./Entry";
import { useState } from "react";

interface Props {

}

const test1: EntryItem = {
    id: 1,
    item: "Hydroflask",
    cost: 35.49,
    exclude: null,
    note: ""
}

const test2: EntryItem = {
    id: 2,
    item: "Puzzle",
    cost: 23.34,
    exclude: null,
    note: "space needle puzzles"
}

const test3: EntryItem = {
    id: 1,
    item: "Yoga mat",
    cost: 8.99,
    exclude: null,
    note: "trainermat for abs"
}


export const Entries: React.FC<Props> = (props) => {
    const [entries, setEntries] = useState<EntryItem[]>([]);
    entries.push(test1);
    entries.push(test2);
    entries.push(test3);

    return (
        <div>
            {entries.map(entry => <Entry entry={entry} />)}
        </div>
    );
}