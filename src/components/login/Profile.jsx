import React from 'react';
import { signOut } from '../../util/util';

export default function Profile() {
  return (
    <div>
      Profile
      <div className="d-flex justify-content-center">
        <button type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
