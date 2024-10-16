import { formatDate } from '../../../lib/utils'

const DateComponent = ({ dateString, options, ...rest }) => {
  const formattedDate = formatDate(dateString, options);

  console.log('Formatted Date:', formattedDate);

  return (
    <time dateTime={dateString} {...rest}>
      {formatDate(dateString, options)}
    </time>
  )
}

export default DateComponent
