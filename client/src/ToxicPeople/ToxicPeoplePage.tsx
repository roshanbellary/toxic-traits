import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ToxicPersonCard from './ToxicPersonCard';
import ScreenGrid from '../components/ScreenGrid';
import IToxicPerson from '../util/types/toxicperson';
import { useData } from '../util/api';

/**
 * A page that displays all toxic people in cards and allows the user to filter
 * them by name.
 */
function ToxicPeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [toxicPeopleList, setToxicPeopleList] = useState<IToxicPerson[]>([]);
  const toxicPeople = useData('toxicperson/');

  const handleCardClick = (id: string) => {
    navigate(`/toxicpeople/${id}`);
  };

  useEffect(() => {
    if (toxicPeople?.data) {
      const filteredToxicPeople = toxicPeople.data.filter(
        (entry: IToxicPerson) =>
          entry.firstName
            .toLowerCase()
            .concat(' ', entry.lastName.toLowerCase())
            .includes(searchTerm.toLowerCase()),
      );
      setToxicPeopleList(filteredToxicPeople);
    } else {
      setToxicPeopleList([]);
    }
  }, [toxicPeople, searchTerm]);

  return (
    <ScreenGrid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography
            variant="h1"
            sx={{
              fontSize: '7rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#ff69b4',
              textShadow: '2px 2px 0px #fff, 4px 4px 0px rgba(0, 0, 0, 0.1)',
            }}
          >
            Toxic Traits
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Search by name"
            variant="outlined"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Grid>
        <Grid item container spacing={2}>
          {!toxicPeopleList ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : (
            toxicPeopleList.map((toxicPerson: IToxicPerson) => (
              // eslint-disable-next-line
              <Grid item key={toxicPerson._id} xs={4}>
                <ToxicPersonCard
                  toxicPerson={toxicPerson}
                  // eslint-disable-next-line
                  onClick={() => handleCardClick(toxicPerson._id)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default ToxicPeoplePage;
