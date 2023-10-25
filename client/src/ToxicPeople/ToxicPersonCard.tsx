/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import IToxicPerson from '../util/types/toxicperson';
import './ToxicPersonCard.css';

interface IToxicPersonCardProps {
  toxicPerson: IToxicPerson;
  onClick: () => void;
}

/**
 * A card that displays the name and toxic traits of a toxic person.
 */
function ToxicPersonCard({ toxicPerson, onClick }: IToxicPersonCardProps) {
  return (
    <Card className="toxic-person-card" onClick={onClick}>
      <CardMedia
        component="img"
        height="200"
        image={`${toxicPerson.pictureUrl}`}
        alt={`${toxicPerson.firstName} ${toxicPerson.lastName}`}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {toxicPerson.firstName} {toxicPerson.lastName}
        </Typography>
        <Typography variant="body1" component="p">
          <ol>
            {toxicPerson.toxicTraits.length > 0 ? (
              toxicPerson.toxicTraits.map((v) => <li>{v}</li>)
            ) : (
              // eslint-disable-next-line prettier/prettier
              <div />
            )}
          </ol>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ToxicPersonCard;
