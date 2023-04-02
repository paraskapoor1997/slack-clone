import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "./SidebarOption";
import {
  Add,
  Apps,
  BookmarkBorder,
  Drafts,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@mui/icons-material";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();
  const [showThreads, setShowThreads] = useState(false);
  const [showChannels, setShowChannels] = useState(false);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Paras's Slack Clone </h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>

      <SidebarOption Icon={InsertComment} title="Threads" id={"threads"} />
      <SidebarOption Icon={Inbox} title="Mention" id="Mention" />
      <SidebarOption Icon={Drafts} title="Saved" id="saved" />
      {showThreads && (
        <>
          <SidebarOption Icon={BookmarkBorder} title="Bookmark" id="bookmark" />
          <SidebarOption Icon={PeopleAlt} title="People" id="people" />
          <SidebarOption Icon={Apps} title="App" id="app" />
          <SidebarOption Icon={FileCopy} title="FileCopy" id="filecopy" />
        </>
      )}

      <div className="sidebarOption" onClick={() => setShowThreads(!showThreads)}>
        {showThreads ? (
          <>
            <ExpandLess className="sidebarOption__icon" />
            <h3>show less</h3>
          </>
        ) : (
          <>
            <ExpandMore className="sidebarOption__icon" />
            <h3>show more</h3>
          </>
        )}
      </div>

      <hr />
      {/* <SidebarOption Icon={ExpandMore} title="Channels" /> */}

      <div className="sidebarOption" onClick={() => setShowChannels(!showChannels)}>
        {showChannels ? (
          <>
            <ExpandLess className="sidebarOption__icon" />
            <h3>Channels</h3>
          </>
        ) : (
          <>
            <ExpandMore className="sidebarOption__icon" />
            <h3>Channels</h3>
          </>
        )}
      </div>

      <hr />

      {showChannels && <SidebarOption Icon={Add} addChannelOption title="Add channel" />}

      {showChannels &&
        channels.map((channel) => <SidebarOption title={channel.name} id={channel.id} />)}
    </div>
  );
};

export default Sidebar;
