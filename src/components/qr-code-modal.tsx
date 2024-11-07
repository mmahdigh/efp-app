import React from 'react'

import Modal from './modal'
import LoadingCell from './loaders/loading-cell'

interface QRCodeModalProps {
  onClose: () => void
  qrCode?: string | null
  isLoading: boolean
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose, qrCode, isLoading }) => {
  return (
    <Modal onCancel={onClose}>
      {isLoading ? (
        <div className='max-w-[436px] rounded-lg flex items-center justify-center w-full sm:w-[436px] h-auto sm:h-[492px]'>
          <LoadingCell className='h-[100vw] sm:h-full w-full' />
        </div>
      ) : qrCode ? (
        <>
          <div
            className='max-w-[436px] rounded-lg flex items-center justify-center w-full sm:w-[436px] h-auto sm:h-[492px]'
            // biome-ignore lint/security/noDangerouslySetInnerHtml: has to be set as dangerouslySetInnerHTML to work on all browsers and devices
            dangerouslySetInnerHTML={{ __html: qrCode }}
          />
        </>
      ) : (
        <div className='max-w-[436px] rounded-lg flex items-center justify-center w-full sm:w-[436px] h-auto sm:h-[492px]'>
          <p>Failed to load QR code.</p>
        </div>
      )}
    </Modal>
  )
}

export default QRCodeModal
