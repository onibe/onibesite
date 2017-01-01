'use strict';
import React from 'react';
import api from '../../../js/api';

api.testRequest()
    .then((data) => {
        console.log(data,'data');
    });
const Index = () => (
    <div>Admin Dashboard</div>
);

export default Index;