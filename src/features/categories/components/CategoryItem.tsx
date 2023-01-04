import { Card, createStyles, Image, Text } from '@mantine/core';
import { Category } from 'categories/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setCategory } from 'store/ducks/categorySlice';
import { useAppDispatch } from 'store/hooks';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 100,
    backgroundColor: theme.colors.gray[0],
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
  },
}));

const CategoryItem = ({ id, title, image, path }: Category) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Card
      className={classes.item}
      onClick={() => {
        dispatch(
          setCategory({
            id,
            title,
            image,
            path,
          })
        );
        navigate(`/categories/${path}`);
      }}
    >
      <Image src={image} height={50} fit="contain" />
      <Text size="xs" mt={7}>
        {title}
      </Text>
    </Card>
  );
};

export default CategoryItem;
