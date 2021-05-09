import React, {useState} from 'react';
import OkrDetails from "../OkrDetails/OkrDetails";
import {useSelector} from "react-redux";
import './OkrDropdown.css'
import {okrDataPropType} from "../../../utils/ProptypesMapper";
import PropTypes from "prop-types";

const OkrDropdown = ({okrData, index, id}) => {
  const [showDetails, setShowDetails] = useState(true);
  const {parentObjectivesRelationalChildrenRef, okrRef} = useSelector(state => state);
  const toggleDetails = () => {
    setShowDetails(prevState => !prevState)
  }
  return (
    <ol type='a'>
      <div className='okr-dropdown'>
        <button className={`okr-dropdown__button ${showDetails ? 'active' : ''}`} onClick={toggleDetails}/>
        <OkrDetails okrData={okrData} isChild={false} parentIndex={index + 1}/>
      </div>
      {showDetails && parentObjectivesRelationalChildrenRef[id] && parentObjectivesRelationalChildrenRef[id].map(childId => (
        <div className='okr-dropdown__content' key={childId}>
          <span className='okr-dropdown__content__vertical-indication'/>
          <span className='okr-dropdown__content__horizontal-indication'/>
          <OkrDetails id={childId} okrData={okrRef[childId]} isChild={true}/>
        </div>
      ))}
    </ol>
  )
}

OkrDropdown.propTypes = {
  okrData: okrDataPropType,
  index: PropTypes.number,
  id: PropTypes.string
};

export default OkrDropdown;
