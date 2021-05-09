import PropTypes from 'prop-types';

export const okrDataPropType = PropTypes.shape({
  id: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  metric_name: PropTypes.string,
  metric_start: PropTypes.string,
  parent_objective_id: PropTypes.string,
  metric_target: PropTypes.string,
  archived: PropTypes.string
});
