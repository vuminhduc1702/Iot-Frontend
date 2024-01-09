import React from "react";

const LogoutModal = ({ handleLogout }) => {
  const onLogout = (e) => {
    handleLogout(e);
  };

  return (
    <>
      <dialog id="my_logout_modal" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-2xl">
            Are you sure you want to log out?
          </h3>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Close</button>
              <button className="btn" onClick={(e) => onLogout(e)}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default LogoutModal;
