import React from "react";

const ConfirmModal = ({ deviceInfo }) => {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-2xl">
            Successfully register a new device
          </h3>
          <h4 className="font-semibold text-xl mt-3">
            Information of your device:
          </h4>
          {deviceInfo && (
            <div className="modal-data">
              <div>
                <label className="modal-label">General topic: </label>
                <span className="modal-span">{deviceInfo.generalTopic}</span>
              </div>
              <div>
                <label className="modal-label">JWT: </label>
                <span className="modal-span wrap">{deviceInfo.jwt}</span>
              </div>
              <div>
                <label className="modal-label">Owner ID: </label>
                <span className="modal-span">{deviceInfo.ownerId}</span>
              </div>
              <div>
                <label className="modal-label">Device name: </label>
                <span className="modal-span">{deviceInfo.iotClientName}</span>
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmModal;
