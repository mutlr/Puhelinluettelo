export const ErrorMessage = ({message}) => {
    if (message === null) {
      return null;
    }
    return (
      <div className='error'>{message}</div>
    )
}
  
export const SucessMessage = ({message}) => {
    if (message === null) {
      return null;
    }
    return (
      <div className='success'>{message}</div>
    )}
