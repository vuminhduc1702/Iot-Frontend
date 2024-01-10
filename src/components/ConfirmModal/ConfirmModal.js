import React, { useState } from "react";
import CopyIcon from "../../assets/icons/CopyIcon";

const ConfirmModal = ({ deviceInfo }) => {
  const [copied, setCopied] = useState(false);

  const onCopyText = (input) => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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
              <div className="flex">
                <div className="w-11/12">
                  <label className="modal-label">General topic: </label>
                  <span className="modal-span">{deviceInfo.generalTopic}</span>
                </div>
                <div className="w-1/12 relative">
                  <button
                    className="absolute right-0 top-0 hover:bg-gray-200 p-1 rounded-lg tooltip tooltip-left"
                    data-tip={copied ? "Copied" : "Copy"}
                    onClick={() => onCopyText(deviceInfo.generalTopic)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <div className="flex">
                <div className="w-11/12">
                  <label className="modal-label">JWT: </label>
                  <span className="modal-span wrap">{deviceInfo.jwt}</span>
                </div>
                <div className="w-1/12 relative">
                  <button
                    className="absolute right-0 top-0 hover:bg-gray-200 p-1 rounded-lg tooltip tooltip-left"
                    data-tip={copied ? "Copied" : "Copy"}
                    onClick={() => onCopyText(deviceInfo.jwt)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <div className="flex">
                <div className="w-11/12">
                  <label className="modal-label">Owner ID: </label>
                  <span className="modal-span">{deviceInfo.ownerId}</span>
                </div>
                <div className="w-1/12 relative">
                  <button
                    className="absolute right-0 top-0 hover:bg-gray-200 p-1 rounded-lg tooltip tooltip-left"
                    data-tip={copied ? "Copied" : "Copy"}
                    onClick={() => onCopyText(deviceInfo.ownerId)}
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <div className="flex">
                <div className="w-11/12">
                  <label className="modal-label">Device name: </label>
                  <span className="modal-span">{deviceInfo.iotClientName}</span>
                </div>
                <div className="w-1/12 relative">
                  <button
                    className="absolute right-0 top-0 hover:bg-gray-200 p-1 rounded-lg tooltip tooltip-left"
                    data-tip={copied ? "Copied" : "Copy"}
                    onClick={() => onCopyText(deviceInfo.iotClientName)}
                  >
                    <CopyIcon />
                  </button>
                </div>
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
