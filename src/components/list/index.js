import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname'

function List({ list, renderFunc = () => {}, extraCn = ''}) {
  const cn = bem('List')
  return (
    <div className={cn({extraCn})}>
        {
          list.map((item) => (
              renderFunc(item, cn)
          ))
        }
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  renderFunc: PropTypes.func,
  extraCn: PropTypes.string,
};

export default React.memo(List);
