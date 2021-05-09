import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getOkrs} from '../../actions';
import OkrDropdown from './OkrDropdown/OkrDropdown';
import './Okr.css';
import Loader from "../Loader/Loader";

const Okr = () => {
  const {parentObjectivesIds, okrRef, showLoader, filterValues} = useSelector(state => state)
  const dispatch = useDispatch();
  const [filteredParentObjectivesIds, setFilteredParentObjectivesIds] = useState([]);

  useEffect(() => {
    dispatch(getOkrs());
  }, [dispatch])

  useEffect(() => {
    setFilteredParentObjectivesIds(parentObjectivesIds)
  }, [parentObjectivesIds])

  const onFilterSelection = event => {
    const selectedValue = event.target.value;
    if (selectedValue === 'All')
      return setFilteredParentObjectivesIds(parentObjectivesIds);
    setFilteredParentObjectivesIds(parentObjectivesIds.filter(id => okrRef[id].category === event.target.value));
  };

  return (
    <Fragment>
      {showLoader
        ? <Loader/>
        : (
          <Fragment>
            {filterValues.length > 0 ? (
              <Fragment>
                <div className='okr-category-selector'>
                  <label htmlFor="category">Choose a Category:</label>
                  <select name="category" onChange={onFilterSelection}>
                    <option value='All'>All</option>
                    {filterValues.map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
                {filteredParentObjectivesIds && filteredParentObjectivesIds.map((id, index) => (
                  <OkrDropdown
                    key={id}
                    index={index}
                    okrData={okrRef[id]}
                    id={id}
                  />
                ))}
              </Fragment> ) : <span className='no-okr-records'>No OKR records present</span>
            }
          </Fragment>
        )
      }
    </Fragment>
  );
};

export default Okr;
