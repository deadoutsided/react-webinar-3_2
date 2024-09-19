import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import {cn as bem} from '@bem-react/classname'

function List({ list, action = () => {}, type = 'list' }) {
  const cn = bem('List')
  return (
    <div className={cn()}>
      {(type === "list" &&
        list.map((item) => (
          <div key={item.code} className={cn("item")}>
            <Item item={item} action={action} />
          </div>
        ))) ||
        list.map((item) => {
          if (item.count) {
            return (
              <div key={item.code} className={cn("item")}>
                <Item item={item} action={action} />
              </div>
            );
          }
        })}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  action: PropTypes.func,
};

export default React.memo(List);
