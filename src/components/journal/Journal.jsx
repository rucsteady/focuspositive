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
  const [editedJournal, setEditedJournal] = useState({
    id: "",
    title: "",
    body: "",
    one: "",
    two: "",
    three: "",
    lastModified: "",
  });

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

  const onDeleteJournal = async () => {
    await axios.delete(
      `https://fpjsonserver.herokuapp.com/journals/${activeJournal}`
    );
    setJournals(journals.filter(({ id }) => id !== activeJournal));
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

  const handleSaveJournal = async (journalId) => {
    await axios
      .put(`https://fpjsonserver.herokuapp.com/journals/${journalId}`, {
        activeJournal,
      })

      .then((res) => {
        console.log(res.data);
      });
  };

  const getActiveJournal = () => {
    return journals.find(({ id }) => id === activeJournal);
  };

  console.log("activeJournal", activeJournal);

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
