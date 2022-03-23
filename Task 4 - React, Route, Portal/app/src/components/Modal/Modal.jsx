import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

function Modal({ children, state = false }) {
  if (!state) return null

  return ReactDOM.createPortal(
    (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {children}
        </div>
      </div>
    ), document.getElementById('modal-root'),
  )
}

export default Modal
