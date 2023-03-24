/* eslint-disable no-console */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import TitleForm from '../layout/titleForm';

import { useAppContext } from '../../context/app';
import { baseUrlApi, dateFormatName } from '../../custom/contoh';
import getListBonusPeriod from '../../pages/api/bonusperiod';

export default function MemberBV({ nextStep }) {
  const { cart, setCart, login } = useAppContext();
  console.log('komponen memberBv rendered');
  const { memberId, memberName, bonusPeriod } = cart;

  const [listBonusPeriod, setListBonusPeriod] = useState([]);

  const buttonStyle = { textTransform: 'capitalize', fontSize: '18px' };

  useEffect(() => {
    /* console.log(`isi useEffect listbns ${bonusPeriod}`); */
    const arrBns = [];
    const getBns = async () => {
      const { errCode, data } = await getListBonusPeriod();
      console.log({ errCode, data });
      if (errCode === '000') {
        const {
          bnsperiod_prev: previousBonusPeriod,
          bnsperiod_now: currentBonusPeriod,
          date_only_now: dateOnlyNow,
          endofdatebnsperiod: endOfDateBonusPeriod,
        } = data[0];
        const endOfDate = parseInt(endOfDateBonusPeriod);

        if (dateOnlyNow > endOfDate) {
          arrBns[0] = {
            value: currentBonusPeriod,
            text: dateFormatName(currentBonusPeriod),
          };
        } else {
          arrBns[0] = {
            value: previousBonusPeriod,
            text: dateFormatName(previousBonusPeriod),
          };
          arrBns[1] = {
            value: currentBonusPeriod,
            text: dateFormatName(currentBonusPeriod),
          };
        }
        setListBonusPeriod(arrBns);
        console.log({ arrBns });
      }
    };

    getBns();
  }, []);

  const handleOnChange = (e) => {
    const nilai = e.target.value.toUpperCase();
    setCart({ ...cart, [e.target.name]: nilai });
  };

  const findNamaMember = () => {
    const nilai = memberId.toUpperCase();
    // console.log({nilai});
    Axios.get(`${baseUrlApi}/api/v2/getMemberById/${nilai}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        const { response, arrayData } = data;
        if (response === 'true') {
          const { fullnm } = arrayData[0];
          const newData = {
            ...cart,
            memberId: nilai,
            memberName: fullnm,
          };
          setCart(newData);
        }
      }
    });
  };

  return (
    <Paper variant="outlined">
      <TitleForm title="Penerima BV" />
      <List component="nav">
        <ListItem key="fieldMember1">
          <TextField
            size="medium"
            name="memberId"
            label="ID Member / Penerima BV"
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Klik Untuk cek ID Member"
                    sx={{ fontSize: '16px' }}
                    arrow
                  >
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ textTransform: 'capitalize', fontSize: '16px' }}
                      onClick={findNamaMember}
                    >
                      Check
                    </Button>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            fullWidth
            required
            onChange={handleOnChange}
            value={
              memberId === '' && login !== null ? login.userlogin : memberId
            }
            helperText=""
          />
        </ListItem>
        <ListItem key="fieldMember2">
          <TextField
            size="medium"
            name="memberName"
            label="Nama Member"
            inputProps={{ readOnly: true }}
            fullWidth
            required
            value={
              memberName === '' && login !== null ? login.loginname : memberName
            }
          />
        </ListItem>
        <ListItem key="fieldMember3">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Bonus Period
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="bonusPeriod"
              margin="normal"
              size="small"
              onChange={handleOnChange}
            >
              {listBonusPeriod &&
                listBonusPeriod.map((item, index) => {
                  const { value, text } = item;
                  return (
                    <FormControlLabel
                      key={index}
                      value={value}
                      control={<Radio />}
                      label={text}
                      checked={value === bonusPeriod}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        </ListItem>
        <ListItem key="fieldMember4">
          <Button
            size="large"
            variant="contained"
            fullWidth
            sx={buttonStyle}
            onClick={nextStep}
          >
            Pilih Pengiriman
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
}

MemberBV.propTypes = {
  nextStep: func,
};

MemberBV.defaultProps = {
  nextStep: () => {},
};
