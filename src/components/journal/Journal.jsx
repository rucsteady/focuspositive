import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import JournalMain from "./JournalMain";
import JournalSidebar from "./JournalSidebar";
import axios from "axios";

function Journal() {
  const [entrys, setEntrys] = useState(
    localStorage.entrys ? JSON.parse(localStorage.entrys) : []
  );
  const [activeEntry, setActiveEntry] = useState(false);

  const [updatedEntrys, setUpdatedEntrys] = useState();

  useEffect(() => {
    localStorage.setItem('entrys', JSON.stringify(entrys));
  }, [entrys]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/journal")
      .then((response) => setUpdatedEntrys(response.data.journal));
  }, []);

  console.log(updatedEntrys);

  const onAddEntry = async () => {
    const newEntry = {
      title: "Eintrag ohne Titel",
      body: "",
      lastModified: Date.now(),
    };

    // const response = await axios.post("http://localhost:8080/api/journal", newEntry)
    setEntrys([newEntry, ...entrys]);
    setActiveEntry(newEntry.id);
  };

  const onDeleteEntry = (entryId) => {
    setEntrys(entrys.filter(({ id }) => id !== entryId));
  };

  const onUpdateEntry = (updatedEntry) => {
    const updatedEntrysArr = entrys.map((entry) => {
      if (entry.id === updatedEntry.id) {
        return updatedEntry;
      }

      return entry;
    });

    setEntrys(updatedEntrysArr);
  };

  const getActiveEntry = () => {
    return entrys.find(({ id }) => id === activeEntry);
  };

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item>
            <JournalSidebar
              entrys={entrys}
              onAddEntry={onAddEntry}
              onDeleteEntry={onDeleteEntry}
              activeEntry={activeEntry}
              setActiveEntry={setActiveEntry}
            />
          </Grid>
          <Grid item>
            <JournalMain
              activeEntry={getActiveEntry()}
              onUpdateEntry={onUpdateEntry}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Journal;
