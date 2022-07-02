import React, { useState } from 'react';

import Modal from '../modal-plain/modal';
import PropTypes from './base-modal-types';
import actionTypes from '../actions/prop-types';
import BasicButton from '../button/basic-button';
import InlineSVG from '../inline-svg/inline-svg';
import showErrorModal from '../../message-handling/show-error-modal';
import RenderModal from '../actions/render-modal';
import convertActionTree from '../actions/convert-actions-tree';

import styles from './base-modal.less';

const CancelTranslation = <Trans id="baseModal.cancel">Cancel</Trans>;

const BaseModal = ({
  className,
  name,
  isOpen,
  approve,
  cancel,
  isLoading,
  header,
  children,
  close,
  closeAfterApprove,
  additionalButtons,
  i18n,
}) => {
  const [handlingApprove, setHandlingApprove] = useState(false);
  const [actionModal, setActionModal] = useState(undefined);

  const action = (!approve.title
    ? {
      onClick: approve.handler,
      title: i18n._(approve.translation),
      enabled: () => !approve.disabled,
    }
    : approve);

  const approveAction = convertActionTree([action], setActionModal)[0];

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    close();
  };

  const handleAndClose = async (closeModal) => {
    if (approveAction.onClick) {
      await approveAction.onClick();
    }
    if (!approve.Modal && closeModal) handleClose();
  };

  const handleApprove = async (event) => {
    event.stopPropagation();
    setHandlingApprove(true);
    try {
      await handleAndClose(closeAfterApprove);
    } catch (e) {
      setHandlingApprove(false);
      showErrorModal(e);
    }
  };

  const loading = isLoading || (isLoading === undefined && handlingApprove);

  const renderActionModal = () => (
    <RenderModal
      Modal={actionModal.Modal}
      modalProps={actionModal.modalProps}
      onClose={() => {
        setActionModal(undefined);
        handleClose();
      }}
    />
  );

  const renderAdditionalButtons = () => (
    <div className={styles.additionalButtons}>
      {additionalButtons.map((a) => (
        <BasicButton
          key={a.name}
          id={`${a.name}_additional_button`}
          onClick={a.onClick}
          disabled={a.enabled && !a.enabled()}
        >
          {a.title}
        </BasicButton>
      ))}
    </div>
  );

  return (isOpen ? (
    <Modal open className={[styles.modal, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        {header.svg && <InlineSVG className={styles.headerIcon} svg={header.svg} />}
        {header.translation}
      </div>
      <div className={styles.contentChildren}>
        {children}
      </div>
      <div className={styles.actions}>
        {additionalButtons && additionalButtons.length && renderAdditionalButtons()}
        {cancel.visible
          && (
            <BasicButton
              id={`${name}_cancel_button`}
              onClick={handleClose}
              disabled={loading}
            >
              {cancel.translation || CancelTranslation}
            </BasicButton>
          )}
        <BasicButton
          primary
          id={`${name}_approve_button`}
          onClick={handleApprove}
          loading={loading}
          disabled={loading || (approveAction.enabled && !approveAction.enabled())}
        >
          {approveAction.title}
        </BasicButton>
      </div>
      {actionModal && renderActionModal()}
    </Modal>
  ) : null);
};

BaseModal.defaultProps = {
  className: undefined,
  isOpen: false,
  isLoading: undefined,
  approve: {
    translation: '<approve.translation>',
    handler: undefined,
    disabled: false,
  },
  cancel: {
    translation: undefined,
    visible: true,
  },
  header: {
    translation: '<header.translation>',
    svg: null,
  },
  children: null,
  closeAfterApprove: true,
  additionalButtons: undefined,
};

BaseModal.propTypes = {
  className: PropTypes.string,
  i18n: PropTypes.i18n.isRequired,
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  cancel: PropTypes.shape({
    translation: PropTypes.node,
    visible: PropTypes.bool,
  }),
  approve: PropTypes.modalAction,
  close: PropTypes.func.isRequired,
  header: PropTypes.shape({
    translation: PropTypes.node,
    svg: PropTypes.node,
  }),
  children: PropTypes.node,
  closeAfterApprove: PropTypes.bool,
  additionalButtons: PropTypes.arrayOf(actionTypes.action),
};

export default BaseModal;