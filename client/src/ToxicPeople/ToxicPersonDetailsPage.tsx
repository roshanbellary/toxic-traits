import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import IToxicPerson from '../util/types/toxicperson';
import { useData } from '../util/api';
import ScreenGrid from '../components/ScreenGrid';

function ToxicPersonDetailsPage() {
  const { id } = useParams();
  const [toxicPerson, setToxicPerson] = useState<IToxicPerson | null>(null);

  const toxicPeople = useData(`toxicperson/${id}`);

  useEffect(() => {
    if (toxicPeople?.data) {
      setToxicPerson(toxicPeople.data);
    }
  }, [toxicPeople]);

  return (
    <ScreenGrid>
      {toxicPerson ? (
        <>
          <Typography variant="h4">{`${toxicPerson.firstName} ${toxicPerson.lastName}`}</Typography>
          <Typography variant="body1">{`Toxic Traits: ${toxicPerson.toxicTraits.join(
            ', ',
          )}`}</Typography>
        </>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </ScreenGrid>
  );
}

export default ToxicPersonDetailsPage;
