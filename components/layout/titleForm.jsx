import React from 'react';
import {
  string
} from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

const TitleForm = ({title}) => {

  return (
    <Card
    sx={{backgroundColor:"#1769aa"}}
    >
      <CardHeader 
        title={title}
      />
    </Card>
  )
}

TitleForm.defaultProps = {
  title: 'Judul Belum diisi',
};

TitleForm.propTypes = {
  title: string.isRequired,
};

export default TitleForm;