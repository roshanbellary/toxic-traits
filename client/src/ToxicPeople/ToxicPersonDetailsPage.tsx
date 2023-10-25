import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import IToxicPerson from '../util/types/toxicperson';
import { useData } from '../util/api';
import ScreenGrid from '../components/ScreenGrid';

const Image = styled.img`
  max-width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const Name = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #ff69b4;
  text-shadow: 2px 2px 0px #fff, 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ff69b4;
  text-shadow: 2px 2px 0px #fff, 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const TraitList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Trait = styled.li`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;
  background-color: #ff69b4;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: pulse 1s ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

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
          <Image
            src={toxicPerson.pictureUrl}
            alt={`${toxicPerson.firstName} ${toxicPerson.lastName}`}
          />
          <Name>{`${toxicPerson.firstName} ${toxicPerson.lastName}`}</Name>

          <Heading>Toxic Traits:</Heading>
          <TraitList>
            {toxicPerson.toxicTraits.map((trait) => (
              <Trait key={trait}>{trait}</Trait>
            ))}
          </TraitList>
        </>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </ScreenGrid>
  );
}

export default ToxicPersonDetailsPage;
