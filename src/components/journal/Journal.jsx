import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import JournalMain from "./JournalMain";
import JournalSidebar from "./JournalSidebar";
import AuthContext from "../../context/AuthContext";
import { nanoid } from "nanoid";
import axios from "axios";

function Journal() {
  const { journals, setJournals } = useContext(AuthContext);

  const [activeJournal, setActiveJournal] = useState(false);

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  const newdate = day + "." + month + "." + year;

  const createJournal = () => {
    axios
      .post("https://fpjsonserver.herokuapp.com/journals", {
        id: nanoid(),
        title: newdate,
        body: "",
        one: "",
        two: "",
        three: "",
        lastModified: Date.now(),
      })
      .then((response) => {
        setJournals([...journals, response.data]);
        setActiveJournal(response.data.id);
      });
  };

  const onDeleteJournal = async (journalId) => {
    await axios.delete(
      `https://fpjsonserver.herokuapp.com/journals/${journalId}`
    );
    setJournals(journals.filter(({ id }) => id !== journalId));
  };

  const onUpdateJournal = (updatedJournal) => {
    const updatedJournalsArr = journals.map((journal) => {
      if (journal.id === updatedJournal.id) {
        return updatedJournal;
      }

      return journal;
    });

    setJournals(updatedJournalsArr);
  };

  const handleSaveJournal = (e) => {
    e.preventDefault();
    console.log("save journal");
  };
  console.log(journals);

  const getActiveJournal = () => {
    return journals.find(({ id }) => id === activeJournal);
  };

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item>
            <JournalSidebar
              journals={journals}
              onDeleteJournal={onDeleteJournal}
              activeJournal={activeJournal}
              setActiveJournal={setActiveJournal}
              createJournal={createJournal}
            />
          </Grid>
          <Grid item>
            <JournalMain
              activeJournal={getActiveJournal()}
              onUpdateJournal={onUpdateJournal}
              handleSaveJournal={handleSaveJournal}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Journal;
