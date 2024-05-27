import React from 'react';
import { User } from '../types';

interface UserDetailsProps {
    user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => (
    <div className="card mt-4">
        <div className="card-body">
            <h5 className="card-title">Selected User: {user.firstName} {user.lastName}</h5>
            <p className="card-text"><strong>Description:</strong></p>
            <textarea className="form-control mb-3" value={user.description} readOnly />
            <p className="card-text"><strong>Address:</strong> {user.address.streetAddress}</p>
            <p className="card-text"><strong>City:</strong> {user.address.city}</p>
            <p className="card-text"><strong>State:</strong> {user.address.state}</p>
            <p className="card-text"><strong>ZIP:</strong> {user.address.zip}</p>
        </div>
    </div>
);

export default UserDetails;
