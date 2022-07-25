import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import JournalMain from "./JournalMain";
import JournalSidebar from "./JournalSidebar";
import { nanoid } from "nanoid";

function Journal() {
  const [entrys, setEntrys] = useState(
    localStorage.entrys ? JSON.parse(localStorage.entrys) : []
  );

  const [activeEntry, setActiveEntry] = useState(false);

  useEffect(() => {
    localStorage.setItem("entrys", JSON.stringify(entrys));
  }, [entrys]);

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  const newdate = day + "." + month + "." + year;

  const onAddEntry = () => {
    const newEntry = {
      id: nanoid(),
      title: newdate,
      body: "Heute bin ich Dankbar für ...",
      one: "",
      two: "",
      three: "",
      lastModified: Date.now(),
    };

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
