import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import {
  dropdown,
  dropdownContent,
  item,
  menuIcon,
  deleteMemberText,
} from './Dropdown.module.scss';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';
import { useDispatch } from 'react-redux';
import usersActions from '../../../../ducks/users/actions';

const Dropdown = ({ id, role: userRole }) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [role, setRole] = useState(userRole);

  useOnClickOutside(containerRef, () => setOpenMenu(false));

  const deleteMember = () => {
    const isTheySure = window.confirm('Are you sure?');
    if (isTheySure) {
      dispatch(usersActions.deleteUserRequest({ id }));
    }
  };

  const changeTo = to => {
    const isTheySure = window.confirm('Are you sure?');
    if (isTheySure) {
      dispatch(usersActions.changeUserRoleRequest({ id, role: to }));
      setRole(to);
    }
  };

  const renderChangeTo = () => {
    switch (role) {
      case 'admin': {
        return (
          <>
            <div onClick={() => changeTo('super_admin')} className={item}>
              Change to Super Admin
            </div>
            <div onClick={() => changeTo('contact_tracer')} className={item}>
              Change to Contact Tracer
            </div>
          </>
        );
      }
      case 'super_admin': {
        return (
          <>
            <div onClick={() => changeTo('admin')} className={item}>
              Change to Admin
            </div>
            <div onClick={() => changeTo('contact_tracer')} className={item}>
              Change to Contact Tracer
            </div>
          </>
        );
      }
      case 'contact_tracer': {
        return (
          <>
            <div onClick={() => changeTo('super_admin')} className={item}>
              Change to Super Admin
            </div>
            <div onClick={() => changeTo('admin')} className={item}>
              Change to Admin
            </div>
          </>
        );
      }
      default:
        break;
    }
  };
  return (
    <div
      onClick={() => setOpenMenu(!openMenu)}
      className={dropdown}
      ref={containerRef}
    >
      <FontAwesomeIcon icon={faEllipsisV} className={menuIcon} />
      {openMenu && (
        <div id="dropdownMenu" className={dropdownContent}>
          {renderChangeTo()}
          <div onClick={deleteMember} className={`${item} ${deleteMemberText}`}>
            Delete member
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
