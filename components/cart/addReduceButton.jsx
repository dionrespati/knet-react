/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { shape, string, number } from 'prop-types';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateRekapTrans } from '../../custom/contoh';
/* import { useAppContext } from '../../context/app'; */

import useCartStore from '../../store-zustand/useCartStore';
import useMemberInfo from '../../store-zustand/useMemberInfo';

export default function AddReduceButton({ item, qty }) {
  console.log('komponen AddReduceButton rendered');

  const { item: cart, updateQtyItem, removeFromCart } = useCartStore();

  const updateQty = (e, itemPrd) => {
    const { value } = e.target;
    updateQtyItem(itemPrd, value);
  };

  const deleteItemCart = (itemPrd) => {
    removeFromCart(itemPrd);
  };

  return (
    <ButtonGroup
      disableElevation
      size="small"
      color="success"
      variant="outlined"
    >
      <Button onClick={() => updateQtyItem(item.prdcd, qty - 1)}>
        <RemoveIcon sx={{ color: 'red' }} />
      </Button>
      <input
        type="text"
        name="changeQty"
        value={qty}
        onChange={(event) => updateQty(event, item.prdcd)}
        size="4"
        style={{ textAlign: 'center' }}
      />
      <Button onClick={() => updateQtyItem(item.prdcd, qty + 1)}>
        <AddIcon sx={{ color: 'green' }} />
      </Button>
      <Tooltip title="Lihat Detail" arrow>
        <Button>
          <SearchIcon sx={{ color: 'lightblue' }} />
        </Button>
      </Tooltip>
      <Tooltip title="Hapus dari keranjang" arrow>
        <Button onClick={() => deleteItemCart(item.prdcd)}>
          <DeleteIcon color="error" />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

AddReduceButton.propTypes = {
  item: {
    prdcd: '',
    prdnm: '',
    qty: 0,
    priceWestDist: 0,
    priceEastDist: 0,
    priceWestCust: 0,
    priceEastCust: 0,
    bv: 0,
    imageUrl: '',
    weight: 0.0,
  },
  qty: 0,
};

AddReduceButton.propTypes = {
  item: shape({
    prdcd: string.isRequired,
    prdnm: string.isRequired,
    qty: number.isRequired,
    priceWestDist: number.isRequired,
    priceEastDist: number.isRequired,
    priceWestCust: number.isRequired,
    priceEastCust: number.isRequired,
    bv: number.isRequired,
    imageUrl: string.isRequired,
    weight: number.isRequired,
  }).isRequired,
  qty: number.isRequired,
};
