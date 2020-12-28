import * as React from "react";

interface Props {
    text: string | number;
}

export const EntryText: React.FC<Props> = (props) => {
    return (
        <span className="entryText">
            {props.text}
        </span>
    );
}