import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { withStyles } from "tss-react/mui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
const defaultToolbarStyles = {
    iconButton: {
    },
};

const ButtonSortToolbar = ({ reverseData }) => {
    return (
        <Tooltip title="Sort STT">
            <IconButton onClick={reverseData}>
                <FontAwesomeIcon icon={faSort} style={{ fontSize: 18 }} />
            </IconButton>
        </Tooltip>
    );
}

export default withStyles(ButtonSortToolbar, defaultToolbarStyles, { name: "CustomToolbar" });
